import {useTranslations} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {HeroSection} from '@/components/sections/HeroSection';
import {FeaturedCategories} from '@/components/sections/FeaturedCategories';
import {AboutSection} from '@/components/sections/AboutSection';
import {CTASection} from '@/components/sections/CTASection';

export default async function HomePage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <div className="flex flex-col w-full">
      <HeroSection locale={locale} />
      <AboutSection />
      <FeaturedCategories />
      <CTASection />
    </div>
  );
}
