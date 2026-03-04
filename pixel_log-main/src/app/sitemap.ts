import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pixel-log.com';

  const routes = [
    '',
    '/about',
    '/design',
    '/design/branding',
    '/design/web',
    '/design/print',
    '/blog',
    '/online_ad',
    '/dev',
    '/dev/website',
    '/dev/software',
    '/video',
    '/contact',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route.split('/').length === 2 ? 0.8 : 0.6,
  }));
}
