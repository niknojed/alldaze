import type { Metadata } from 'next';
import Link from 'next/link';
import { CODAZE_CONTACT_EMAIL as CONTACT_EMAIL, CODAZE_TERMS_UPDATED, LEGAL_ENTITY } from '@/components/legal/shared';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'The terms for using the Codaze app.',
  alternates: { canonical: '/codaze/terms' },
};

export default function CodazeTermsPage() {
  return (
    <article>
      <h1>Terms of Use</h1>
      <p className="cz-updated">Last updated {CODAZE_TERMS_UPDATED}</p>

      <p className="cz-lede">
        These terms are an agreement between you and {LEGAL_ENTITY}, doing business as AllDazeWork (&ldquo;we&rdquo;), the maker of Codaze. By creating an account or using the app, you accept them. Our <Link href="/codaze/privacy">Privacy Policy</Link> explains how we handle your data.
      </p>

      <h2 id="who">Who can use Codaze</h2>
      <p>You must be 18 or older. Keep your account details accurate and your password to yourself. An account is for one person.</p>

      <h2 id="content">Your content</h2>
      <p>
        What you add to Codaze stays yours. You give us permission to store, process and display it only so we can run Codaze for you. When you delete it, that permission ends.
      </p>
      <p>
        You&rsquo;re responsible for what you add, including what you write about other people. Add only information you have the right to keep, and keep it lawful.
      </p>

      <h2 id="what">What Codaze is for</h2>
      <p>
        Codaze helps you organise schedules, swaps and commitments, and keep a private journal. It isn&rsquo;t legal advice, and it doesn&rsquo;t replace your parenting plan, a court order or an agreement with the other parent. Its records reflect what you enter; we don&rsquo;t verify them, and we can&rsquo;t promise a court will accept them. For legal questions, talk to a family-law attorney. In an emergency, call 911.
      </p>

      <h2 id="use">Using Codaze fairly</h2>
      <p>Don&rsquo;t use Codaze to:</p>
      <ul>
        <li>harass, threaten or monitor anyone;</li>
        <li>break the law or a court order;</li>
        <li>get into accounts or data that aren&rsquo;t yours, or interfere with the service.</li>
      </ul>

      <h2 id="price">Price</h2>
      <p>Codaze is free right now. If we add paid features, we&rsquo;ll mark them clearly and show the price before you pay. Purchases go through the App Store.</p>

      <h2 id="changes">Changes to Codaze and these terms</h2>
      <p>
        We improve Codaze and may change or remove features. If we change these terms in a way that matters, we&rsquo;ll tell you in the app before the change takes effect. Using Codaze after that means you accept the new terms.
      </p>

      <h2 id="ending">Ending your use</h2>
      <p>
        You can stop using Codaze and delete your account at any time from Settings in the app. We may suspend or close an account that breaks these terms, and we&rsquo;ll tell you why unless the law prevents it.
      </p>

      <h2 id="warranty">No warranty</h2>
      <p>
        We work to keep Codaze running and your data safe, but we provide it &ldquo;as is&rdquo; and &ldquo;as available.&rdquo; To the extent the law allows, we make no other promises about it, including that it will always be available or free of errors.
      </p>

      <h2 id="liability">Limits on liability</h2>
      <p>
        To the extent the law allows, we aren&rsquo;t liable for indirect or consequential losses arising from your use of Codaze, and our total liability for any claim is limited to the greater of what you paid us in the 12 months before the claim or $50. Some places don&rsquo;t allow these limits, so they may not apply to you.
      </p>

      <h2 id="law">Governing law</h2>
      <p>The laws of the State of Georgia, USA, govern these terms. Disputes go to the state or federal courts in Fulton County, Georgia, unless the law where you live gives you a different right.</p>

      <h2 id="apple">If you got Codaze from the App Store</h2>
      <p>
        These terms are between you and {LEGAL_ENTITY}, not Apple. Apple isn&rsquo;t responsible for Codaze or its support. Apple&rsquo;s{' '}
        <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/">Standard End User License Agreement</a>{' '}
        also applies to your use of the app. Apple and its subsidiaries may enforce these terms as third-party beneficiaries.
      </p>

      <h2 id="contact">Contact</h2>
      <p>
        {LEGAL_ENTITY}, doing business as AllDazeWork · Atlanta, Georgia · <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </p>
    </article>
  );
}
