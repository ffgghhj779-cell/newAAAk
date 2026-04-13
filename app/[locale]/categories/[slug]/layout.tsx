import { getCategoryBySlug } from '@/lib/api';

export async function generateMetadata({ params }: { params: Promise<{locale: string; slug: string}> }) {
  const {locale, slug} = await params;
  const category = await getCategoryBySlug(slug);
  
  if (!category) return { title: 'Category Not Found' };

  const title = locale === 'ar' ? category.title_ar : category.title_en;
  const description = locale === 'ar' ? `استكشف تأشيرات ${title}` : `Explore ${title} visas`;

  return {
    title: `${title} Visas | Sovereign Maarij Fund`,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
