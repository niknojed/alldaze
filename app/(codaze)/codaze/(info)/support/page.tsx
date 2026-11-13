import type { Metadata } from 'next';
import Link from 'next/link';
import { CODAZE_CONTACT_EMAIL as CONTACT_EMAIL } from '@/components/legal/shared';

export const metadata: Metadata = {
  title: 'Support',
  description: 'Help with your Codaze account, sign-in, reminders and voice notes, and how to reach us.',
  alternates: { canonical: '/codaze/support' },
};

const FAQ: { q: string; a: React.ReactNode }[] = [
  {
    q: 'I didn’t get the email to finish signing up.',
    a: (
      <>
        <p>Check your spam or promotions folder for an email from Codaze. The link works once and expires after a while. If it has expired, open Codaze, start sign-up again with the same email, and use the new link on the same iPhone.</p>
        <p>To use a different address, tap <strong>Use a different email</strong> on the &ldquo;Check your email&rdquo; screen.</p>
      </>
    ),
  },
  {
    q: 'I forgot my password.',
    a: (
      <p>On the sign-in screen, enter your email and tap <strong>Forgot password?</strong>. Open the email on your iPhone and tap the link. Codaze opens and asks you to set a new password.</p>
    ),
  },
  {
    q: 'How do I invite my coparent?',
    a: (
      <>
        <p>Open <strong>Collabs</strong>, tap your coparent, then tap the <strong>Invite</strong> row under Contact. Codaze writes the message; you send it from your own Messages. The link works for 14 days, and you can resend or cancel it from the same place.</p>
        <p>Your coparent sees your shared plan once they accept. Your Journal stays yours.</p>
      </>
    ),
  },
  {
    q: 'My invite link opened a web page.',
    a: <p>That means Codaze isn&rsquo;t installed yet. Install it, then tap the link in your message again. Or tap <strong>Have an invite code?</strong> on the sign-up screen and type the five characters at the end of the link.</p>,
  },
  {
    q: 'How do I turn Face ID on or off?',
    a: <p>Tap your initial at the top of Today to open <strong>Me</strong>, and use the <strong>Sign in with Face ID</strong> switch.</p>,
  },
  {
    q: 'My ritual reminders don’t show up.',
    a: (
      <p>Reminders need notifications allowed for Codaze. On your iPhone, open Settings → Notifications → Codaze and turn on Allow Notifications. Then check the reminder time on the ritual in Journal.</p>
    ),
  },
  {
    q: 'A voice note won’t play.',
    a: (
      <p>Turn the ring/silent switch to ring, or raise the volume, and try again. If it still won&rsquo;t play, write to us with the date of the entry.</p>
    ),
  },
  {
    q: 'Does Codaze track my location?',
    a: (
      <p>No. Codaze never follows you, and it never draws a map. If you and your coparent both turn on <strong>Share location</strong>, each of you sees how close the other is during a swap: on the way, close by or here, with an estimate in minutes. Your coordinates never leave your phone, and either of you can turn it off for both. See the <Link href="/codaze/privacy">Privacy Policy</Link>.</p>
    ),
  },
  {
    q: 'How do I delete my account?',
    a: (
      <p>Tap your initial at the top of Today to open <strong>Me</strong>, then tap <strong>Delete account</strong> at the bottom. Codaze asks you to confirm twice, then removes your account and everything in it.</p>
    ),
  },
];

export default function CodazeSupportPage() {
  return (
    <article>
      <h1>Support</h1>
      <p className="cz-lede">Answers to common questions, and how to reach us when they don&rsquo;t cover it.</p>

      <section className="cz-contact" aria-labelledby="reach">
        <h2 id="reach" style={{ marginTop: 0, fontSize: 18 }}>Write to us</h2>
        <p>
          <a className="cz-mail" href={`mailto:${CONTACT_EMAIL}?subject=Codaze%20support`}>{CONTACT_EMAIL}</a>
        </p>
        <p>Tell us what happened, your iPhone model and iOS version. We reply within 2 to 7 business days.</p>
      </section>

      <h2 id="faq">Common questions</h2>
      <div className="cz-faq">
        {FAQ.map(item => (
          <details key={item.q}>
            <summary>{item.q}</summary>
            <div>{item.a}</div>
          </details>
        ))}
      </div>

      <p style={{ marginTop: 32 }}>
        See also the <Link href="/codaze/privacy">Privacy Policy</Link> and <Link href="/codaze/terms">Terms of Use</Link>.
      </p>
    </article>
  );
}
