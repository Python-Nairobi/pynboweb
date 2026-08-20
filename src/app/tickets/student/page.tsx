import type { Metadata } from "next";
import {
  getAcademicDomainSuffixes,
  getBlockedEmailDomains,
} from "@/lib/student-email";
import { getStudentTicketConfig } from "@/lib/student-ticket-config";
import StudentTicketForm from "./student-ticket-form";

export const metadata: Metadata = {
  title: "Student Tickets | PyCon Kenya 2026",
  description: "Buy a PyCon Kenya 2026 student ticket with a school email.",
};

export const dynamic = "force-dynamic";

export default function StudentTicketPage() {
  let displayAmount = "Price unavailable";
  let salesEnabled = false;
  const eligibleDomainSuffixes = getAcademicDomainSuffixes();
  const blockedEmailDomains = getBlockedEmailDomains();
  const eligibleDomains = eligibleDomainSuffixes
    .map((suffix) => `.${suffix}`)
    .join(" or ");

  try {
    const config = getStudentTicketConfig();
    displayAmount = config.displayAmount;
    salesEnabled = config.salesEnabled;
  } catch {
    // Keep the page available with checkout disabled until deployment is configured.
  }

  return (
    <main className="container mx-auto max-w-5xl px-6 py-16 lg:py-24">
      <div className="grid items-start gap-12 lg:grid-cols-[1fr_28rem]">
        <section>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            PyCon Kenya 2026
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            Student tickets
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
            Join Kenya&apos;s Python community for two days of talks, workshops,
            and connections at a student-friendly rate.
          </p>
          <div className="mt-10 grid gap-5 text-sm sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-xl border bg-card p-5">
              <h2 className="font-semibold">Who qualifies?</h2>
              <p className="mt-2 text-muted-foreground">
                Students with an active institutional email ending in{" "}
                {eligibleDomains}.
              </p>
            </div>
            <div className="rounded-xl border bg-card p-5">
              <h2 className="font-semibold">No payment-page redirect</h2>
              <p className="mt-2 text-muted-foreground">
                Paystack opens securely over this page, and confirmation appears
                here after server verification.
              </p>
            </div>
          </div>
        </section>
        <StudentTicketForm
          displayAmount={displayAmount}
          eligibleDomainSuffixes={eligibleDomainSuffixes}
          blockedEmailDomains={blockedEmailDomains}
          salesEnabled={salesEnabled}
        />
      </div>
    </main>
  );
}
