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
    q: 'How do I turn Face ID on or off?',
    a: <p>Tap your initial at the top of Today, open <strong>Settings</strong>, and use the Face ID switch.</p>,
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
    q: 'Can my coparent join Codaze?',
    a: (
      <p>Not yet. This version of Codaze is your own record: you can add your coparent, partner and helpers, set your rhythm and log swaps. Inviting the other parent comes in a later release.</p>
    ),
  },
  {
    q: 'Does Codaze track my location?',
    a: (
      <p>No. During a swap, Codaze can use your location on your phone to tell you when you&rsquo;re close to the pickup spot. It isn&rsquo;t sent to us or to anyone else. See the <Link href="/codaze/privacy">Privacy Policy</Link>.</p>
    ),
  },
  {
    q: 'How do I delete my account?',
    a: (
      <p>Tap your initial at the top of Today, open <strong>Settings</strong>, and tap <strong>Delete account</strong> at the bottom. Codaze asks you to confirm twice, then removes your account and everything in it.</p>
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
