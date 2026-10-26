import type { Metadata } from 'next';
import Link from 'next/link';
import { CODAZE_CONTACT_EMAIL as CONTACT_EMAIL, CODAZE_POLICY_UPDATED, LEGAL_ENTITY } from '@/components/legal/shared';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'What Codaze stores, what stays on your phone, who can see it, and how to delete it.',
  alternates: { canonical: '/codaze/privacy' },
};

export default function CodazePrivacyPage() {
  return (
    <article>
      <h1>Privacy Policy</h1>
      <p className="cz-updated">Last updated {CODAZE_POLICY_UPDATED}</p>

      <p className="cz-lede">
        Codaze is an app for parents who share their kids across two homes. {LEGAL_ENTITY}, doing business as AllDazeWork (&ldquo;we&rdquo;), makes it.
        This policy covers the Codaze iPhone app and these pages.
      </p>

      <section className="cz-short" aria-labelledby="short">
        <h2 id="short">The short version</h2>
        <ul>
          <li>We store what you add to Codaze so it stays in step across your phone and survives a reinstall.</li>
          <li>In this version of Codaze, only you can see your data.</li>
          <li>We don&rsquo;t sell your data, show ads, or track you across other apps and websites.</li>
          <li>Your location stays on your phone.</li>
          <li>You can delete your account, and everything in it, from inside the app.</li>
        </ul>
      </section>

      <h2 id="what">What you add, and what we store</h2>
      <dl className="cz-dl">
        <dt>Your account</dt>
        <dd>Your name and email address. Your password is handled by our sign-in provider; we can&rsquo;t read it.</dd>
        <dt>Your kids</dt>
        <dd>Names, nicknames, birthdays and the colour you pick for each child.</dd>
        <dt>The people in your plans</dt>
        <dd>Names and roles of coparents, partners and helpers, and any phone number or email address you enter for them. Codaze doesn&rsquo;t contact them.</dd>
        <dt>Your plans</dt>
        <dd>Rhythms and swap times, events, pickups, the places and addresses you type, changes and requests, checklists and guidelines.</dd>
        <dt>Your Journal</dt>
        <dd>Entries, the photos and voice notes you attach, mood check-ins, promises, rituals, and when you mark them done.</dd>
      </dl>

      <h2 id="phone">What stays on your phone</h2>
      <ul>
        <li><strong>Location.</strong> During a swap, Codaze uses your location to tell you when you&rsquo;re close to the pickup spot. It isn&rsquo;t sent to us or to anyone else.</li>
        <li><strong>Face ID.</strong> Apple handles it. Codaze only learns whether the check passed.</li>
        <li><strong>Profile and kid photos.</strong> They stay on your phone and aren&rsquo;t uploaded.</li>
        <li><strong>Reminders.</strong> Ritual reminders are scheduled on your phone. Codaze doesn&rsquo;t use a push notification service.</li>
        <li><strong>Messages you send.</strong> When Codaze opens Messages or Mail so you can text your coparent, the message goes through your phone&rsquo;s own app. We don&rsquo;t receive or keep it.</li>
      </ul>

      <h2 id="use">How we use it</h2>
      <p>We use your data to run Codaze: to show it to you, keep it in step, back it up, send sign-in and password emails, and answer you when you write to support.</p>
      <p>We don&rsquo;t use it for advertising, we don&rsquo;t build profiles about you, and we don&rsquo;t use it to train AI models. Codaze has no analytics or advertising tools inside the app.</p>

      <h2 id="who">Who can see it</h2>
      <p>In this version of Codaze, only you can see your data. When sharing with a coparent arrives, this policy will say exactly what they see, and you&rsquo;ll choose what to share.</p>
      <p>We rely on a few providers to run the service. They handle data only to provide their service to us:</p>
      <ul>
        <li><strong>Supabase</strong> hosts the database, file storage and sign-in, and sends account emails.</li>
        <li><strong>Apple</strong> distributes the app through the App Store. Apple&rsquo;s own privacy policy covers what Apple collects.</li>
        <li><strong>Hostinger</strong> hosts these web pages.</li>
      </ul>
      <p>
        <strong>Legal requests.</strong> We disclose data only when a valid legal process requires it, such as a subpoena or court order. We read each request narrowly, and we tell you about it first unless the law or the order forbids it. A request from the other parent, or their lawyer, without such a process gets no data.
      </p>

      <h2 id="kids">Kids&rsquo; information</h2>
      <p>
        Codaze is for adults. It isn&rsquo;t directed at children, and we don&rsquo;t knowingly collect information from children under 13. Parents add information about their own kids, and can change or delete it at any time. If you believe a child has created an account, write to us and we&rsquo;ll delete it.
      </p>

      <h2 id="keep">How long we keep it, and deleting it</h2>
      <p>We keep your data while your account exists. You can delete any item in the app at any time.</p>
      <p>
        To delete everything, tap your initial at the top of Today, open <strong>Settings</strong>, and tap <strong>Delete account</strong> at the bottom. That removes your account and the data listed above, including Journal photos and voice notes, from our service straight away. Copies in our hosting provider&rsquo;s backups are removed as those backups expire.
      </p>

      <h2 id="security">Security</h2>
      <p>
        Access rules on the database limit each account to its own data, and Journal photos and voice notes sit in private storage. Sign-in uses your email and password, with optional Face ID on your phone. No system is perfect; if we learn of a breach that affects your data, we&rsquo;ll tell you.
      </p>

      <h2 id="rights">Your choices</h2>
      <ul>
        <li>See and correct your data in the app.</li>
        <li>Delete items, or your whole account, in the app.</li>
        <li>Ask us for a copy of your data, or ask any question about it, by email. We&rsquo;ll answer within 30 days.</li>
      </ul>
      <p>Depending on where you live, privacy laws may give you these rights. We honour them for everyone.</p>

      <h2 id="changes">Changes to this policy</h2>
      <p>When this policy changes, we update the date at the top. If a change affects what we collect or who can see it, we&rsquo;ll tell you in the app before it takes effect.</p>

      <h2 id="contact">Contact</h2>
      <p>
        {LEGAL_ENTITY}, doing business as AllDazeWork · Atlanta, Georgia · <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </p>
      <p>
        See also the <Link href="/codaze/terms">Terms of Use</Link> and <Link href="/codaze/support">Support</Link>.
      </p>
    </article>
  );
}
