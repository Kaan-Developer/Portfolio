# Kaan Hamitler | Frontend Developer

Personal portfolio built with React, TypeScript, Vite and Tailwind CSS. It uses Spline for 3D scenes, Zustand for the mobile menu, and a Supabase Edge Function for contact messages. Resend provides optional email notifications.

## Page structure

`src/pages/AnaPage.tsx` renders the floating Navbar, then Hero → ProfileSummary → Projects → About → Contact, followed by Footer and ScrollToTop. Stacks is a panel inside About, not a separate page section. Navigation links target About, Projects and Contact.

Site text and profile links are in `src/data/site.ts`; project entries are in `src/data/projects.ts`. Some form labels and status messages are also written directly in `Contact.tsx`.

## Local setup

Requirements: Node.js 22.12+ and pnpm. Vite also supports Node.js 20.19+. The checks below were run with Node.js 24.18.0 and pnpm 11.19.0.

```sh
git clone https://github.com/Kaan-Developer/Portfolio.git
cd Portfolio
pnpm install --frozen-lockfile
```

Copy [`.env.example`](./.env.example) to `.env.local` and fill in the values. On PowerShell:

```powershell
Copy-Item .env.example .env.local
pnpm dev
```

On macOS/Linux, use `cp .env.example .env.local` before `pnpm dev`. Open the address printed by Vite, normally `http://localhost:5173`. Restart the development server after changing environment values.

## Commands

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start the Vite development server. |
| `node --test` | Run the Node test suite in `tests/`; no `pnpm test` script is configured. |
| `pnpm lint` | Run Oxlint. |
| `pnpm exec tsc -b --force` | Check the frontend and Vite configuration with TypeScript. |
| `pnpm build` | Run `tsc -b`, then build the static frontend into `dist/`. |
| `pnpm preview` | Serve the existing `dist/` build locally. |

The frontend build does not deploy or type-check the Supabase Edge Function.

## Environment variables

Vite reads the following values from `.env.local` during development and from the hosting environment during production builds:

| Variable | Used by | Requirement |
| --- | --- | --- |
| `VITE_ROBOT_1_URL` | `src/components/Robot/RobotCanvas.tsx` | Optional public `.splinecode` URL for scene 1. This scene is defined but is not mounted by the current page. |
| `VITE_ROBOT_2_URL` | `src/components/Robot/RobotCanvas.tsx` | Public `.splinecode` URL for the About section's scene 2 on supported desktop devices. Needed to render that scene. |
| `VITE_SUPABASE_URL` | `src/lib/supabase.ts` | Supabase project URL. Required when submitting the contact form. |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | `src/lib/supabase.ts` | Public project publishable key. Required when submitting the contact form. |

Every `VITE_*` value is included in browser code. Keep the Resend key and Supabase server credentials out of these variables. `getSupabase()` creates and reuses the browser client on first use; missing contact configuration causes a form submission error.

The contact function reads `EMAIL_API_KEY` from Supabase function secrets. It is a Resend API key, despite the generic variable name. It is optional for saving a message and required for attempting an email notification. Do not put it in the frontend environment template.

## Contact flow: Supabase and Resend

