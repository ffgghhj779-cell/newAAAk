import {getTranslations} from 'next-intl/server';
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

export async function FeaturedCategories() {
  const t = await getTranslations('Index');
  const tNav = await getTranslations('Navigation');
  const locale = tNav('home') === 'الرئيسية' ? 'ar' : 'en';
  
  const categories = await getCategories();

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#1F2937] mb-6">{t('featured_categories')}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] mx-auto rounded-full" />
          </div>
        </ScrollReveal>

        <StaggerContainer>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => {
              const Icon = iconMap[category.icon] || Globe;
              return (
                <StaggerItem key={category.id} className="h-full">
                  <Link href={`/categories/${category.slug}`} className="block h-full">
                    <Card className="group hover:shadow-2xl hover:shadow-[#7C3AED]/10 transition-all duration-500 border border-gray-100 bg-white/50 backdrop-blur-sm overflow-hidden h-full hover:-translate-y-1">
                      <CardContent className="p-8 flex flex-col items-center text-center relative h-full">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/0 to-[#7C3AED]/0 group-hover:from-[#7C3AED]/5 group-hover:to-transparent transition-all duration-500" />
                        <div className="w-20 h-20 bg-gradient-to-br from-[#FAF9F6] to-white shadow-inner rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 relative z-10 border border-gray-50">
                          <Icon className="w-10 h-10 text-[#7C3AED]" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-xl font-semibold text-[#1F2937] mb-2 relative z-10">
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
      </div>
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#7C3AED]/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}
