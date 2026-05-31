# AllDazeWork Portfolio Site — Project Context

This file gives Claude Code instant context on this project's conventions and architecture. Read this before making changes.

---

## What this is

The marketing/portfolio site for **AllDazeWork**, a two-person design studio based in Atlanta, GA. The studio offers web design, UX strategy, digital marketing, and SEO/ads work, primarily for Atlanta small businesses and independent brand owners.

**Domain:** alldaze.studio (registered + hosted at Hostinger Cloud)
**Repo:** github.com/aKidNamedKam/Alldazework
**Email destination for contact form:** design@alldazework.com

---

## Tech stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS
- **Font:** Nunito (Google Fonts, via `next/font`)
- **Icons:** `lucide-react`
- **Email:** Resend OR Gmail SMTP (Nodemailer) — picked via `EMAIL_PROVIDER` env var
- **Hosting:** Hostinger Cloud (Node.js Web Apps)

---

## Design system

### Brand tokens (centralized in `lib/brand.ts`)

- **Primary blue:** `#0052FF` — accents, dots, brand-forward cards, primary CTAs
- **Hover blue:** `#003ECC`
- **Ink:** `#0A0A0A` — headlines
- **Text:** `#1F2937` — body
- **Muted:** `#6B7280` — labels, metadata
- **Line:** `#E5E7EB` — borders
- **Surface:** `#FAFAFA` — alternating section backgrounds

When introducing new colors or spacing tokens, **add them to `lib/brand.ts` first**, then reference. Don't hardcode hex values in components.

### Typography

- **Font:** Nunito throughout (already loaded in `app/layout.tsx`)
- **Headlines:** `font-bold`, tight `tracking-tight`, `leading-[0.95]–[1.05]`
- **Display sizes:** `text-4xl sm:text-5xl lg:text-6xl` for section headings; `text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem]` for the Hero H1
- **Duotone headline pattern:** appears in Hero, Why Us. First half in `text-gray-900`, second half in `text-gray-400`. Pivot at a natural phrase boundary.

### Section numbering (Kanso-inspired)

Every section displays a slash-prefixed label and (XX) number on the left side of its header:

```
/ Selected Work
(02)
```

Section assignments:
- Hero (01)
- Selected Work (02)
- Why Us (03)
- Services (04)
- Process (05)
- Testimonials (06)
- FAQ (07)
- Contact (08)

**Use the shared `SectionHeader` component** (`components/sections/SectionHeader.tsx`) for any new section to keep the pattern consistent. Pass `label`, `number`, `heading`, optional `description`, optional `action` slot.

### Patterns to preserve

- **Voice:** friendly, conversational, direct. No corporate-speak. "We" not "AllDazeWork". Lines like "we stick around" and "no high-pressure sales nonsense" are intentional.
- **Bento grid (WhyUs):** 4 columns on desktop, 2 on tablet, 1 on mobile. Cards have `rounded-2xl`, `border border-gray-200`.
- **Hover micro-interactions:** ArrowUpRight icons get `translate-x-0.5 -translate-y-0.5` on hover; text gets brand blue.
- **Section backgrounds alternate** between `bg-white` and `bg-[#FAFAFA]` for rhythm.

---

## File layout

```
app/
├── api/contact/route.ts        Contact form handler (validates, dispatches to lib/email.ts)
├── layout.tsx                  Root layout (Nunito font, metadata, OG tags)
└── page.tsx                    Home page (renders all 8 sections in order)

components/sections/
├── SectionHeader.tsx           Shared section header (slash label + number + heading)
├── Hero.tsx                    Section 01
├── SelectedWork.tsx            Section 02 — clicking a row opens ProjectModal
├── ProjectModal.tsx            Detail view modal (focus trap, keyboard nav, body scroll lock)
├── WhyUs.tsx                   Section 03 — 4-column bento grid
├── Services.tsx                Section 04 — numbered service rows
├── Process.tsx                 Section 05 — 4-step grid
├── Testimonials.tsx            Section 06 — single-quote carousel
├── FAQ.tsx                     Section 07 — accordion with grid-rows animation
└── Contact.tsx                 Section 08 — form with idle/submitting/success/error states

lib/
├── brand.ts                    Design tokens + section number constants
└── email.ts                    Provider abstraction (Resend vs Gmail SMTP)
```

---

## Build & test commands

```bash
npm run dev          # local dev server on http://localhost:3000
npm run build        # production build
npm start            # run production build locally
npm run lint         # ESLint
```

There are no tests configured. If adding tests, Jest + React Testing Library is the standard choice; Playwright for E2E.

---

## Conventions

