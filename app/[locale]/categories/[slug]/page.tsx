import {setRequestLocale} from 'next-intl/server';
import {getCategoryBySlug, getVisasByCategory} from '@/lib/api';
import {Link} from '@/i18n/routing';
import {Card, CardContent, CardFooter} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import Image from 'next/image';
import {Clock, DollarSign, ArrowLeft, ArrowRight} from 'lucide-react';
import {notFound} from 'next/navigation';

export default async function CategoryDetailPage({
  params
}: {
  params: Promise<{locale: string; slug: string}>;
}) {
  const {locale, slug} = await params;
  setRequestLocale(locale);

  const category = await getCategoryBySlug(slug);
  
  if (!category) {
    notFound();
  }

  const categoryVisas = await getVisasByCategory(category.id);

  return (
    <div className="py-24 bg-[#FAF9F6] min-h-screen relative overflow-hidden">
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] bg-gradient-to-br from-[#7C3AED]/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-16">
          <Link href="/categories" className="inline-flex items-center text-[#7C3AED] hover:text-[#6D28D9] font-medium mb-6 transition-colors">
            {locale === 'ar' ? <ArrowRight className="ml-2 w-4 h-4" /> : <ArrowLeft className="mr-2 w-4 h-4" />}
            {locale === 'ar' ? 'العودة للفئات' : 'Back to Categories'}
          </Link>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1F2937] mb-6">
            {locale === 'ar' ? category.title_ar : category.title_en}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] rounded-full" />
        </div>

        {categoryVisas.length === 0 ? (
          <div className="text-center py-24 bg-white/50 backdrop-blur-sm rounded-3xl border border-gray-100">
            <p className="text-xl text-gray-500 font-light">
              {locale === 'ar' ? 'لا توجد تأشيرات في هذه الفئة حالياً.' : 'No visas found in this category currently.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {categoryVisas.map((visa) => (
              <Card key={visa.id} className="overflow-hidden flex flex-col hover:shadow-2xl hover:shadow-[#7C3AED]/10 transition-all duration-500 border border-gray-100 bg-white/80 backdrop-blur-sm group hover:-translate-y-1 rounded-3xl">
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={visa.image}
                    alt={locale === 'ar' ? visa.title_ar : visa.title_en}
                    fill
                    referrerPolicy="no-referrer"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <CardContent className="p-8 flex-grow">
                  <h3 className="text-2xl font-bold text-[#1F2937] mb-4 group-hover:text-[#7C3AED] transition-colors">
                    {locale === 'ar' ? visa.title_ar : visa.title_en}
                  </h3>
                  <p className="text-gray-600 mb-6 line-clamp-2 leading-relaxed">
                    {locale === 'ar' ? visa.desc_short_ar : visa.desc_short_en}
                  </p>
                  <div className="flex flex-col gap-3 text-sm text-gray-500">
                    <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
                      <Clock className="w-5 h-5 text-[#A78BFA]" />
                      <span className="font-medium">{locale === 'ar' ? visa.duration_ar : visa.duration_en}</span>
                    </div>
                    {visa.price && (
                      <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
                        <DollarSign className="w-5 h-5 text-[#A78BFA]" />
                        <span className="font-bold text-[#1F2937] text-base">
                          {visa.price} {visa.currency}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="p-8 pt-0">
                  <Button asChild className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] h-12 text-base rounded-xl shadow-md shadow-[#7C3AED]/20 transition-all hover:shadow-[#7C3AED]/40">
                    <Link href={`/visas/${visa.slug}`}>
                      {locale === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
