# Hotspot Mtaani

Turn a WiFi connection into a business. Users sign up (Google), set up a
business profile, create hotspot packages, pay a one-time Ksh 100 setup fee
via Paystack, then land on a dashboard with an online/offline toggle.

Stack: **Next.js 14 (App Router) + TypeScript + Tailwind + Supabase (auth, db,
RLS) + Paystack**.

## What's built so far (Step 1)

- Project scaffold (Next.js + Tailwind configured with your brand green)
- Responsive homepage matching the provided design (hero, how-it-works,
  why-choose-us, pricing, CTA, footer)
- Supabase client helpers (`lib/supabase/client.ts` for the browser,
  `lib/supabase/server.ts` for server components/route handlers)
- `middleware.ts` — refreshes the auth session and protects
  `/dashboard` and `/onboarding`
- `supabase/schema.sql` — full DB schema: `profiles`, `businesses`,
  `packages`, `payments`, with row-level security so a user can only ever
  see/edit their own data

## Not built yet — coming in the next steps

1. `/login` and `/signup` pages with Google OAuth
2. `/onboarding` — business profile form → package creation form
3. `/onboarding/payment` — Paystack checkout for the Ksh 100 setup fee +
   a `route.ts` API endpoint that verifies the transaction server-side and
   flips `businesses.is_active = true`
4. `/dashboard` — the online/offline toggle, package list, business summary

Send me the design for signup/business-profile/packages/dashboard whenever
you're ready and I'll build each one to match, wired to the schema above.

## Local setup

```bash
npm install
cp .env.local.example .env.local   # fill in the values below
npm run dev
```

### 1. Supabase

1. Create a project at supabase.com
2. Project Settings → API → copy `Project URL` and `anon public` key into
   `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Copy the
   `service_role` key into `SUPABASE_SERVICE_ROLE_KEY` (server-only, never
   expose to the browser — used later for the Paystack webhook to update
   payment status).
3. SQL Editor → paste the contents of `supabase/schema.sql` → Run.
4. Authentication → Providers → enable **Google**, add your Google OAuth
   Client ID/Secret from Google Cloud Console. Set the redirect URL Supabase
   gives you in the Google Cloud Console's Authorized redirect URIs.

### 2. Paystack

1. Get your test keys from the Paystack dashboard (Settings → API Keys &
   Webhooks).
2. Put the secret key in `PAYSTACK_SECRET_KEY` (server-only) and the public
   key in `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY`.
3. Paystack supports M-Pesa as a channel for KES transactions, so the Ksh 100
   fee can be paid by card or M-Pesa from the same checkout — no separate
   Daraja integration needed for this fee.

### 3. Run it

```bash
npm run dev
```

Visit http://localhost:3000 — the homepage should match the design you sent.

## Folder structure

```
app/
  page.tsx          → homepage
  layout.tsx         → root layout, fonts, metadata
  globals.css
lib/supabase/
  client.ts           → browser Supabase client
  server.ts           → server Supabase client
supabase/
  schema.sql          → run once in Supabase SQL editor
middleware.ts         → session refresh + route protection
```
