# AllDazeWork Build Package

Everything we built across the design sessions, packaged to drop into your `Alldazework` repo. Mirrors the project structure exactly so paths line up.

---

## What's in here

```
alldazework-build/
├── README.md                              ← you are here
├── CLAUDE.md                              ← context file for Claude Code (read automatically)
├── DEPLOYMENT.md                          ← THE FULL PLAYBOOK — read this first
├── .env.local.example                     ← env var template
├── preview.html                           ← static visual reference (not deployed)
│
├── app/
│   ├── api/contact/route.ts               🆕 NEW — contact form API handler
│   ├── layout.tsx                         🔁 REPLACES existing (Inter → Nunito)
│   └── page.tsx                           🔁 REPLACES existing (wires up all 8 sections)
│
├── components/sections/                   🆕 ALL NEW
│   ├── Contact.tsx                        section 08
│   ├── FAQ.tsx                            section 07
│   ├── Hero.tsx                           section 01
│   ├── Process.tsx                        section 05
│   ├── ProjectModal.tsx                   modal for Selected Work
│   ├── SectionHeader.tsx                  shared header pattern
│   ├── SelectedWork.tsx                   section 02
│   ├── Services.tsx                       section 04
│   ├── Testimonials.tsx                   section 06
│   └── WhyUs.tsx                          section 03
│
├── lib/                                   🆕 ALL NEW
│   ├── brand.ts                           design tokens (#0052FF, etc.)
│   └── email.ts                           Resend + Gmail provider abstraction
│
└── _config-updates/                       snippets to merge into existing config
    ├── tailwind.config.snippet.js         keyframes for animations
    └── package.deps.txt                   new deps to npm install
```

---

## Quick start (TL;DR)

1. **Open `DEPLOYMENT.md`** — that's the sequenced 7-phase playbook for installing Claude Code, picking an email provider, integrating files, deploying to Hostinger Cloud, and pointing the domain.

2. **From your project root, copy the files in:**
   ```bash
   cp -r alldazework-build/app/* app/
   cp -r alldazework-build/components/* components/
   cp -r alldazework-build/lib/* lib/
   cp alldazework-build/.env.local.example .
   cp alldazework-build/DEPLOYMENT.md .
   cp alldazework-build/CLAUDE.md .
   ```

3. **Install new deps** (see `_config-updates/package.deps.txt`):
   ```bash
   npm install resend nodemailer lucide-react
   npm install -D @types/nodemailer
   ```

4. **Update `tailwind.config.js`** by merging in the snippet from `_config-updates/tailwind.config.snippet.js`. Don't replace the whole file — just merge the `animation` and `keyframes` entries into `theme.extend`.

5. **Create `.env.local`** from the example and fill in your email provider creds. See `DEPLOYMENT.md` Phase 2 for which provider to pick.

6. **Test locally**: `npm run dev`, open `http://localhost:3000`, send a test contact form submission.

7. **Deploy**: follow Phases 4–7 in `DEPLOYMENT.md`.

---

## For Claude Code

If you're using Claude Code to integrate this, the `CLAUDE.md` file at the root gives it full context on the project conventions (design tokens, section patterns, file locations, build commands). It'll be read automatically when you `cd` into the project and run `claude`.

A solid opening prompt:

> Read CLAUDE.md and DEPLOYMENT.md. I'm in Phase 3 — integrating new files into the existing Next.js project. Walk me through it step by step. Don't run any commands yet; just tell me what you'd do and let me approve each step.

---

## Notes

- **`preview.html` is not deployable.** It's a single-file static demo of all sections rendered together, useful for reviewing the look before integration. After deploy, you can delete it.
- **`_config-updates/` is also not deployable.** It contains merge instructions for your existing `tailwind.config.js` and `package.json`. Once you've applied the changes, you can delete that folder too.
- The `🔁 REPLACES` files will overwrite your existing `app/layout.tsx` and `app/page.tsx`. If you've made customizations to those, diff first.

---

## Where this stands

✅ Built: Hero, Selected Work (with detail modal), Why Us bento, Services, Process, Testimonials carousel, FAQ accordion, Contact form with email API
⏳ Not built yet: Footer, sitemap/SEO, analytics, dedicated `/work/[slug]` pages, rate limiting
🚀 Ready to ship: yes, once you pick an email provider and run through the playbook
