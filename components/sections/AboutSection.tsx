import {getTranslations} from 'next-intl/server';
import Image from 'next/image';
import {CheckCircle2, Shield, Globe, Award} from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/ScrollReveal';

export async function AboutSection() {
  const t = await getTranslations('Index');
  const tNav = await getTranslations('Navigation');
  const locale = tNav('home') === 'الرئيسية' ? 'ar' : 'en';
  const isAr = locale === 'ar';

  const featuresAr = [
    { title: 'خدمات سيادية متميزة', icon: <Shield className="w-5 h-5 text-blue-500" /> },
    { title: 'شبكة علاقات عالمية', icon: <Globe className="w-5 h-5 text-indigo-500" /> },
    { title: 'سرية وتشفير تامة', icon: <Award className="w-5 h-5 text-emerald-500" /> },
    { title: 'استشارات مخصصة', icon: <CheckCircle2 className="w-5 h-5 text-blue-500" /> }
  ];

  const featuresEn = [
    { title: 'Premium Sovereign Services', icon: <Shield className="w-5 h-5 text-blue-500" /> },
    { title: 'Global Strategic Network', icon: <Globe className="w-5 h-5 text-indigo-500" /> },
    { title: 'Absolute Confidentiality', icon: <Award className="w-5 h-5 text-emerald-500" /> },
    { title: 'Direct Advisory Access', icon: <CheckCircle2 className="w-5 h-5 text-blue-500" /> }
  ];

  const features = isAr ? featuresAr : featuresEn;

  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            
            {/* Visual Side: Bento-Style Image Composite */}
            <div className="relative group order-2 lg:order-1">
              <div className="grid grid-cols-6 grid-rows-6 gap-4 h-[500px] md:h-[600px]">
                {/* Main Large Image */}
                <div className="col-span-4 row-span-6 relative rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100">
                  <Image
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop"
                    alt="Sovereign Architecture"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" />
                </div>
                
                {/* Accent Images */}
                <div className="col-span-2 row-span-3 relative rounded-3xl overflow-hidden shadow-xl border border-gray-100">
                  <Image
                    src="https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=600&auto=format&fit=crop"
                    alt="Corporate Detail"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="col-span-2 row-span-3 relative rounded-3xl overflow-hidden shadow-xl border border-gray-100 bg-blue-600 flex items-center justify-center p-6">
                   <div className="text-white text-center">
                      <p className="text-3xl font-bold tracking-tighter">99%</p>
                      <p className="text-[10px] uppercase tracking-widest font-mono opacity-80">Success Rate</p>
                   </div>
                </div>
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 md:right-0 bg-white p-6 rounded-2xl shadow-xl border border-gray-50 hidden md:block">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                       <Shield className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                       <p className="text-sm font-bold text-gray-900">{isAr ? 'عضو مرخص' : 'Licensed Entity'}</p>
                       <p className="text-xs text-gray-500 font-mono">ID: SMF-9942</p>
                    </div>
                 </div>
              </div>
            </div>

            {/* Content Side */}
            <div className="order-1 lg:order-2">
              <div className="inline-block px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-mono tracking-widest uppercase mb-6">
                {isAr ? 'من نحن' : 'Institutional Profile'}
              </div>
              
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 tracking-tighter leading-tight">
                {isAr ? 'التميز السيادي في ' : 'Sovereign Excellence in '}
                <span className="text-blue-600">{isAr ? 'كل ملف' : 'Every Case'}</span>
              </h2>
              
              <p className="text-lg text-gray-500 leading-relaxed mb-12 font-light">
                {isAr 
                  ? 'نحن لا نقدم مجرد تأشيرات؛ بل نبني بوابات استراتيجية للمستثمرين حول العالم. منهجيتنا تعتمد على التدقيق السيادي الشامل لضمان أعلى نسب القبول وتجاوز التوقعات.' 
                  : 'We do not merely process visas; we architect strategic gateways for global investors. Our methodology relies on exhaustive sovereign audits to ensure the highest clearance rates in the industry.'}
              </p>
              
              <StaggerContainer>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <StaggerItem key={index}>
                      <div className="flex items-center gap-4 bg-slate-50/50 p-4 rounded-2xl border border-slate-100 hover:border-blue-200 transition-colors">
                        <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0 border border-slate-100">
                          {feature.icon}
                        </div>
                        <span className="text-gray-900 font-bold text-sm tracking-tight">{feature.title}</span>
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
