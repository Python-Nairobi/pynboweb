import type {
  PaystackInitializeData,
  PaystackResponse,
  PaystackTransaction,
} from "@/lib/paystack/types";

const PAYSTACK_API_URL = "https://api.paystack.co";

function getSecretKey(): string {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;

  if (!secretKey) {
    throw new Error("PAYSTACK_SECRET_KEY is not configured");
  }

  return secretKey;
}

async function paystackRequest<T>(
  path: string,
  options: RequestInit = {},
): Promise<PaystackResponse<T>> {
  const response = await fetch(`${PAYSTACK_API_URL}${path}`, {
    ...options,
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${getSecretKey()}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
  const body = (await response.json()) as PaystackResponse<T>;

  if (!response.ok || !body.status) {
    throw new Error(body.message || "Paystack request failed");
  }

  return body;
}

export async function initializePaystackTransaction(input: {
  email: string;
  amount: number;
  currency: string;
  reference: string;
  fullName: string;
}): Promise<PaystackInitializeData> {
  const response = await paystackRequest<PaystackInitializeData>(
    "/transaction/initialize",
    {
      method: "POST",
      body: JSON.stringify({
        email: input.email,
        amount: input.amount,
        currency: input.currency,
        reference: input.reference,
        metadata: {
          ticket_type: "student_ticket",
          attendee_name: input.fullName,
          academic_domain: input.email.split("@")[1],
          expected_amount: input.amount,
          expected_currency: input.currency,
          custom_fields: [
            {
              display_name: "Ticket type",
              variable_name: "ticket_type",
              value: "Student ticket",
            },
            {
              display_name: "Attendee name",
              variable_name: "attendee_name",
              value: input.fullName,
            },
          ],
        },
      }),
    },
  );

  return response.data;
}

export async function verifyPaystackTransaction(
  reference: string,
): Promise<PaystackTransaction> {
  const response = await paystackRequest<PaystackTransaction>(
    `/transaction/verify/${encodeURIComponent(reference)}`,
  );
  return response.data;
}