### Components

- **Always `'use client'`** for sections that have any interactivity (state, event handlers, useEffect). Server Components are fine for purely static section bodies, but most sections use hover state or modals so they're client components.
- **Props with defaults** for any content that might need to be overridden per-page (testimonials, FAQ entries, project data). Provide sensible defaults so the component works out of the box.
- **Accessibility is not optional.** Use semantic HTML (`<section>`, `<button>`, `<aside>`, etc.), label form fields, add ARIA where roles aren't obvious, focus-trap modals, support keyboard nav (Escape, Arrow keys where appropriate).
- **Comments explain the *why*, not the *what*.** The code is the what.

### TypeScript

- Strict mode is on. No `any` unless absolutely necessary.
- Export interfaces from the file where they're primarily defined (e.g. `Project` and `ProjectDetail` are exported from `SelectedWork.tsx` and imported by `ProjectModal.tsx`).

### Styling

- Tailwind utility classes only. No CSS modules or styled-components.
- Arbitrary values like `bg-[#0052FF]` are fine for one-offs; if a color is repeated across 3+ files, add it to `tailwind.config.js` as a named token or pull from `lib/brand.ts`.
- Animations defined in `tailwind.config.js` keyframes block (currently `hero-marquee`, `modal-fade`, `modal-scale`).

### Adding a new section

1. Pick a number (likely the next sequential, or insert between existing).
2. Update `lib/brand.ts` `sectionNumbers` constant if it's a stable addition.
3. Create the component in `components/sections/`.
4. Use `SectionHeader` for the section title.
5. Alternate `bg-white` / `bg-[#FAFAFA]` for visual rhythm.
6. Import and render it in `app/page.tsx` in the right position.

### Adding a new case study

Edit the `defaultProjects` array in `components/sections/SelectedWork.tsx`. Each project needs:

```ts
{
  id: 'unique-slug',                    // used in URLs eventually
  name: 'Project Name',
  year: '2025',
  type: 'Brand & Web Design',           // short descriptor
  detail: {
    description: '...',                  // 2–4 sentence intro
    heroImage: '/images/projects/x.jpg', // place in /public/images/projects/
    heroImageAlt: '...',
    objective: '...',                    // single sentence
    contributions: ['...', '...'],       // 3–5 items
    biggestImpact: {
      statValue: '...',
      statLabel: '...',
      showStars: true,                   // 5 yellow stars below the stat
    },
  },
},
```

---

## Email / Contact form

### How it works

1. User submits form in `Contact.tsx`
2. POST to `/api/contact` with JSON body
3. `route.ts` validates, screens out bot honeypot, calls `sendContactEmail()` in `lib/email.ts`
4. `lib/email.ts` reads `EMAIL_PROVIDER` env var and dispatches to either Resend or Gmail SMTP
5. Recipient (`design@alldazework.com`) gets the email; replying goes directly to the submitter's email (`Reply-To` header)

### Switching providers

Change `EMAIL_PROVIDER` env var from `resend` to `gmail` (or vice versa) and restart. No code changes needed. See `DEPLOYMENT.md` Phase 2 for tradeoffs.

### Required env vars

See `.env.local.example` at the project root.

---

## Things NOT yet built (potential next phases)

- Footer component
- `/work/[slug]` dedicated case study pages (currently modal-only)
- Deep-linking for ProjectModal (`?project=digilence`)
- Sitemap (`app/sitemap.ts`) and `robots.txt`
- OG image generation (the metadata references `/og-image.png` but the file doesn't exist yet)
- Analytics (Plausible/Fathom recommended)
- Rate limiting on `/api/contact` (currently relies on honeypot + provider rate limits)
- Real testimonials (current ones are placeholder-quality, attributed to "Client Name")
- Real hero images for case studies (currently placeholder)
- A CMS layer if/when content management becomes a bottleneck

---

## Deployment

Full sequence is in `DEPLOYMENT.md`. Short version:

1. Push to `main` on GitHub
2. Hostinger hPanel auto-builds and deploys (Node.js Web Apps)
3. Env vars set in hPanel app settings
4. Domain `alldaze.studio` attached via hPanel
5. SSL via Let's Encrypt is automatic

---

## When in doubt

- **For design decisions:** match the Kanso template's structural patterns (numbered sections, duotone headlines, bento grids) but with AllDazeWork's warmer voice and `#0052FF` accent.
- **For content tone:** friendly + direct. Read existing copy in `Contact.tsx`, `FAQ.tsx`, and `Hero.tsx` for voice reference.
- **For technical choices:** keep dependencies minimal. The whole site should boot fast and stay simple.
