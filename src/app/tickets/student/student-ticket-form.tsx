"use client";

import { LoaderCircle, ShieldCheck } from "lucide-react";
import { type FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { isSchoolEmail } from "@/lib/student-email";
import PaymentConfirmation from "./payment-confirmation";

interface StudentTicketFormProps {
  blockedEmailDomains: string[];
  displayAmount: string;
  eligibleDomainSuffixes: string[];
  salesEnabled: boolean;
}

interface VerifiedPayment {
  status: "success";
  reference: string;
  email: string;
  amount: number;
  currency: string;
}

interface ApiError {
  error?: string;
  fieldErrors?: Record<string, string>;
  status?: "pending" | "failed";
  message?: string;
}

export default function StudentTicketForm({
  blockedEmailDomains,
  displayAmount,
  eligibleDomainSuffixes,
  salesEnabled,
}: StudentTicketFormProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [pendingReference, setPendingReference] = useState("");
  const [payment, setPayment] = useState<VerifiedPayment | null>(null);

  async function verifyPayment(reference: string) {
    setBusy(true);
    setMessage("Verifying your payment…");

    try {
      const response = await fetch("/api/payments/student/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference }),
      });
      const result = (await response.json()) as VerifiedPayment | ApiError;

      if (response.ok && result.status === "success") {
        setPayment(result as VerifiedPayment);
        setMessage("");
        setPendingReference("");
        return;
      }

      if (result.status === "pending") {
        setPendingReference(reference);
      }

      const apiError = result as ApiError;
      setMessage(
        apiError.message ??
          apiError.error ??
          "We could not verify the payment.",
      );
    } catch {
      setPendingReference(reference);
      setMessage("We could not verify the payment. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  function validateForm() {
    const nextErrors: Record<string, string> = {};

    if (fullName.trim().length < 2) {
      nextErrors.fullName = "Enter your full name.";
    }

    if (!isSchoolEmail(email, eligibleDomainSuffixes, blockedEmailDomains)) {
      nextErrors.email = `Use a school email ending in ${eligibleDomainSuffixes
        .map((suffix) => `.${suffix}`)
        .join(" or ")}.`;
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setPendingReference("");

    if (!validateForm()) {
      return;
    }

    setBusy(true);

    try {
      const response = await fetch("/api/payments/student/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email }),
      });
      const result = (await response.json()) as ApiError & {
        accessCode?: string;
        reference?: string;
      };

      if (!response.ok || !result.accessCode || !result.reference) {
        setErrors(result.fieldErrors ?? {});
        setMessage(result.error ?? "We could not start the payment.");
        setBusy(false);
        return;
      }

      const { default: PaystackPop } = await import("@paystack/inline-js");
      const paystack = new PaystackPop();
      const initializedReference = result.reference;

      paystack.resumeTransaction(result.accessCode, {
        onSuccess: (transaction) => {
          void verifyPayment(transaction.reference || initializedReference);
        },
        onCancel: () => {
          setPendingReference(initializedReference);
          setBusy(false);
          setMessage(
            "Payment window closed. If you approved a payment, verify it below.",
          );
        },
        onError: (error) => {
          setPendingReference(initializedReference);
          setBusy(false);
          setMessage(error.message || "Paystack could not load the payment.");
        },
      });
    } catch {
      setBusy(false);
      setMessage("We could not start the payment. Please try again.");
    }
  }

  if (payment) {
    return (
      <PaymentConfirmation
        {...payment}
        onReset={() => {
          setPayment(null);
          setFullName("");
          setEmail("");
        }}
      />
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Student ticket</CardTitle>
        <CardDescription>
          Use your official school email to access the student rate.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit} noValidate={true}>
        <CardContent className="grid gap-5">
          <div className="rounded-lg bg-muted p-4">
            <p className="text-sm text-muted-foreground">Student rate</p>
            <p className="mt-1 text-2xl font-bold">{displayAmount}</p>
          </div>

          <div className="grid gap-2">
            <label htmlFor="fullName" className="text-sm font-medium">
              Full name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={errors.fullName ? "fullName-error" : undefined}
              className="h-11 rounded-md border bg-background px-3 outline-none focus:ring-2 focus:ring-ring"
              disabled={!salesEnabled || busy}
            />
            {errors.fullName ? (
              <p id="fullName-error" className="text-sm text-destructive">
                {errors.fullName}
              </p>
            ) : null}
          </div>

          <div className="grid gap-2">
            <label htmlFor="email" className="text-sm font-medium">
              School email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@university.ac.ke"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : "email-help"}
              className="h-11 rounded-md border bg-background px-3 outline-none focus:ring-2 focus:ring-ring"
              disabled={!salesEnabled || busy}
            />
            <p id="email-help" className="text-xs text-muted-foreground">
              Accepted academic domains currently end in{" "}
              {eligibleDomainSuffixes
                .map((suffix) => `.${suffix}`)
                .join(" or ")}
              .
            </p>
            {errors.email ? (
              <p id="email-error" className="text-sm text-destructive">
                {errors.email}
              </p>
            ) : null}
          </div>

          <div aria-live="polite">
            {message ? (
              <p className="rounded-md bg-muted p-3 text-sm">{message}</p>
            ) : null}
          </div>
        </CardContent>
        <CardFooter className="mt-6 flex-col items-stretch gap-3">
          <Button type="submit" size="lg" disabled={!salesEnabled || busy}>
            {busy ? (
              <LoaderCircle className="animate-spin" aria-hidden="true" />
            ) : null}
            {salesEnabled ? `Pay ${displayAmount}` : "Student sales closed"}
          </Button>
          {pendingReference ? (
            <Button
              type="button"
              variant="outline"
              disabled={busy}
              onClick={() => void verifyPayment(pendingReference)}
            >
              Verify payment again
            </Button>
          ) : null}
          <p className="flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
            <ShieldCheck className="size-4" aria-hidden="true" />
            Payment opens securely in a Paystack modal.
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
