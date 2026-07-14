export interface StudentTicketConfig {
  amountInSubunit: number;
  currency: string;
  displayAmount: string;
  salesEnabled: boolean;
}

export function getStudentTicketConfig(): StudentTicketConfig {
  const rawPrice = process.env.STUDENT_TICKET_PRICE_KES;
  const price = Number(rawPrice);
  const currency = (process.env.STUDENT_TICKET_CURRENCY ?? "KES").toUpperCase();
  const salesEnabled =
    (process.env.STUDENT_TICKET_SALES_ENABLED ?? "false").toLowerCase() ===
    "true";

  if (!rawPrice || !Number.isInteger(price) || price <= 0) {
    throw new Error("STUDENT_TICKET_PRICE_KES must be a positive whole number");
  }

  if (currency !== "KES") {
    throw new Error("Student tickets currently support KES only");
  }

  return {
    amountInSubunit: price * 100,
    currency,
    displayAmount: new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(price),
    salesEnabled,
  };
}
