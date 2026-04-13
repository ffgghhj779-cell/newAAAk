import {setRequestLocale} from 'next-intl/server';
import { HeroSection } from '@/components/sections/HeroSection';
import { TrustSection } from '@/components/sections/TrustSection';
import { ServicesOverview } from '@/components/sections/ServicesOverview';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { FeaturedVisas } from '@/components/sections/FeaturedVisas';
import { CTASection } from '@/components/sections/CTASection';
import { getVisas } from '@/lib/api';

export default async function HomePage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);

  const visas = await getVisas();

  return (
    <div className="flex flex-col w-full bg-[#FAF9F6] min-h-screen">
      <HeroSection locale={locale} />
      <TrustSection locale={locale} />
      <ServicesOverview locale={locale} />
      <HowItWorks locale={locale} />
      <FeaturedVisas locale={locale} visas={visas} />
      <CTASection locale={locale} />
    </div>
  );
}
