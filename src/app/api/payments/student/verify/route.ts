import { NextResponse } from "next/server";
import { verifyPaystackTransaction } from "@/lib/paystack/client";
import { validateStudentTransaction } from "@/lib/paystack/verification";

const REFERENCE_PATTERN = /^pyconke-student-[a-f0-9-]{36}$/i;

export async function POST(request: Request) {
  let reference: unknown;

  try {
    const body = (await request.json()) as { reference?: unknown };
    reference = body.reference;
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }

  if (typeof reference !== "string" || !REFERENCE_PATTERN.test(reference)) {
    return NextResponse.json(
      { error: "Invalid payment reference." },
      { status: 400 },
    );
  }

  try {
    const transaction = await verifyPaystackTransaction(reference);
    const result = validateStudentTransaction(transaction, reference);
    const status = result.status === "failed" ? 422 : 200;

    return NextResponse.json(result, { status });
  } catch (error) {
    console.error("Student payment verification failed", { reference, error });
    return NextResponse.json(
      { error: "We could not verify the payment. Please try again." },
      { status: 502 },
    );
  }
}
