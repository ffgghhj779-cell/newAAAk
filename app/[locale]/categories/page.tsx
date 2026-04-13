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
    <div className="py-24 bg-[#FAF9F6] min-h-screen relative overflow-hidden">
      <div className="absolute top-0 left-0 -translate-y-12 -translate-x-1/3 w-[800px] h-[800px] bg-gradient-to-br from-[#7C3AED]/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1F2937] mb-6">
            {locale === 'ar' ? 'فئات التأشيرات' : 'Visa Categories'}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] mx-auto rounded-full" />
        </div>

        <ScrollReveal>
          <StaggerContainer>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {categories.map((category) => {
                const Icon = iconMap[category.icon] || Globe;
                return (
                  <StaggerItem key={category.id}>
                    <Link href={`/categories/${category.slug}`} className="block h-full">
                      <Card className="group hover:shadow-2xl hover:shadow-[#7C3AED]/10 transition-all duration-500 border border-gray-100 bg-white/50 backdrop-blur-sm overflow-hidden h-full hover:-translate-y-1 rounded-3xl">
                        <CardContent className="p-10 flex flex-col items-center text-center relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/0 to-[#7C3AED]/0 group-hover:from-[#7C3AED]/5 group-hover:to-transparent transition-all duration-500" />
                          <div className="w-24 h-24 bg-gradient-to-br from-[#FAF9F6] to-white shadow-inner rounded-[2rem] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 relative z-10 border border-gray-50">
                            <Icon className="w-12 h-12 text-[#7C3AED]" strokeWidth={1.5} />
                          </div>
                          <h3 className="text-2xl font-bold text-[#1F2937] mb-2 relative z-10 group-hover:text-[#7C3AED] transition-colors">
                            {locale === 'ar' ? category.title_ar : category.title_en}
                          </h3>
                        </CardContent>
                      </Card>
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
