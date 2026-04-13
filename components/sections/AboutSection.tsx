import {getTranslations} from 'next-intl/server';
import Image from 'next/image';
import {CheckCircle2} from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/ScrollReveal';

export async function AboutSection() {
  const t = await getTranslations('Index');
  const tNav = await getTranslations('Navigation');
  const locale = tNav('home') === 'الرئيسية' ? 'ar' : 'en';

  const featuresAr = [
    'خدمات سيادية متميزة',
    'شبكة علاقات عالمية',
    'سرية وموثوقية تامة',
    'استشارات مخصصة'
  ];

  const featuresEn = [
    'Premium Sovereign Services',
    'Global Network',
    'Complete Confidentiality',
    'Personalized Consulting'
  ];

  const features = locale === 'ar' ? featuresAr : featuresEn;

  return (
    <section className="py-24 bg-[#FAF9F6] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-[600px] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-[#7C3AED]/10 group">
              <Image
                src="https://picsum.photos/seed/office/1000/1000"
                alt="About Us"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                referrerPolicy="no-referrer"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F2937]/40 to-transparent" />
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1F2937] mb-6">{t('about_title')}</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] mb-8 rounded-full" />
              <p className="text-xl text-gray-600 leading-relaxed mb-10 font-light">
                {t('about_desc')}
              </p>
              <StaggerContainer>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {features.map((feature, index) => (
                    <StaggerItem key={index}>
                      <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-50 hover:shadow-md transition-shadow">
                        <div className="w-10 h-10 rounded-full bg-[#7C3AED]/10 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-5 h-5 text-[#7C3AED]" />
                        </div>
                        <span className="text-[#1F2937] font-medium">{feature}</span>
                      </div>
                    </StaggerItem>
                  ))}
                </div>
              </StaggerContainer>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
