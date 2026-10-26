import type { Metadata, Viewport } from 'next';
import Link from 'next/link';
import '../archivo.css';
import './legal.css';

/**
 * Root layout for the studio's own legal pages (/privacy). Plain reading
 * layout in the studio type and blue; no shaders, no runtime. Archivo comes
 * from the same self-hosted files as the homepage (app/archivo.css).
 */

export const metadata: Metadata = {
  metadataBase: new URL('https://alldaze.studio'),
  title: { default: 'AllDazeWork', template: '%s · AllDazeWork' },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#FFFFFF' };

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/fonts/archivo/archivo-latin-normal.woff2" as="font" type="font/woff2" crossOrigin="" />
      </head>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <header className="lg-head">
          <div className="lg-wrap lg-head-in">
            <Link href="/" className="lg-brand" aria-label="AllDazeWork home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/alldaze-logo.svg" alt="" width={120} height={18} />
              <span>AllDazeWork</span>
            </Link>
            <Link href="/#contact" className="lg-cta">Start a project</Link>
          </div>
        </header>
        <main id="main" className="lg-wrap lg-main">{children}</main>
        <footer className="lg-foot">
          <div className="lg-wrap">
            <p>© 2026 Adams &amp; Sol LLC, doing business as AllDazeWork · Atlanta, Georgia · <a href="mailto:design@alldazework.com">design@alldazework.com</a></p>
          </div>
        </footer>
      </body>
    </html>
  );
}
