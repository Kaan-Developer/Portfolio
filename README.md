# Kaan Hamitler — Portfolio

My personal portfolio, built with React, TypeScript and Tailwind CSS. It brings together my introduction, projects, background and contact form.

## What's included

- A single page: Hero → Profile Summary → Projects → About → Contact, followed by the footer.
- A floating navbar, section links, a mobile menu and a scroll-to-top button.
- Technology and tool lists in About, with a desktop Stacks toggle.
- A Spline robot in About, loaded separately near the viewport. The scene is skipped below 768px and on devices without a hover-capable fine pointer.
- A contact form that calls a Supabase Edge Function, stores messages and optionally sends a notification through Resend.
- Self-hosted Instrument Sans and Bricolage Grotesque fonts.
- A light theme, visible focus outlines and CSS animations that respect reduced-motion preferences. Spline playback is managed separately by an IntersectionObserver.
- Page metadata, an SVG favicon, an ICO fallback and an Apple touch icon based on the existing K logo.

## Stack

| Area | Tools |
| --- | --- |
| Interface | React 19, TypeScript 6 |
| Styling | Tailwind CSS 4, Fontsource |
| Development | Vite 8, pnpm, Oxlint |
| 3D | Spline React and runtime |
| State and icons | Zustand, Lucide, React Icons, clsx |
| Contact | Supabase, Supabase Edge Functions, Resend |

## Run locally

Use **Node.js 22.12+** and **pnpm**. This satisfies the Node requirements of the current Vite and Supabase dependencies.

```bash
git clone https://github.com/Kaan-Developer/Portfolio.git
cd Portfolio
pnpm install --frozen-lockfile
```

Create `.env.local` in the project root and fill in the values:

```dotenv
VITE_ROBOT_2_URL=
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
```

Then start the development server:

```bash
pnpm dev
```

Open the URL printed by Vite.

| Variable | Purpose |
| --- | --- |
| `VITE_ROBOT_2_URL` | Public `.splinecode` URL for the scene used in About. |
| `VITE_SUPABASE_URL` | Supabase project URL used by the contact client. |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Public Supabase publishable key used to invoke the contact function. |
| `VITE_ROBOT_1_URL` | Optional alternative scene; the current page does not select it. |

Vite embeds `VITE_*` values in the browser bundle. Keep private credentials, including `EMAIL_API_KEY` and Supabase administrative keys, in the server environment. Missing Supabase values cause contact submission to fail; the client is created when the form is submitted.

## Commands

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start the development server. |
| `pnpm lint` | Run Oxlint. |
| `pnpm build` | Run `tsc -b` and create the production build in `dist/`. |
| `pnpm preview` | Serve the production build locally. |
| `node --test` | Run the existing About/Stacks and navbar regression tests. |

There is no `pnpm test` script. The current tests use mocked hooks and JSX; they do not replace browser interaction tests or verify the backend.

## Contact backend

The browser invokes the `contact` function in `supabase/functions/contact/index.ts`. The function checks inputs, calls the `consume_contact_request` RPC and inserts the message into `contact_messages`.

After saving the message, it attempts a Resend notification when the server-side `EMAIL_API_KEY` is set. A successful save does not guarantee notification delivery; the function returns `emailSent` separately. The current sender is `onboarding@resend.dev`, and the recipient is configured in the function.

The Supabase project must provide the table, RPC and appropriate database access policies. Their creation migrations are not included in this repository. `supabase/tests/contact_rate_limit.sql` contains database checks, but it is not run by `node --test`. The frontend build also does not type-check the Edge Function.

## Where to edit

| File | Purpose |
| --- | --- |
| `src/data/site.ts` | Personal text, profile summary, navigation, social links and some form copy. |
| `src/data/projects.ts` | Project entries and case-study data. |
| `src/types/project.ts` | Required project and case-study fields. |
| `src/data/techIcons.ts` | Technology names and their icon components. |
| `src/pages/AnaPage.tsx` | Page section order. |
| `src/components/sections/Contact.tsx` | Form behavior, email address and additional form copy. |
| `src/index.css` | Theme tokens, global styles and CSS animations. |
| `index.html` | Document language, title, metadata and icon links. |
| `src/assets/images/Logo.svg` | K logo used by the interface and SVG favicon. |
| `public/` | ICO fallback and Apple touch icon derived from the K logo. |

New projects must satisfy the `Project` type, including its required `caseStudy`. Technology names must match `techIcons` keys. The current project card does not display the case-study fields.

## Deployment

| Setting | Value |
| --- | --- |
| Install command | `pnpm install --frozen-lockfile` |
| Build command | `pnpm build` |
| Output directory | `dist` |

Set the frontend environment variables on the host before building. Configure and deploy the Supabase backend separately from the static frontend.

When the production domain and a social preview image are available, add the real canonical URL, `og:url`, and absolute image URLs to `index.html`. No production address is currently configured in the repository. The current social metadata provides a text summary. If the K logo changes, regenerate the ICO and Apple touch icon to match it.

The production build currently reports large Spline-related chunks. Browser behavior, performance, database policies and end-to-end contact delivery need their own checks; a passing frontend build does not verify them.

## Credits

The About robot uses a third-party model. Attribution and license details are in [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md), with visible credit in the footer.

[Kaan Hamitler on GitHub](https://github.com/Kaan-Developer)
