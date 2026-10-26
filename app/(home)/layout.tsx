import type { Metadata, Viewport } from 'next';
import { AnalyticsBody, AnalyticsHead } from '@/components/Analytics';
import '../archivo.css';
import './flight.css';

/**
 * Root layout for the homepage. It carries its own stylesheet, so the other
 * root layouts (app/(codaze), app/(legal)) can't change it, and the other way
 * round. Archivo is self-hosted (app/archivo.css); the page makes no request
 * to Google Fonts.
 */

const DESCRIPTION =
  'AllDazeWork is a two-person design and engineering studio in Atlanta. We build brands, websites, and products for local businesses and founders getting ready to launch.';

export const metadata: Metadata = {
  metadataBase: new URL('https://alldaze.studio'),
  title: {
    default: 'AllDazeWork — Atlanta design and engineering studio',
    template: '%s · AllDazeWork',
  },
  description: DESCRIPTION,
  alternates: { canonical: '/' },
  authors: [{ name: 'AllDazeWork' }],
  creator: 'AllDazeWork',
  publisher: 'AllDazeWork',
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://alldaze.studio',
    siteName: 'AllDazeWork',
    title: 'AllDazeWork — Atlanta design and engineering studio',
    description: DESCRIPTION,
    images: [{ url: '/site/team.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AllDazeWork — Atlanta design and engineering studio',
    description: DESCRIPTION,
    images: ['/site/team.jpg'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#BFD7FF',
};

// Sets data-mode before first paint. Day is the default for everyone; night
// only applies when the visitor picked it with the toggle (saved in localStorage).
const MODE_SCRIPT = `(function(){var m=null;try{m=localStorage.getItem('adw-mode')}catch(e){}
if(m!=='night'){m='day'}
document.documentElement.setAttribute('data-mode',m);})();`;

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: MODE_SCRIPT }} />
        <link rel="preload" href="/fonts/archivo/archivo-latin-normal.woff2" as="font" type="font/woff2" crossOrigin="" />
        <AnalyticsHead />
      </head>
      <body>
        <AnalyticsBody />
        {children}
      </body>
    </html>
  );
}
