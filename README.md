# alldaze.studio

The website for AllDazeWork (Adams & Sol LLC, doing business as AllDazeWork), a design and engineering studio in Atlanta, plus the public pages for Codaze, the studio's co-parenting app.

Next.js 15 (App Router), React 18, TypeScript. Deployed on Hostinger (Node.js app), which builds from `main`.

## Pages

| Route | Source | What it is |
|---|---|---|
| `/` | `app/(home)` | Studio homepage. Static markup in `components/flight/markup.ts`, behaviour in `components/flight/runtime.js` (review tool, Talon, contact form, day/night sky, hawk). |
| `/privacy` | `app/(legal)` | Privacy policy for the studio website. |
| `/codaze/privacy` | `app/(codaze)` | Codaze privacy policy. Linked from the app and App Store Connect. |
| `/codaze/terms` | `app/(codaze)` | Codaze terms of use. Linked from the app. |
| `/codaze/support` | `app/(codaze)` | Codaze support. App Store Connect support URL. |
| `/api/audit-request` | `app/api/audit-request` | Contact form → email through the hello@alldaze.studio mailbox. |
| `/api/chat` | `app/api/chat` | Talon, the AI guide (Anthropic API). Prompt in `lib/talon.ts`. |
| `/sitemap.xml`, `/robots.txt` | `app/sitemap.ts`, `app/robots.ts` | Add new public routes to the sitemap. |

Each folder in parentheses is a route group with its **own root layout and stylesheet** (`flight.css`, `legal.css`, `codaze.css`), so the pages can't restyle each other. Moving between groups is a full page load, which is expected.

Redirects live in `next.config.mjs`: `www` → apex (permanent) and the retired `/atlanta` → `/` (temporary on purpose).

## Fonts

All fonts are self-hosted; no page calls Google Fonts.

- **Archivo** (variable, weight 100–900, width 62–125%, SIL OFL): `public/fonts/archivo`, declared once in `app/archivo.css`, used by the homepage and `/privacy`.
- **Visby CF** (licensed) and **DM Sans** (SIL OFL): `app/(codaze)/fonts`, loaded with `next/font/local` in `app/(codaze)/layout.tsx`. Visby for headings, DM Sans for text, as in the app.

## Rate limits

`lib/rate-limit.ts` limits each IP address in memory:

- Talon: 25 requests per 10 minutes and 100 per day (one full conversation fits, with room to retry).
- Contact form: 5 per hour and 15 per day.

Over the limit, the route answers 429 with `Retry-After`; the page shows a friendly message. Counts reset when the app restarts. If the site ever runs on more than one instance, move the store to Redis or similar behind the same function.

## Environment

Copy `.env.example` to `.env.local` for local work. In production, set the same variables in Hostinger → Websites → alldaze.studio → Node.js → Environment variables.

| Variable | Used by |
|---|---|
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM` (optional) | Contact form mail |
| `NOTIFY_TO` | Where contact form notifications go |
| `ANTHROPIC_API_KEY` | Talon |

## Commands

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (what Hostinger runs)
npm run typecheck  # tsc --noEmit
```

If `typecheck` reports errors under `.next/types` for a route that no longer exists, the build cache is stale: delete `.next` and run `npm run build` (or `npm run dev`) once.

## Editing the legal pages

Names, contact addresses and "last updated" dates live in `components/legal/shared.ts`. Change a date there when a policy's substance changes. The Codaze pages describe what the app stores; keep them in step with the app (`codaze-monorepo`, `docs/codaze/STATE.md`) whenever its data or sharing changes.

## Analytics

Google Tag Manager (`GTM-52SJQJGM`) and the Google Ads tag (`AW-18351416027`) load on the homepage only (`components/Analytics.tsx`). The contact form pushes `lead_submit` to the data layer on success.

## Not deployed

`design/` holds prototypes and image sources. It isn't served.
