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
          <li>If you invite your coparent or your partner, they see the plan you share with them. Your Journal is only yours.</li>
          <li>We don&rsquo;t sell your data, show ads, or track you across other apps and websites.</li>
          <li>Codaze uses your location only during a custody swap, and only when you and your coparent have both turned that on. Your coordinates never leave your phone.</li>
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
        <dd>Names and roles of coparents, partners and helpers, and any phone number or email address you enter for them. Codaze doesn&rsquo;t contact them. An invite goes from your own Messages or share sheet.</dd>
        <dt>Invites</dt>
        <dd>The invite code, who it&rsquo;s for, and when it was used, cancelled or ran out. A code ends after 14 days.</dd>
        <dt>Your plans</dt>
        <dd>Rhythms and swap times, special days and school breaks, events and who takes and picks up for them, pickups, the names of places and the addresses you type, changes and requests, checklists and guidelines.</dd>
        <dt>Your Journal</dt>
        <dd>Entries, the photos you attach, mood check-ins, promises, rituals, and when you mark them done. Voice notes stay on your phone.</dd>
        <dt>Notifications</dt>
        <dd>If you allow notifications: a push token for each phone you use, that phone&rsquo;s time zone, and which kinds of notification you turned off.</dd>
        <dt>Location sharing</dt>
        <dd>Whether you and your coparent agreed to share location during swaps. While a swap is live, one of three words (on the way, close by, here) and an estimate in minutes; they are removed when the swap ends. A swap&rsquo;s record keeps the times you left, came close, arrived and confirmed. No coordinates, distances or routes.</dd>
      </dl>

      <h2 id="phone">What stays on your phone</h2>
      <ul>
        <li><strong>Where you are.</strong> Codaze doesn&rsquo;t use your location unless you and your coparent both turn on <strong>Share location</strong> for your shared plan. Either of you can turn it off for both of you at any time. When it&rsquo;s on, your phone uses your location only while a custody swap is live: from the moment you tap <strong>I&rsquo;m on my way</strong> until the swap is confirmed, stopped or closed, and never for more than two hours in the background. Your phone works out how far you are from the exchange spot by itself and sends your coparent one of three words (on the way, close by, here) and an estimate in minutes. Your coordinates don&rsquo;t leave your phone. We don&rsquo;t receive or store them, we don&rsquo;t draw a map, and where you are is never given to a mapping or routing service.</li>
        <li><strong>Where an exchange spot is.</strong> It&rsquo;s kept only on the phone you set it on. You set it from where your phone is at that moment, or by typing an address. A typed address is looked up by Apple&rsquo;s maps service on your iPhone to find the place; only the address is part of that lookup, never where you are, and we never receive the address&rsquo;s place.</li>
        <li><strong>Location permission.</strong> Codaze asks for &ldquo;While Using the App&rdquo; and never for &ldquo;Always&rdquo;. While sharing runs, your iPhone shows its location indicator and Codaze shows &ldquo;Sharing with&rdquo; your coparent&rsquo;s name and a Stop button. If you decline, swaps work as before, without it.</li>
        <li><strong>Face ID.</strong> Apple handles it. Codaze only learns whether the check passed.</li>
        <li><strong>Profile and kid photos.</strong> They stay on your phone and aren&rsquo;t uploaded.</li>
        <li><strong>Voice notes.</strong> They stay on your phone and aren&rsquo;t uploaded.</li>
        <li><strong>Reminders.</strong> Swap, check-in, ritual and weekly reminders are scheduled on your phone and don&rsquo;t pass through a server.</li>
        <li><strong>Messages you send.</strong> When Codaze opens Messages or Mail so you can text your coparent, the message goes through your phone&rsquo;s own app. We don&rsquo;t receive or keep it.</li>
      </ul>

      <h2 id="push">Notifications from the other parent</h2>
      <p>
        When someone you share a plan with does something that touches your day, our server sends your phone a notification: they&rsquo;re running late, they asked for a change or made one, they&rsquo;re close by or here during a swap you both share location for, they recorded a swap with you, or a job on an event was given, done or can&rsquo;t be done. A notification carries first names and times, and the event&rsquo;s title when it&rsquo;s about an event. It never carries a note, a reason, a mood or a place. Nothing is sent about your own actions, and nothing is sent to bring you back to the app.
      </p>
      <p>
        These are delivered through Expo&rsquo;s push service and Apple&rsquo;s. To do that, each receives your phone&rsquo;s push token and the text of the notification. You can turn notifications off in Settings, and the optional kinds off in Codaze under Me.
      </p>

      <h2 id="waitlist">The waitlist</h2>
      <p>
        If you join the waitlist on alldaze.studio/codaze, we keep your email address, your answer to whether your coparent uses a coparenting app (if you give one), and when you signed up. We use the email once, to tell you Codaze is in the App Store. The answer helps us plan; it&rsquo;s never linked to an account.
      </p>
      <p>
        The list is stored with Supabase. We delete it once the launch email has gone out, and sooner for anyone who asks at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>

      <h2 id="use">How we use it</h2>
      <p>We use your data to run Codaze: to show it to you, keep it in step, back it up, send sign-in and password emails, and answer you when you write to support.</p>
      <p>We don&rsquo;t use it for advertising, we don&rsquo;t build profiles about you, and we don&rsquo;t use it to train AI models. Codaze has no analytics or advertising tools inside the app.</p>

      <h2 id="who">Who can see it</h2>
      <p>Until you invite someone, only you can see your data.</p>
      <p>Once your coparent accepts an invite, you both see what&rsquo;s on your shared plan: the rhythm and every swap, exchange spots, the swap checklist, guidelines, Activity (what happened, with times) and the changes either of you asks for. Each of you keeps your own name and colour for each kid.</p>
      <p>Once your partner accepts an invite, they see the plan you share with them: its kids, activities and pickups, places, guidelines and Activity for those kids. They never see a plan you share with a coparent.</p>
      <p>One thing widens that, and only if you turn it on, kid by kid: <strong>Also helps with</strong> on your partner&rsquo;s profile. Your partner then also sees when that kid is home with you, your events on those days, a pickup you hand them, the name and colour you use for that kid, and the other parent&rsquo;s first name. Nothing else of that plan. Turn it off and it stops at once.</p>
      <p>Your Journal, check-ins, promises and rituals are only yours. Your coparent can&rsquo;t see them, and neither can anyone you add to a plan.</p>
      <p>If either of you ends the pact or deletes your account, each keeps a copy of the shared plan as it stood. Neither keeps anything of the other&rsquo;s Journal, which was never shared.</p>
      <p>We rely on a few providers to run the service. They handle data only to provide their service to us:</p>
      <ul>
        <li><strong>Supabase</strong> hosts the database, file storage and sign-in, sends account emails, and stores the waitlist.</li>
        <li><strong>Apple</strong> distributes the app through the App Store, delivers notifications to your iPhone, and looks up an address you type for an exchange spot. Apple&rsquo;s own privacy policy covers what Apple collects.</li>
        <li><strong>Expo</strong> passes notifications from our server to Apple. It receives your phone&rsquo;s push token and the notification&rsquo;s text.</li>
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
        To delete everything, tap your initial at the top of Today to open <strong>Me</strong>, then tap <strong>Delete account</strong> at the bottom. That removes your account and the data listed above, including Journal photos, from our service straight away, and clears Codaze&rsquo;s photos and voice notes from your phone. A plan you share with another parent stays with them, as Codaze tells you before you confirm. Copies in our hosting provider&rsquo;s backups are removed as those backups expire.
      </p>

      <h2 id="security">Security</h2>
      <p>
        Access rules on the database limit each account to its own data, and Journal photos sit in private storage. Sign-in uses your email and password, with optional Face ID on your phone. No system is perfect; if we learn of a breach that affects your data, we&rsquo;ll tell you.
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
