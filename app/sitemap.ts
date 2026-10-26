import type { MetadataRoute } from 'next';

const BASE = 'https://alldaze.studio';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/`, changeFrequency: 'monthly', priority: 1 },
  ];
}
