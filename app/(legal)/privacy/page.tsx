import type { Metadata } from 'next';
import { LEGAL_ENTITY, STUDIO_CONTACT_EMAIL as CONTACT_EMAIL, STUDIO_POLICY_UPDATED } from '@/components/legal/shared';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'What the alldaze.studio website collects through its contact form, Talon, the quick review and Google tags.',
  alternates: { canonical: '/privacy' },
};

export default function StudioPrivacyPage() {
  return (
    <article>
      <h1>Privacy Policy</h1>
      <p className="lg-updated">Last updated {STUDIO_POLICY_UPDATED}</p>
      <p className="lg-lede">
        This policy covers the alldaze.studio website, run by {LEGAL_ENTITY}, doing business as AllDazeWork, in Atlanta, Georgia. Codaze, our app, has its own{' '}
        <a href="/codaze/privacy">privacy policy</a>.
      </p>

      <section className="lg-short" aria-labelledby="short">
        <h2 id="short">The short version</h2>
        <ul>
          <li>What you send through the contact form reaches our inbox, and we use it only to reply to you.</li>
          <li>Messages to Talon, our AI guide, are processed by Anthropic to write the replies.</li>
          <li>Your quick-review answers stay in your browser.</li>
          <li>Google tags measure visits and ad conversions. We don&rsquo;t sell your information.</li>
        </ul>
      </section>

      <h2 id="form">The contact form</h2>
      <p>
        The form asks for your name, email, business, what you need, and a short message. We email those details to our studio inbox through our mail provider, Hostinger, and use them to reply and, if we work together, to run the project. We keep inquiries in our inbox and delete them on request.
      </p>

      <h2 id="talon">Talon, our AI guide</h2>
      <p>
        When you chat with Talon, your messages, and your quick-review result if you took it, are sent to Anthropic&rsquo;s API to write the reply. Anthropic handles them under its commercial terms and doesn&rsquo;t use them to train its models. We don&rsquo;t keep the conversation on our server. Please don&rsquo;t share sensitive personal information in the chat.
      </p>

      <h2 id="review">The quick review</h2>
      <p>Your answers to the quick review, any unsent form text, and your day or night choice are saved in your own browser so they&rsquo;re there when you come back. They aren&rsquo;t sent to us unless you submit the form or chat with Talon.</p>

      <h2 id="google">Google tags and cookies</h2>
      <p>
        We use Google Tag Manager and Google Ads tags to measure visits and know when a form submission came from an ad. These tags set cookies and send Google information such as the pages you view, your browser and an approximate location from your IP address. You can manage ad personalisation at{' '}
        <a href="https://adssettings.google.com">adssettings.google.com</a> and block these cookies in your browser settings.
      </p>

      <h2 id="hosting">Hosting</h2>
      <p>Hostinger hosts this site. Like any web server, it records basic request logs such as IP address, time and page, which are used to keep the site running and secure.</p>

      <h2 id="rights">Your choices</h2>
      <p>Write to us to see, correct or delete what we hold about you, and we&rsquo;ll answer within 30 days. Depending on where you live, privacy laws may give you these rights; we honour them for everyone.</p>

      <h2 id="changes">Changes</h2>
      <p>When this policy changes, we update the date at the top.</p>

      <h2 id="contact">Contact</h2>
      <p>{LEGAL_ENTITY}, doing business as AllDazeWork · Atlanta, Georgia · <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
    </article>
  );
}
