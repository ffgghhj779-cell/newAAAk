import { MetadataRoute } from 'next';
import { getVisas, getCategories } from '@/lib/api';

const SITE_URL = 'https://www.almaarijsovereignwealthfund.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const visas = await getVisas();
  const categories = await getCategories();

  // Core static pages (both locales)
  const staticPages = [
    '', // homepage
    '/visas',
    '/categories',
    '/about',
    '/contact',
  ];

  const staticUrls = staticPages.flatMap((page) => [
    {
      url: `${SITE_URL}/en${page}`,
      lastModified: new Date(),
      changeFrequency: page === '' ? 'daily' as const : 'weekly' as const,
      priority: page === '' ? 1.0 : 0.9,
      alternates: {
        languages: {
          en: `${SITE_URL}/en${page}`,
          ar: `${SITE_URL}/ar${page}`,
        },
      },
    },
    {
      url: `${SITE_URL}/ar${page}`,
      lastModified: new Date(),
      changeFrequency: page === '' ? 'daily' as const : 'weekly' as const,
      priority: page === '' ? 1.0 : 0.9,
      alternates: {
        languages: {
          en: `${SITE_URL}/en${page}`,
          ar: `${SITE_URL}/ar${page}`,
        },
      },
    },
  ]);

  // Dynamic visa pages
  const visaUrls = visas.flatMap((visa) => [
    {
      url: `${SITE_URL}/en/visas/${visa.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      alternates: {
        languages: {
          en: `${SITE_URL}/en/visas/${visa.slug}`,
          ar: `${SITE_URL}/ar/visas/${visa.slug}`,
        },
      },
    },
    {
      url: `${SITE_URL}/ar/visas/${visa.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      alternates: {
        languages: {
          en: `${SITE_URL}/en/visas/${visa.slug}`,
          ar: `${SITE_URL}/ar/visas/${visa.slug}`,
        },
      },
    },
  ]);

  // Dynamic category pages
  const categoryUrls = categories.flatMap((cat) => [
    {
      url: `${SITE_URL}/en/categories/${cat.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
      alternates: {
        languages: {
          en: `${SITE_URL}/en/categories/${cat.slug}`,
          ar: `${SITE_URL}/ar/categories/${cat.slug}`,
        },
      },
    },
    {
      url: `${SITE_URL}/ar/categories/${cat.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
      alternates: {
        languages: {
          en: `${SITE_URL}/en/categories/${cat.slug}`,
          ar: `${SITE_URL}/ar/categories/${cat.slug}`,
        },
      },
    },
  ]);

  return [...staticUrls, ...visaUrls, ...categoryUrls];
}
