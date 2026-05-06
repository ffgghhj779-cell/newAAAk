import {setRequestLocale} from 'next-intl/server';
import { HeroSection } from '@/components/sections/HeroSection';
import { TrustSection } from '@/components/sections/TrustSection';
import { ServicesOverview } from '@/components/sections/ServicesOverview';
import dynamic from 'next/dynamic';
import { getVisas } from '@/lib/api';
import { getFAQSchema } from '@/lib/schema';
import { Metadata } from 'next';

const HowItWorks = dynamic(() => import('@/components/sections/HowItWorks').then(mod => mod.HowItWorks));
const FeaturedVisas = dynamic(() => import('@/components/sections/FeaturedVisas').then(mod => mod.FeaturedVisas));
const CTASection = dynamic(() => import('@/components/sections/CTASection').then(mod => mod.CTASection));

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
