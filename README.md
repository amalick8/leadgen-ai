# LeadFlow AI

LeadFlow AI is a full-stack local lead-generation marketplace MVP. Homeowners submit service requests without an account. Businesses sign up, complete onboarding, browse server-filtered matching leads, purchase leads through Stripe Checkout, and manage purchased contacts in a lightweight CRM. Admins manage leads, businesses, services, payments, and marketplace health.

## Tech Stack

- Next.js App Router, TypeScript, Tailwind CSS
- Supabase Auth, Supabase Postgres, Supabase SSR helpers
- Stripe Checkout and signed Stripe webhooks
- Zod validation, Lucide icons, Sonner toasts
- Optional Resend email hooks
- Vitest utility tests

## Install

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

Open `http://localhost:3000`.

## Quality Commands

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

## Environment Variables

Copy `.env.example` to `.env.local`.

Required for the core app:

- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`

Optional:

- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `OPENAI_API_KEY`
- `OPENAI_LEAD_SCORING_MODEL`
- `DEFAULT_CURRENCY`
- `ADMIN_BOOTSTRAP_EMAIL`
- `ADMIN_BOOTSTRAP_PASSWORD`
- `ADMIN_BOOTSTRAP_SECRET`

Server-only keys are only read in server modules. Do not prefix secret keys with `NEXT_PUBLIC_`.

## Supabase Setup

1. Create a Supabase project.
2. Add the Supabase URL, anon key, and service role key to `.env.local`.
3. Run the SQL in `supabase/migrations/0001_initial.sql` in the Supabase SQL editor, or apply it through the Supabase CLI.
4. Run `supabase/seed.sql` for development services and one sample lead.

## Seed Instructions

The seed file creates these services: AC Repair, Plumbing, Emergency Electrician, Roofing, Garage Door Repair, Pest Control, Landscaping, and House Cleaning.

```sql
-- Run in Supabase SQL editor for development
\i supabase/seed.sql
```

If your SQL editor does not support `\i`, paste the file contents directly.

## Admin Creation

Option A, recommended for first deployment:

1. Set `ADMIN_BOOTSTRAP_EMAIL`, `ADMIN_BOOTSTRAP_PASSWORD`, and a long random `ADMIN_BOOTSTRAP_SECRET`.
2. Deploy or restart the app.
3. Run:

```bash
curl -X POST "$NEXT_PUBLIC_APP_URL/api/admin/bootstrap" \
  -H "x-bootstrap-secret: $ADMIN_BOOTSTRAP_SECRET"
```

4. Log in at `/login` with `ADMIN_BOOTSTRAP_EMAIL` and `ADMIN_BOOTSTRAP_PASSWORD`.
5. Remove the `ADMIN_BOOTSTRAP_*` environment variables after the first admin is created.

Option B, manual SQL:

1. Sign up through `/signup`.
2. In Supabase SQL editor, promote that profile:

```sql
update public.profiles
set role = 'admin'
where email = 'you@example.com';
```

Then log in again and visit `/admin`.

## 48-Hour Deployment Checklist

Day 1:

- Create Supabase project and run `supabase/migrations/0001_initial.sql`.
- Run `supabase/seed.sql`.
- Add Supabase, Stripe test, and app URL env vars.
- Use `/api/admin/bootstrap` to create the first admin, then remove bootstrap env vars.
- Create a contractor account, complete onboarding, and confirm matching leads appear.
- Submit at least one homeowner request from `/`.

Day 2:

- Configure Stripe webhook and run one test Checkout purchase.
- Confirm purchased lead contact details unlock in `/business/my-leads`.
- Promote/restrict admin users and review `/admin` screens.
- Replace legal placeholder copy with reviewed Privacy/Terms.
- Add rate limiting or bot protection before public traffic.
- Deploy to the production host, set production Supabase/Stripe env vars, and smoke-test `/`, `/signup`, `/login`, `/admin`, `/business/leads`, and Stripe webhook delivery.

## Stripe Setup

1. Create a Stripe account and copy your test secret key to `STRIPE_SECRET_KEY`.
2. Create a webhook endpoint for `/api/stripe/webhook`.
3. Copy the signing secret to `STRIPE_WEBHOOK_SECRET`.
4. For local testing:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Use Stripe test card `4242 4242 4242 4242` with any future expiry, CVC, and ZIP.

## Test Homeowner Flow

1. Visit `/`.
2. Submit a service request from the lead form.
3. Validation runs server-side with Zod.
4. A lead is inserted with price, score, urgency, duplicate key, and seven-day expiration.
5. The user is redirected to `/thank-you`.

## Test Business Flow

1. Sign up at `/signup`.
2. Complete `/business/onboarding`.
3. Visit `/business/leads`.
4. Only leads matching active services and city/ZIP service areas appear.
5. Open a lead to confirm contact details are masked.
6. Buy through Stripe Checkout.
7. Let the webhook complete.
8. Visit `/business/my-leads` and open the lead to view full contact details, status, and notes.

## Test Admin Flow

1. Promote your account to admin using the SQL above.
2. Visit `/admin`.
3. Manage leads at `/admin/leads`.
4. Create or update services at `/admin/services`.
5. Manage businesses at `/admin/businesses`.
6. Review payments at `/admin/payments`.
7. Review marketplace metrics at `/admin/analytics`.

## Security Notes

- Public users can submit leads but cannot read lead contact data.
- Business lead matching and purchased-lead authorization are enforced server-side.
- Admin pages require a profile with `role = 'admin'`.
- Stripe webhooks verify signatures and store processed event IDs for idempotency.
- Unique constraints prevent double lead purchase records.
- The app intentionally uses the service role key only on the server.

## Still Needed Before Production

- Legal review of privacy and terms copy.
- Real domain, deployment, and Supabase production project.
- Stripe live-mode configuration.
- Email templates and sender domain verification if using Resend.
- Operational admin workflows for refunds and disputes.
- Abuse prevention, rate limits, and bot protection on public lead submission.
