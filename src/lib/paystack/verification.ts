import type { PaystackTransaction } from "@/lib/paystack/types";
import { isSchoolEmail, normalizeEmail } from "@/lib/student-email";

export type VerificationResult =
  | {
      status: "success";
      reference: string;
      email: string;
      amount: number;
      currency: string;
    }
  | { status: "pending"; message: string }
  | { status: "failed"; message: string };

function readMetadata(
  metadata: PaystackTransaction["metadata"],
): Record<string, unknown> {
  if (!metadata) {
    return {};
  }

  if (typeof metadata === "string") {
    try {
      return JSON.parse(metadata) as Record<string, unknown>;
    } catch {
      return {};
    }
  }

  return metadata;
}

export function validateStudentTransaction(
  transaction: PaystackTransaction,
  expectedReference: string,
): VerificationResult {
  const pendingStatuses = new Set([
    "ongoing",
    "pending",
    "processing",
    "queued",
  ]);

  if (pendingStatuses.has(transaction.status)) {
    return {
      status: "pending",
      message: "Your payment is still processing. Please verify again shortly.",
    };
  }

  const email = normalizeEmail(transaction.customer?.email ?? "");
  const metadata = readMetadata(transaction.metadata);
  const expectedAmount = Number(metadata.expected_amount);
  const expectedCurrency =
    typeof metadata.expected_currency === "string"
      ? metadata.expected_currency.toUpperCase()
      : "";
  const matches =
    transaction.status === "success" &&
    transaction.reference === expectedReference &&
    Number.isSafeInteger(expectedAmount) &&
    expectedAmount > 0 &&
    transaction.amount === expectedAmount &&
    transaction.currency.toUpperCase() === expectedCurrency &&
    metadata.ticket_type === "student_ticket" &&
    isSchoolEmail(email);

  if (!matches) {
    return {
      status: "failed",
      message: "We could not verify this student ticket payment.",
    };
  }

  return {
    status: "success",
    reference: transaction.reference,
    email,
    amount: transaction.amount,
    currency: transaction.currency.toUpperCase(),
  };
}
