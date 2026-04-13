import {setRequestLocale} from 'next-intl/server';
import {getVisas, getCategories} from '@/lib/api';
import {VisasClient} from './VisasClient';

export default async function VisasPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  
  const visas = await getVisas();
  const categories = await getCategories();

  return (
    <div className="py-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1F2937] mb-2">
            {locale === 'ar' ? 'جميع التأشيرات' : 'All Visas'}
          </h1>
          <p className="text-gray-500">
            {locale === 'ar' ? 'تصفح وقم بتصفية التأشيرات المتاحة حسب الوجهة' : 'Browse and filter available visas by destination'}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
          <VisasClient visas={visas} categories={categories} locale={locale} />
        </div>
      </div>
    </div>
  );
}
