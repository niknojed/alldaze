/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // One canonical host. www served the full site with a canonical pointing
  // at the apex, which Search Console reports as "Alternate page with proper
  // canonical tag". A 308 consolidates it instead.
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.alldaze.studio' }],
        destination: 'https://alldaze.studio/:path*',
        permanent: true,
      },
      // /atlanta is retired for now (source is in git history). Temporary on
      // purpose: browsers cache permanent redirects, which would block the
      // page if it comes back. Keeps ad clicks and indexed links landing.
      {
        source: '/atlanta',
        destination: '/',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
