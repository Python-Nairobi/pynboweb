import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "../src/app/api/payments/student/initialize/route";

function request(body: unknown) {
  return new Request("http://localhost/api/payments/student/initialize", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("student payment initialization", () => {
  beforeEach(() => {
    process.env.PAYSTACK_SECRET_KEY = "sk_test_example";
    process.env.STUDENT_TICKET_PRICE_KES = "1000";
    process.env.STUDENT_TICKET_CURRENCY = "KES";
    process.env.STUDENT_TICKET_SALES_ENABLED = "true";
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("rejects a non-academic email before calling Paystack", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const response = await POST(
      request({ fullName: "A Student", email: "student@gmail.com" }),
    );

    expect(response.status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("initializes a trusted server-priced transaction", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          status: true,
          message: "Authorization URL created",
          data: {
            authorization_url: "https://checkout.paystack.com/example",
            access_code: "access_example",
            reference: "pyconke-student-reference",
          },
        }),
        { status: 200 },
      ),
    );
    vi.stubGlobal("fetch", fetchMock);

    const response = await POST(
      request({
        fullName: "A Student",
        email: "student@uonbi.ac.ke",
        amount: 1,
      }),
    );
    const result = await response.json();

    expect(response.status).toBe(200);
    expect(result.accessCode).toBe("access_example");
    const paystackRequest = fetchMock.mock.calls[0]?.[1] as RequestInit;
    expect(JSON.parse(paystackRequest.body as string).amount).toBe(100_000);
    expect(JSON.parse(paystackRequest.body as string).callback_url).toBeUndefined();
  });

  it("rejects checkout when sales are closed", async () => {
    process.env.STUDENT_TICKET_SALES_ENABLED = "false";
    const response = await POST(
      request({ fullName: "A Student", email: "student@uonbi.ac.ke" }),
    );
    expect(response.status).toBe(403);
  });
});

