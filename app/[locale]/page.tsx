import {setRequestLocale} from 'next-intl/server';
import { HeroSection } from '@/components/sections/HeroSection';
import { TrustSection } from '@/components/sections/TrustSection';
import { ServicesOverview } from '@/components/sections/ServicesOverview';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { FeaturedVisas } from '@/components/sections/FeaturedVisas';
import { CTASection } from '@/components/sections/CTASection';
import { getVisas } from '@/lib/api';
import { getFAQSchema } from '@/lib/schema';
import { Metadata } from 'next';

const SITE_URL = 'https://www.almaarijsovereignwealthfund.com';

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const isAr = locale === 'ar';

  return {
    title: isAr
      ? 'صندوق المعارج السيادي | بوابتك السيادية نحو الاقتصاد العالمي'
      : 'Sovereign Maareg Fund | Your Sovereign Gateway to The Global Market',
    description: isAr
      ? 'صندوق المعارج السيادي - خدمات تأشيرات استثنائية مصممة للمستثمرين وكبار الشخصيات. إقامة مستثمرين، جنسية عن طريق الاستثمار، تأشيرات ذهبية، تأسيس شركات دولية. نسبة نجاح 99.9%.'
      : 'Sovereign Maareg Fund - Exceptional visa services engineered for high-net-worth investors. Premium residency, citizenship by investment, golden visas, corporate establishment. 99.9% success rate.',
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        'en': `${SITE_URL}/en`,
        'ar': `${SITE_URL}/ar`,
        'x-default': `${SITE_URL}/en`,
      },
    },
  };
}

export default async function HomePage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);

  const visas = await getVisas();
  const faqSchema = getFAQSchema(locale);

  return (
    <div className="flex flex-col w-full bg-[#FAF9F6] min-h-screen">
      {/* FAQ Schema for AI Featured Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <HeroSection locale={locale} />
      <TrustSection locale={locale} />
      <ServicesOverview locale={locale} />
      <HowItWorks locale={locale} />
      <FeaturedVisas locale={locale} visas={visas} />
      <CTASection locale={locale} />
    </div>
  );
}
