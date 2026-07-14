import { describe, expect, it } from "vitest";
import type { PaystackTransaction } from "../src/lib/paystack/types";
import { validateStudentTransaction } from "../src/lib/paystack/verification";

const expectedReference = "pyconke-student-123";
const expectedAmount = 100_000;

function transaction(
  overrides: Partial<PaystackTransaction> = {},
): PaystackTransaction {
  return {
    reference: expectedReference,
    status: "success",
    amount: expectedAmount,
    currency: "KES",
    customer: { email: "student@uonbi.ac.ke" },
    metadata: {
      ticket_type: "student_ticket",
      expected_amount: expectedAmount,
      expected_currency: "KES",
    },
    ...overrides,
  };
}

describe("student payment verification", () => {
  it("accepts a matching successful transaction", () => {
    expect(
      validateStudentTransaction(transaction(), expectedReference),
    ).toMatchObject({
      status: "success",
      email: "student@uonbi.ac.ke",
    });
  });

  it.each(["pending", "ongoing", "processing", "queued"])(
    "keeps %s transactions pending",
    (status) => {
      expect(
        validateStudentTransaction(transaction({ status }), expectedReference)
          .status,
      ).toBe("pending");
    },
  );

  it.each([
    { amount: 99_900 },
    { currency: "NGN" },
    { reference: "another-reference" },
    { metadata: { ticket_type: "general_ticket" } },
    { customer: { email: "student@gmail.com" } },
    { status: "failed" },
  ])("rejects a mismatched transaction %#", (override) => {
    expect(
      validateStudentTransaction(transaction(override), expectedReference)
        .status,
    ).toBe("failed");
  });

  it("accepts an initialized price after the deployment price changes", () => {
    const originalPriceTransaction = transaction({
      amount: 75_000,
      metadata: {
        ticket_type: "student_ticket",
        expected_amount: 75_000,
        expected_currency: "KES",
      },
    });

    expect(
      validateStudentTransaction(originalPriceTransaction, expectedReference)
        .status,
    ).toBe("success");
  });
});
