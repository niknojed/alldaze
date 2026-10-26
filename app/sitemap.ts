import type { MetadataRoute } from 'next';

const BASE = 'https://alldaze.studio';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/`, changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE}/privacy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/codaze`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/codaze/support`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/codaze/privacy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/codaze/terms`, changeFrequency: 'yearly', priority: 0.3 },
  ];
}
