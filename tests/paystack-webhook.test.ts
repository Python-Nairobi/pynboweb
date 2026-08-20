import { createHmac } from "node:crypto";
import { describe, expect, it } from "vitest";
import { hasValidPaystackSignature } from "../src/app/api/payments/paystack/webhook/route";

describe("Paystack webhook signature", () => {
  const body = JSON.stringify({ event: "charge.success", data: {} });
  const secret = "sk_test_example";

  it("accepts a matching HMAC SHA512 signature", () => {
    const signature = createHmac("sha512", secret).update(body).digest("hex");
    expect(hasValidPaystackSignature(body, signature, secret)).toBe(true);
  });

  it("rejects missing or invalid signatures", () => {
    expect(hasValidPaystackSignature(body, null, secret)).toBe(false);
    expect(hasValidPaystackSignature(body, "invalid", secret)).toBe(false);
  });
});

