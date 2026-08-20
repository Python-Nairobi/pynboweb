import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PaymentConfirmationProps {
  email: string;
  amount: number;
  currency: string;
  reference: string;
  onReset: () => void;
}

export default function PaymentConfirmation({
  email,
  amount,
  currency,
  reference,
  onReset,
}: PaymentConfirmationProps) {
  const formattedAmount = new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency,
  }).format(amount / 100);

  return (
    <Card className="border-emerald-200 bg-emerald-50/60">
      <CardHeader>
        <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <CheckCircle2 className="size-7" aria-hidden="true" />
        </div>
        <CardTitle className="text-2xl">Payment confirmed</CardTitle>
        <CardDescription>
          Your PyCon Kenya 2026 student ticket payment has been verified.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <dl className="grid gap-4 rounded-lg border border-emerald-200 bg-white p-4 text-sm">
          <div>
            <dt className="text-muted-foreground">School email</dt>
            <dd className="mt-1 break-all font-medium">{email}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Amount</dt>
            <dd className="mt-1 font-medium">{formattedAmount}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Payment reference</dt>
            <dd className="mt-1 break-all font-medium">{reference}</dd>
          </div>
        </dl>
      </CardContent>
      <CardFooter>
        <Button type="button" variant="outline" onClick={onReset}>
          Buy another student ticket
        </Button>
      </CardFooter>
    </Card>
  );
}
