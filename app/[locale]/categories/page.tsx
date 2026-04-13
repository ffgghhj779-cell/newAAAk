import {setRequestLocale} from 'next-intl/server';
import {getCategories} from '@/lib/api';
import {Link} from '@/i18n/routing';
import {Card, CardContent} from '@/components/ui/card';
import {Plane, Briefcase, GraduationCap, Building, Users, Globe} from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/ScrollReveal';

const iconMap: Record<string, React.ElementType> = {
  Plane,
  Briefcase,
  GraduationCap,
  Building,
  Users,
  Globe
};

export default async function CategoriesPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);

  const categories = await getCategories();

  return (
    <div className="py-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1F2937] mb-2">
            {locale === 'ar' ? 'فئات التأشيرات' : 'Visa Categories'}
          </h1>
          <p className="text-gray-500">
            {locale === 'ar' ? 'اختر الغرض من سفرك لعرض التأشيرات المناسبة' : 'Select your travel purpose to view matching visas'}
          </p>
        </div>

        <ScrollReveal>
          <StaggerContainer>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {categories.map((category) => {
                const Icon = iconMap[category.icon] || Globe;
                return (
                  <StaggerItem key={category.id}>
                    <Link href={`/categories/${category.slug}`} className="block h-full">
                      <div className="bg-white border border-gray-200 rounded-2xl p-6 h-full shadow-sm hover:border-[#7C3AED] hover:shadow-md transition-all duration-200 group flex items-start flex-col">
                        <div className="w-12 h-12 rounded-xl bg-[#7C3AED]/10 flex items-center justify-center mb-4 text-[#7C3AED] group-hover:scale-105 transition-transform duration-200">
                          <Icon className="w-6 h-6" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-lg font-bold text-[#1F2937] group-hover:text-[#7C3AED] transition-colors">
                          {locale === 'ar' ? category.title_ar : category.title_en}
                        </h3>
                      </div>
                    </Link>
                  </StaggerItem>
                );
              })}
            </div>
          </StaggerContainer>
        </ScrollReveal>
      </div>
    </div>
  );
}
