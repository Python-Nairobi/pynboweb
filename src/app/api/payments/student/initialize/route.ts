import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { initializePaystackTransaction } from "@/lib/paystack/client";
import { isSchoolEmail, normalizeEmail } from "@/lib/student-email";
import { getStudentTicketConfig } from "@/lib/student-ticket-config";

interface InitializeBody {
  fullName?: unknown;
  email?: unknown;
}

export async function POST(request: Request) {
  let body: InitializeBody;

  try {
    body = (await request.json()) as InitializeBody;
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }

  const fullName =
    typeof body.fullName === "string" ? body.fullName.trim() : "";
  const email =
    typeof body.email === "string" ? normalizeEmail(body.email) : "";
  const fieldErrors: Record<string, string> = {};

  if (fullName.length < 2 || fullName.length > 120) {
    fieldErrors.fullName = "Enter your full name.";
  }

  if (!isSchoolEmail(email)) {
    fieldErrors.email = "Use a valid email from an approved academic domain.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json(
      { error: "Check the highlighted fields.", fieldErrors },
      { status: 400 },
    );
  }

  try {
    const config = getStudentTicketConfig();

    if (!config.salesEnabled) {
      return NextResponse.json(
        { error: "Student ticket sales are currently closed." },
        { status: 403 },
      );
    }

    const reference = `pyconke-student-${randomUUID()}`;
    const transaction = await initializePaystackTransaction({
      email,
      fullName,
      amount: config.amountInSubunit,
      currency: config.currency,
      reference,
    });

    return NextResponse.json({
      accessCode: transaction.access_code,
      reference: transaction.reference,
    });
  } catch (error) {
    console.error("Student payment initialization failed", error);
    return NextResponse.json(
      { error: "We could not start the payment. Please try again." },
      { status: 502 },
    );
  }
}
