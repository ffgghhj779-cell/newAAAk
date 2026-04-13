import {setRequestLocale} from 'next-intl/server';
import {getVisaBySlug, getCategories} from '@/lib/api';
import {Link} from '@/i18n/routing';
import ApplyButton from '@/components/ui/ApplyButton';
import Image from 'next/image';
import {Clock, DollarSign, ArrowLeft, ArrowRight, CheckCircle2, Calendar} from 'lucide-react';
import {notFound} from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{locale: string; slug: string}> }) {
  const {locale, slug} = await params;
  const visa = await getVisaBySlug(slug);
  
  if (!visa) return { title: 'Visa Not Found' };

  const title = locale === 'ar' ? visa.title_ar : visa.title_en;
  const description = locale === 'ar' ? visa.desc_short_ar : visa.desc_short_en;

  return {
    title: `${title} | Sovereign Maarij Fund`,
    description,
    openGraph: {
      title,
      description,
      images: [visa.image],
    },
    alternates: {
      languages: {
        'en': `/en/visas/${slug}`,
        'ar': `/ar/visas/${slug}`,
        'x-default': `/en/visas/${slug}`,
      },
    },
  };
}

export default async function VisaDetailPage({
  params
}: {
  params: Promise<{locale: string; slug: string}>;
}) {
  const {locale, slug} = await params;
  setRequestLocale(locale);

  const visa = await getVisaBySlug(slug);
  
  if (!visa) {
    notFound();
  }

  const categories = await getCategories();
  const category = categories.find(c => c.id === visa.categoryId);
  const requirements = locale === 'ar' ? visa.requirements_ar : visa.requirements_en;

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: locale === 'ar' ? visa.title_ar : visa.title_en,
    image: visa.image,
    description: locale === 'ar' ? visa.desc_short_ar : visa.desc_short_en,
    offers: visa.price ? {
      '@type': 'Offer',
      price: visa.price,
      priceCurrency: visa.currency,
      availability: 'https://schema.org/InStock'
    } : undefined
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: locale === 'ar' ? 'الرئيسية' : 'Home',
        item: `https://maarijfund.com/${locale}`
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: locale === 'ar' ? 'الفئات' : 'Categories',
        item: `https://maarijfund.com/${locale}/categories`
      },
      category ? {
        '@type': 'ListItem',
        position: 3,
        name: locale === 'ar' ? category.title_ar : category.title_en,
        item: `https://maarijfund.com/${locale}/categories/${category.slug}`
      } : null,
      {
        '@type': 'ListItem',
        position: category ? 4 : 3,
        name: locale === 'ar' ? visa.title_ar : visa.title_en,
        item: `https://maarijfund.com/${locale}/visas/${slug}`
      }
    ].filter(Boolean)
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([productJsonLd, breadcrumbJsonLd]) }}
      />
      {/* Hero Header */}
      <div className="relative h-[500px] w-full">
        <Image
          src={visa.image}
          alt={locale === 'ar' ? visa.title_ar : visa.title_en}
          fill
          sizes="100vw"
          referrerPolicy="no-referrer"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1F2937] via-[#1F2937]/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 max-w-7xl mx-auto">
          <Link href="/visas" className="inline-flex items-center text-white/80 hover:text-white font-medium mb-8 transition-colors">
            {locale === 'ar' ? <ArrowRight className="ml-2 w-5 h-5" /> : <ArrowLeft className="mr-2 w-5 h-5" />}
            {locale === 'ar' ? 'العودة للتأشيرات' : 'Back to Visas'}
          </Link>
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-white/20 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-sm font-semibold border border-white/30">
              {locale === 'ar' ? category?.title_ar : category?.title_en}
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
            {locale === 'ar' ? visa.title_ar : visa.title_en}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-16">
            <section>
              <h2 className="text-3xl font-serif font-bold text-[#1F2937] mb-8 flex items-center gap-4">
                <span className="w-8 h-1 bg-[#7C3AED] rounded-full" />
                {locale === 'ar' ? 'نظرة عامة' : 'Overview'}
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed font-light">
                {locale === 'ar' ? visa.desc_full_ar : visa.desc_full_en}
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-serif font-bold text-[#1F2937] mb-8 flex items-center gap-4">
                <span className="w-8 h-1 bg-[#7C3AED] rounded-full" />
                {locale === 'ar' ? 'المتطلبات' : 'Requirements'}
              </h2>
              <div className="bg-white rounded-[2rem] p-10 shadow-xl shadow-[#7C3AED]/5 border border-gray-100">
                <ul className="space-y-6">
                  {requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-[#7C3AED]/10 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-5 h-5 text-[#7C3AED]" />
                      </div>
                      <span className="text-gray-700 text-lg leading-relaxed">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[2rem] p-8 shadow-2xl shadow-[#7C3AED]/10 border border-gray-100 sticky top-28">
              <h3 className="text-2xl font-serif font-bold text-[#1F2937] mb-8">
                {locale === 'ar' ? 'تفاصيل التأشيرة' : 'Visa Details'}
              </h3>
              
              <div className="space-y-6 mb-10">
                <div className="flex items-center gap-5 p-4 rounded-2xl bg-gray-50">
                  <div className="w-14 h-14 bg-white shadow-sm rounded-xl flex items-center justify-center shrink-0">
                    <Calendar className="w-7 h-7 text-[#7C3AED]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">
                      {locale === 'ar' ? 'المدة' : 'Duration'}
                    </p>
                    <p className="font-bold text-[#1F2937] text-lg">
                      {locale === 'ar' ? visa.duration_ar : visa.duration_en}
                    </p>
                  </div>
                </div>

                {visa.price && (
                  <div className="flex items-center gap-5 p-4 rounded-2xl bg-gray-50">
                    <div className="w-14 h-14 bg-white shadow-sm rounded-xl flex items-center justify-center shrink-0">
                      <DollarSign className="w-7 h-7 text-[#7C3AED]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">
                        {locale === 'ar' ? 'السعر التقديري' : 'Estimated Price'}
                      </p>
                      <p className="font-bold text-[#1F2937] text-2xl">
                        {visa.price} <span className="text-lg text-gray-500 font-normal">{visa.currency}</span>
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <ApplyButton 
                visaId={visa.id} 
                visaTitle={locale === 'ar' ? visa.title_ar : visa.title_en} 
                locale={locale} 
                text={locale === 'ar' ? 'قدم طلبك الآن' : 'Apply Now'} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
