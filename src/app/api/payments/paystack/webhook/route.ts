import { createHmac, timingSafeEqual } from "node:crypto";
import type { PaystackWebhookEvent } from "@/lib/paystack/types";

export function hasValidPaystackSignature(
  rawBody: string,
  signature: string | null,
  secretKey: string,
): boolean {
  if (!signature) {
    return false;
  }

  const expected = createHmac("sha512", secretKey)
    .update(rawBody)
    .digest("hex");
  const receivedBuffer = Buffer.from(signature, "utf8");
  const expectedBuffer = Buffer.from(expected, "utf8");

  return (
    receivedBuffer.length === expectedBuffer.length &&
    timingSafeEqual(receivedBuffer, expectedBuffer)
  );
}

export async function POST(request: Request) {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;

  if (!secretKey) {
    console.error("Paystack webhook received without a configured secret key");
    return new Response("Webhook is not configured", { status: 503 });
  }

  const rawBody = await request.text();
  const signature = request.headers.get("x-paystack-signature");

  if (!hasValidPaystackSignature(rawBody, signature, secretKey)) {
    return new Response("Invalid signature", { status: 401 });
  }

  let event: PaystackWebhookEvent;

  try {
    event = JSON.parse(rawBody) as PaystackWebhookEvent;
  } catch {
    return new Response("Invalid payload", { status: 400 });
  }

  if (
    event.event === "charge.success" &&
    event.data?.metadata &&
    typeof event.data.metadata !== "string" &&
    event.data.metadata.ticket_type === "student_ticket"
  ) {
    console.info("Student ticket payment webhook acknowledged", {
      reference: event.data.reference,
    });
  }

  return new Response(null, { status: 200 });
}
