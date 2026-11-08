import type { Metadata } from 'next';
import Link from 'next/link';
import { CODAZE_APP_STORE_URL } from '@/components/legal/shared';

/**
 * Where an invite link lands when Codaze isn't installed. With the app
 * installed, iOS opens the link in Codaze and this page never shows
 * (apple-app-site-association). iOS can't carry the code through an App Store
 * install, so the page asks the person to tap the link again once Codaze is
 * on their phone, and shows the code for the "Have an invite code?" sheet.
 *
 * The page reads nothing from the server: who sent the invite stays in the app.
 * No referrer leaves the page, so the code never reaches the App Store or
 * anyone else, and invite pages are never indexed.
 */
export const metadata: Metadata = {
  title: 'You’re invited',
  description: 'You’re invited to plan your kids’ days together in Codaze.',
  robots: { index: false, follow: false },
  referrer: 'no-referrer',
};

const CODE = /^[23456789ABCDEFGHJKMNPQRSTVWXYZ]{5}$/;

export default async function InvitePage({ params }: { params: Promise<{ code: string }> }) {
  const { code: raw } = await params;
  const code = decodeURIComponent(raw).trim().toUpperCase();

  if (!CODE.test(code)) {
    return (
      <>
        <h1>This link doesn&rsquo;t look right</h1>
        <p className="cz-lede">Ask whoever sent it to send the invite again from Codaze.</p>
        <p><Link href="/codaze">About Codaze</Link></p>
      </>
    );
  }

  return (
    <>
      <h1>You&rsquo;re invited to Codaze</h1>
      <p className="cz-lede">You&rsquo;re invited to plan your kids&rsquo; days together: who has them when, pickups, checklists and what happened, on one plan you both see.</p>

      <ol className="cz-steps">
        <li>
          <strong>Install Codaze</strong>
          {CODAZE_APP_STORE_URL ? (
            <p><a className="cz-store" href={CODAZE_APP_STORE_URL} rel="noreferrer">Download on the App Store</a></p>
          ) : (
            <p>Codaze isn&rsquo;t in the App Store yet. Ask whoever sent the invite how they got it.</p>
          )}
        </li>
        <li>
          <strong>Tap the link in your message again</strong>
          <p>Codaze opens on the invite.</p>
        </li>
      </ol>

      <p className="cz-code">
        Or tap <strong>Have an invite code?</strong> when you sign up, and enter <span className="cz-code-val">{code}</span>
      </p>

      <p>Your Journal stays yours. <Link href="/codaze/privacy#who">Who sees what</Link></p>
    </>
  );
}
