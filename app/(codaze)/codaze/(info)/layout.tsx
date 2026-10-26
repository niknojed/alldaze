import Link from 'next/link';
import { HeldMark } from '@/components/legal/HeldMark';
import { LEGAL_ENTITY, TRADE_NAME } from '@/components/legal/shared';

/** Header and footer for Support, Privacy and Terms. */
export default function CodazeInfoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className="cz-head">
        <div className="cz-wrap cz-head-in">
          <Link className="cz-brand" href="/codaze">
            <HeldMark size={32} />
            <span>Codaze</span>
          </Link>
          <nav aria-label="Codaze pages">
            <Link href="/codaze/support">Support</Link>
            <Link href="/codaze/privacy">Privacy</Link>
            <Link href="/codaze/terms">Terms</Link>
          </nav>
        </div>
      </header>
      <main id="main" className="cz-wrap cz-main">
        {children}
      </main>
      <footer className="cz-foot">
        <div className="cz-wrap">
          <p>
            Codaze is made by <a href="https://alldaze.studio">{TRADE_NAME}</a>, a design and engineering studio in Atlanta, Georgia.
          </p>
          <p>© 2026 {LEGAL_ENTITY}, doing business as {TRADE_NAME}</p>
        </div>
      </footer>
    </>
  );
}
