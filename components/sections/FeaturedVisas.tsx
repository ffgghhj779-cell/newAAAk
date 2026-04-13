import { Link } from '@/i18n/routing';
import { Visa } from '@/lib/api';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import Image from 'next/image';

export function FeaturedVisas({locale, visas}: {locale: string, visas: Visa[]}) {
  const isAr = locale === 'ar';
  
  // Show only top 3 featured visas
  const featured = visas.slice(0, 3);

  if (featured.length === 0) return null;

  return (
    <section className="bg-white py-12 md:py-20 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 md:mb-12 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 tracking-tight">
              {isAr ? 'برامج التأشيرات المميزة' : 'Featured Visa Programs'}
            </h2>
            <p className="text-gray-500">
              {isAr ? 'أبرز البرامج المصممة للنخبة والتي نضمن لك فيها أعلى معايير الجودة' : 'Top-tier programs engineered for the elite, ensuring the highest standards.'}
            </p>
          </div>
          <Link 
            href="/visas" 
            className="inline-flex items-center text-sm font-semibold text-purple-700 hover:text-purple-800"
          >
            {isAr ? 'عرض كل البرامج' : 'View all programs'}
            {isAr ? <ArrowLeft className="w-4 h-4 mr-1" /> : <ArrowRight className="w-4 h-4 ml-1" />}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((visa) => (
            <Link 
              key={visa.id} 
              href={`/visas/${visa.slug}`}
              className="group block bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-purple-600 hover:shadow-lg transition-all duration-300"
            >
              <div className="relative h-48 w-full border-b border-gray-100">
                <Image
                  src={visa.image}
                  alt={isAr ? visa.title_ar : visa.title_en}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors">
                  {isAr ? visa.title_ar : visa.title_en}
                </h3>
                <p className="text-sm text-gray-500 mb-6 line-clamp-2">
                  {isAr ? visa.desc_short_ar : visa.desc_short_en}
                </p>
                
                <div className="flex flex-col gap-3 py-4 border-t border-gray-100">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">{isAr ? 'المدة الزمنية' : 'Duration'}</span>
                    <span className="font-semibold text-gray-900">{isAr ? visa.duration_ar : visa.duration_en}</span>
                  </div>
                  {visa.price && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">{isAr ? 'الاستثمار المبدئي' : 'Initial Investment'}</span>
                      <span className="font-semibold text-gray-900">{visa.price} {visa.currency}</span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
