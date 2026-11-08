/**
 * Universal links for the Codaze app. iOS fetches this file (through Apple's
 * CDN) when the app is installed, and opens alldaze.studio/codaze/i/{code}
 * links in Codaze instead of the browser. It must be served as JSON, at this
 * exact path, with no extension and no redirect.
 */
const AASA = {
  applinks: {
    apps: [],
    details: [
      {
        appIDs: ['Q66HY6HK2T.studio.alldaze.codaze'],
        paths: ['/codaze/i/*'],
        components: [{ '/': '/codaze/i/*', comment: 'Codaze invite links' }],
      },
    ],
  },
};

export const dynamic = 'force-static';

export function GET() {
  return new Response(JSON.stringify(AASA), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
