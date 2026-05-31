# AllDazeWork Deployment Playbook

This is the sequenced playbook to take `alldaze.studio` from local code to a live site on **Hostinger Cloud** with a working contact form routing to `design@alldazework.com`.

**Architecture summary:**
- **Domain & DNS**: Hostinger
- **App hosting**: Hostinger Cloud (Node.js Web Apps)
- **Email sending**: Resend *or* Gmail SMTP — pick one (this playbook covers both)

---

## Phase 1 — Install Claude Code

Claude Code is the CLI agent that'll edit files, run commands, and manage git for you. Requires Node.js 18+.

### Verify Node version
```bash
node --version   # should be v18.0.0 or higher
```
If older or missing, install the latest LTS via [nvm](https://github.com/nvm-sh/nvm) — never use `sudo` with npm.

### Install Claude Code (recommended: native installer)
```bash
# macOS / Linux / Windows (PowerShell)
curl -fsSL https://claude.ai/install.sh | bash
```

### Alternative: npm
```bash
npm install -g @anthropic-ai/claude-code
```

### Authenticate
```bash
cd ~/path/to/Alldazework
claude
```
On first run it'll walk you through OAuth. Sign in with your Claude Pro/Max account (recommended — no extra cost beyond your subscription) or with Anthropic Console API credits.

---

## Phase 2 — Pick your email provider

Make this decision before you start setting things up. Both work; tradeoffs:

| | **Resend** | **Gmail SMTP** |
|---|---|---|
| Setup time | ~5 min | ~10 min |
| Cost | Free up to 3,000 emails/mo | Free (uses your Workspace seat) |
| Deliverability | Excellent (built for transactional) | Good (uses Gmail's infrastructure) |
| Rate limit | 100/day on free, 50K+ on paid | ~500–2,000/day per account |
| Domain verification | Required for production (DKIM/SPF) | Already handled by Workspace |
| Dashboard / logs | Yes, every send tracked | No — check Gmail's "Sent" folder |
| Best for | Most cases — modern, simple, growth-ready | Already deep in Google's ecosystem |

**My recommendation for AllDazeWork:** **Resend.** It's purpose-built for this, has logs you can debug from, and scales smoothly if your contact volume grows. Gmail SMTP works fine for a portfolio but is a maintenance footgun if you ever hit rate limits or your App Password gets rotated.

That said — the code I built supports both, and you can switch via one env var. Pick one to start; you can change later in 30 seconds.

### Option A — Resend setup

1. Sign up at **[resend.com](https://resend.com)**. Free, no card required.
2. **API Keys → Create API Key.** Name it `alldazework-production`, permission `Sending access`. Copy the `re_...` key — you'll only see it once.
3. **Skip domain verification for now.** Resend gives you `onboarding@resend.dev` as a default sender for testing. Verify `alldaze.studio` later (Phase 6) for cleaner production emails.

### Option B — Gmail SMTP setup

1. **Use a dedicated sender account.** Don't authenticate with `design@alldazework.com` itself — create a Workspace alias or seat like `forms@alldazework.com` or `noreply@alldazework.com`. This isolates the SMTP credentials and lets you rotate them without touching your main inbox.
2. **Enable 2-Step Verification** on the sender account at [myaccount.google.com/security](https://myaccount.google.com/security).
3. **Generate an App Password** at [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords). Pick "Mail" as the app, then "Other (Custom name)" and call it "AllDazeWork contact form." Google gives you a 16-character password — copy it. **This is your `GMAIL_APP_PASSWORD`.** You won't see it again, but you can revoke and regenerate anytime.
4. **(Optional, recommended at scale):** In Google Workspace admin console → Apps → Google Workspace → Gmail → Routing → SMTP relay service, configure a relay rule. This is more robust than basic App Password auth but isn't required for a contact form.

---

## Phase 3 — Drop the new files into the project

```
Alldazework/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts                  ← NEW
│   ├── page.tsx                          ← UPDATE (wire up sections)
│   └── layout.tsx                        ← UPDATE (Nunito font)
├── components/
│   └── sections/
│       ├── Hero.tsx
│       ├── SelectedWork.tsx
│       ├── ProjectModal.tsx
│       ├── WhyUs.tsx
│       ├── Services.tsx
│       ├── Process.tsx
│       ├── Testimonials.tsx
│       ├── FAQ.tsx
│       ├── Contact.tsx                   ← NEW
│       └── SectionHeader.tsx
├── lib/
│   ├── brand.ts
│   └── email.ts                          ← NEW
├── .env.local.example                    ← NEW (committed, no secrets)
└── .env.local                            ← CREATE locally, NEVER commit
```

### Install dependencies
The codebase needs both email packages installed (the bundler statically analyzes both code paths, even though only one runs at a time):

```bash
npm install resend nodemailer
npm install -D @types/nodemailer
```

### Create your local environment file
```bash
cp .env.local.example .env.local
```

Open `.env.local` and fill it in. Set `EMAIL_PROVIDER` to either `resend` or `gmail`, then provide the credentials for whichever you picked. Leave the other provider's vars empty (they're ignored).

**For Resend:**
```env
EMAIL_PROVIDER=resend
[email protected]
[email protected]
RESEND_API_KEY=re_yourActualKey
```

**For Gmail:**
```env
EMAIL_PROVIDER=gmail
[email protected]
[email protected]
GMAIL_APP_PASSWORD=yourSixteenCharPassword
[email protected]
```

### Confirm `.gitignore` includes `.env*.local`
Next.js's default does. Verify:
```bash
grep -E '\.env.*\.local' .gitignore
```

### Update Tailwind config
The Hero marquee and Project Modal animations need keyframes. Add to `tailwind.config.js` under `theme.extend`:

```js
animation: {
  'hero-marquee': 'hero-marquee 40s linear infinite',
  'modal-fade': 'modal-fade 200ms ease-out',
  'modal-scale': 'modal-scale 300ms cubic-bezier(0.16, 1, 0.3, 1)',
},
keyframes: {
  'hero-marquee': {
    from: { transform: 'translateX(0)' },
    to: { transform: 'translateX(-33.333%)' },
  },
  'modal-fade': {
    from: { opacity: '0' },
    to: { opacity: '1' },
  },
  'modal-scale': {
    from: { opacity: '0', transform: 'scale(0.96) translateY(8px)' },
    to: { opacity: '1', transform: 'scale(1) translateY(0)' },
  },
},
```

### Wire up sections in `app/page.tsx`
```tsx
import Hero from '@/components/sections/Hero';
import SelectedWork from '@/components/sections/SelectedWork';
import WhyUs from '@/components/sections/WhyUs';
import Services from '@/components/sections/Services';
import Process from '@/components/sections/Process';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import Contact from '@/components/sections/Contact';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <SelectedWork />
      <WhyUs />
      <Services />
      <Process />
      <Testimonials />
      <FAQ />
      <Contact />
    </main>
  );
}
```

### Swap Inter for Nunito in `app/layout.tsx`
```tsx
import { Nunito } from 'next/font/google';

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
});

// in <body>:
<body className={`${nunito.className} antialiased`}>
```

### Test locally
```bash
npm run dev
```
Open `http://localhost:3000`, scroll to Contact, submit a test message. Check `design@alldazework.com`.

If nothing arrives:
- Check the terminal — the API route logs every send attempt and any errors
- For **Resend**, check the **Logs** tab in your Resend dashboard — every send attempt is recorded with success/failure detail
- For **Gmail**, common cause: `GMAIL_APP_PASSWORD` has spaces in it. Google displays the 16-char password with spaces for readability — remove them in `.env.local`.
- Restart `npm run dev` after editing `.env.local` (env vars only load at startup)

---

## Phase 4 — Deploy to Hostinger Cloud

Hostinger's hPanel has built-in **Node.js Web Apps** hosting that auto-detects Next.js from GitHub.

### 4.1 — Push your code to GitHub

If you haven't already:
```bash
git add .
git commit -m "Add Kanso-aligned sections, contact form, and email integration"
git push origin main
```

### 4.2 — Create the Node.js app in hPanel

1. Log into **hPanel** at hostinger.com.
2. **Websites** → **Add Website**.
3. Choose **Node.js Apps**.
4. Select **Import Git Repository**. Authorize GitHub access and pick `aKidNamedKam/Alldazework`.
5. Hostinger auto-detects Next.js and pre-fills:
   - **Framework**: Next.js
   - **Build command**: `npm run build`
   - **Start command**: `npm start`
   - **Node version**: choose 20 LTS (or latest stable)
6. **Don't deploy yet** — go to environment variables first.

### 4.3 — Add environment variables

In the app setup (or under **Settings → Environment Variables** after creation), add the same vars from your `.env.local`. **Do not include `EMAIL_PROVIDER` quotes** — Hostinger handles them as raw strings.

Required for **all** setups:
- `EMAIL_PROVIDER` = `resend` or `gmail`
- `CONTACT_TO_EMAIL` = `design@alldazework.com`
- `CONTACT_FROM_EMAIL` = `onboarding@resend.dev` (Resend) or your sender Gmail (Gmail)

If `EMAIL_PROVIDER=resend`:
- `RESEND_API_KEY` = your `re_...` key

If `EMAIL_PROVIDER=gmail`:
- `GMAIL_USER` = your sender Gmail address
- `GMAIL_APP_PASSWORD` = the 16-char App Password

### 4.4 — Deploy

Click **Deploy**. First build takes 3–5 minutes. Hostinger will give you a temporary URL like `your-app-xyz.hostingersite.com`.

### 4.5 — Test on the temporary URL

Visit the Hostinger URL, scroll to Contact, send a test message. Confirm the email arrives at `design@alldazework.com` **before** attaching your real domain. Easier to debug now than after DNS is in the picture.

---

## Phase 5 — Attach alldaze.studio to the app

Since both your domain and your hosting are at Hostinger, this is a one-screen change.

1. In **hPanel → Domains**, find `alldaze.studio`.
2. **Manage** → **DNS / Nameservers** — confirm it's using **Hostinger nameservers** (not an external registrar's). If not, point its nameservers to Hostinger's.
3. Go back to your Node.js app in hPanel → **Domains** section → **Add Domain**.
4. Enter `alldaze.studio`. Hostinger handles the DNS records internally.
5. SSL via Let's Encrypt is automatic — usually within a few minutes after DNS resolves.

Visit `https://alldaze.studio`. Live.

---

## Phase 6 — Verify alldaze.studio as a Resend sender (Resend users only)

This step is **optional but strongly recommended** for production. It lets you send from `hello@alldaze.studio` (or any address on your domain) instead of `onboarding@resend.dev`, which:
- Looks professional in the recipient's inbox
- Reduces spam-folder risk significantly

1. In Resend dashboard → **Domains** → **Add Domain** → `alldaze.studio`.
2. Resend gives you 4–5 DNS records (TXT for SPF, TXT for DKIM, sometimes MX, one for DMARC).
3. At Hostinger: **Domains → alldaze.studio → DNS Zone Editor**. Add each Resend record. They sit alongside whatever's already there — no conflict.
4. Back in Resend, click **Verify**. Takes a few minutes for DNS to propagate.
5. Update your `CONTACT_FROM_EMAIL` env var in hPanel to `hello@alldaze.studio` (or whatever address you prefer on the verified domain).
6. Trigger a redeploy in hPanel for the new env var to take effect.

---

## Phase 7 — Final smoke test

1. Visit `https://alldaze.studio/#contact`.
2. Submit a test message.
3. Confirm:
   - ✅ Success state shows in the UI
   - ✅ Email arrives at `design@alldazework.com`
   - ✅ "Reply" in your inbox goes to the test submitter's email (not Resend/Gmail)
   - ✅ Resend Logs / Gmail Sent folder shows the send

---

## Working with Claude Code from here

A few patterns once you're shipping:

**Pull latest and ship a change:**
```bash
cd ~/path/to/Alldazework
git pull
claude
> Add a "Pricing" section between Process and Testimonials. Match the Kanso section-numbering pattern (06), use SectionHeader, and base it on three tiers: Launch, Growth, Partnership. Use the same brand tokens from lib/brand.ts.
```

**Triage a build error on Hostinger:**
```bash
claude
> I'm seeing this error in Hostinger's deployment log: [paste error]. Read package.json and tell me how to fix it.
```

**Switch email providers later:**
```bash
claude
> I want to switch the contact form from Resend to Gmail SMTP. Help me update env vars in Hostinger hPanel and verify the change works.
```

Claude Code reads your codebase automatically — it'll know about `brand.ts`, `SectionHeader`, your Kanso patterns. Treat it like a teammate who's read the whole repo.

---

## Common gotchas

| Symptom | Cause | Fix |
|---|---|---|
| Form submits but no email arrives | Env var missing or typo'd in hPanel | hPanel → app → Environment Variables; redeploy after changes |
| Email arrives in spam | Using `onboarding@resend.dev` in production | Verify `alldaze.studio` in Resend (Phase 6) |
| `RESEND_API_KEY is not set` in production | Env var added but app not redeployed | hPanel → Deployments → Redeploy |
| Build fails: "Module not found: resend" | Forgot to commit `package.json` after `npm install` | `git add package.json package-lock.json && git commit && git push` |
| Build fails: "Module not found: nodemailer" | Same as above for nodemailer | `npm install nodemailer @types/nodemailer`, commit, push |
| Gmail auth error: "Username and Password not accepted" | Used regular password instead of App Password | Generate an App Password at [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords) |
| Gmail App Password "doesn't work" but looks right | The 16 chars have spaces (Google displays them grouped) | Strip all spaces; password is one unbroken string |
| Marquee or modal animations don't run | `tailwind.config.js` missing keyframes | Add the keyframes block from Phase 3 |
| Hostinger build succeeds but app doesn't start | Start command is wrong | Should be `npm start` (which runs `next start` on the port Hostinger assigns) |
| App starts but contact form returns 500 | Look at runtime logs in hPanel | hPanel → app → Logs |

---

## What's *not* set up yet (future phases)

- **Sitemap & SEO meta tags** — `app/sitemap.ts`, OpenGraph images, per-page metadata
- **Analytics** — Plausible or Fathom (privacy-friendly, simple to drop in)
- **Rate limiting on the contact form** — currently relies on honeypot + provider's per-account limits. A simple in-memory rate limiter or upstash-redis-based one is a 30-min addition.
- **Deep-linking for the Project Modal** — `?project=digilence` URL state for sharable links
- **A dedicated `/work/[slug]` page** for each case study (instead of modal-only)
- **Footer** component with nav, socials, copyright
- **CMS** if you want to manage case studies without code edits — Sanity, Contentful, or just MDX files in the repo
