# PyConKenya Website

This is a [Next.js](https://nextjs.org) project.

## Getting Started

First, run the development server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

## Student ticket payments

Student checkout is available at `/tickets/student` and uses Paystack InlineJS,
so payment opens in a modal without redirecting away from the website. Copy
`.env.example` to `.env.local`, add a Paystack test secret key and ticket price,
then set `STUDENT_TICKET_SALES_ENABLED=true` to enable checkout.

The ticket amount is configured in whole Kenyan shillings and converted to
Paystack's subunit amount on the server. The Paystack secret is server-only and
must never use a `NEXT_PUBLIC_` prefix.

Configure this webhook URL in the Paystack dashboard:

```text
https://pycon.ke/api/payments/paystack/webhook
```

For local webhook testing, expose the local server through an HTTPS tunnel and
temporarily register the resulting `/api/payments/paystack/webhook` URL in the
Paystack test dashboard. The endpoint validates the `x-paystack-signature`
header before acknowledging an event.

Run the project checks with:

```bash
npm test
npm run lint
npm run build
```