1. `Contact.tsx` trims and validates the form, then calls `getSupabase().functions.invoke("contact", { body })`. Limits are 50 characters for the name, 100 for email/subject, and 250 for the message. Selecting Other requires a separate subject.
2. `supabase/functions/contact/index.ts` accepts POST requests using `withSupabase({ auth: "publishable" })`. `supabase/config.toml` disables the gateway's legacy JWT check; the function wrapper handles publishable-key authentication.
3. The function validates the input and calls `consume_contact_request` using the server-side admin client. Rate-limit service errors return 503; rejected requests return 429 with `Retry-After`.
4. Allowed messages are inserted into `contact_messages`. A database insert failure returns 500.
5. If `EMAIL_API_KEY` is set, the function sends a notification through Resend. The current sender is `Portfolio <onboarding@resend.dev>`, the recipient is `kaandeveloperr07@gmail.com`, and replies go to the visitor's email. These addresses are set in the function source. Resend's test sender has account restrictions; configure a verified sender for production as described in the [Resend guide](https://resend.com/docs/send-with-supabase-edge-functions).
6. The response is `{ success: true, emailSent }` after a successful database insert. Missing email configuration or a failed Resend request leaves `emailSent` false while keeping the saved message. The frontend reports “Message saved. Thank you.” and does not inspect `emailSent`; it does not confirm email delivery.

### Database prerequisites

This repository does not contain database migrations. A new Supabase project needs these existing database resources before the contact function can work:

- `public.contact_messages`, accepting `name`, `email`, `subject` and `message` inserts from the admin client.
- `public.consume_contact_request(text)`, accepting `p_email` and returning one row with `allowed` and `retry_after`.
- `public.contact_rate_limits`, used by the rate-limit function and the SQL check.

[`supabase/tests/contact_rate_limit.sql`](./supabase/tests/contact_rate_limit.sql) checks an expected limit of 3 requests per email and 30 globally per 10-minute window, and checks that browser roles cannot insert messages or call the limiter directly. It runs inside a transaction and rolls its fixtures back. It is separate from `node --test` and requires a prepared test database:

```sh
psql "TEST_DATABASE_CONNECTION_STRING" -v ON_ERROR_STOP=1 -f supabase/tests/contact_rate_limit.sql
```

Replace the quoted placeholder with the test database connection string. This file tests an existing schema; it does not create one. Local frontend checks do not verify the deployed schema, rate limits or email delivery.

### Function deployment

With the [Supabase CLI](https://supabase.com/docs/guides/functions/deploy) installed, a prepared database, and your own project reference:

```sh
supabase login
supabase link --project-ref YOUR_PROJECT_REF
supabase secrets set EMAIL_API_KEY=YOUR_RESEND_API_KEY
supabase functions deploy contact
```

The secrets command is needed only for email notifications. These commands change the selected Supabase project; they are setup instructions, not actions performed by the frontend build.

## Files

```text
index.html                           Browser title, metadata and icon links
.env.example                         Public frontend environment template
.oxlintrc.json                        Oxlint rules
vite.config.ts                       React and Tailwind Vite plugins
tsconfig*.json                       TypeScript project configuration
public/
  favicon.svg                        Copy of the existing K logo
  favicon.ico                        16, 32 and 48 px versions in one ICO
  apple-touch-icon.png                180 × 180 icon with a white background
src/
  main.tsx                           React entry, fonts and global styles
  App.tsx                            Renders AnaPage
  index.css                          Theme variables and global styles
  pages/AnaPage.tsx                   Page composition and section order
  assets/images/Logo.svg             Source K logo
  components/sections/               Hero, Projects, About, Stacks, Contact, Footer
  components/ui/                     Navigation, buttons, summary and form controls
  components/Robot/RobotCanvas.tsx    Spline scene loading and visibility handling
  components/feedback/               Loading, ErrorBoundary, NotFound
  data/                              Site/project content, tech icons, Spline credit
  lib/supabase.ts                    Browser Supabase client
  store/menu.ts                      Zustand mobile-menu state
  types/                             Project and profile-summary types
tests/                               About, Navbar and contact-copy tests
supabase/
  config.toml                        Contact function configuration
  functions/contact/index.ts         Validation, rate limit, database and email flow
  functions/contact/deno.json         Edge Function dependency mappings
  tests/contact_rate_limit.sql        Database permissions and rate-limit check
THIRD_PARTY_NOTICES.md                Spline attribution and license information
```

## Icons and metadata

The icons use the geometry and colors from `src/assets/images/Logo.svg`. Vite copies `public/` into `dist/`; the HTML links to `/favicon.svg`, `/favicon.ico` and `/apple-touch-icon.png`. Keep those generated assets in sync when changing the source logo.

The page language is English. The requested “Kopyalandı” feedback has its own `lang="tr"` marker. Open Graph and X metadata describe Kaan Hamitler and his frontend work. No live domain is configured, so metadata does not invent an `og:url` or absolute social-image URL. Add the real production URLs when publishing.

## Frontend deployment and verification

Set the four applicable `VITE_*` values on the static host, run `pnpm build`, and publish `dist/` at the domain root. The current icon URLs are root-relative. Deploy the Supabase function separately if the contact form is needed.

After building, use `pnpm preview` to inspect the output and open the three icon URLs. Run `node --test`, `pnpm lint` and `pnpm build` before publishing. The Node tests cover selected component behavior; they are not browser end-to-end tests.

No Lighthouse score, performance improvement or full accessibility conformance is claimed. Build output currently warns about JavaScript chunks larger than 500 kB. Color contrast checks cover the updated text/button combinations and do not replace a full accessibility review.
