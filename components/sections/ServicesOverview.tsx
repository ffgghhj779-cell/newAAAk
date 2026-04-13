'use client';

import { Globe, TrendingUp, Handshake, Shield } from 'lucide-react';

export function ServicesOverview({locale}: {locale: string}) {
  const isAr = locale === 'ar';

  const services = [
    {
      icon: <Globe className="w-8 h-8 text-purple-600" />,
      title: isAr ? 'إقامة المستثمرين المتميزة' : 'Premium Residency & Citizenship',
      desc: isAr ? 'مساعدة شاملة للحصول على الإقامة والجنسية عبر برامج الاستثمار الاستراتيجية حول العالم.' : 'End-to-end assistance in securing residency and citizenship via strategic investment programs worldwide.'
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-purple-600" />,
      title: isAr ? 'استشارات تأسيس الشركات' : 'Corporate Establishment',
      desc: isAr ? 'تأسيس شركات دولية مع دمج قانوني كامل لتسهيل مسارات تأشيرات الأعمال بفاعلية.' : 'Seamless international company formation and legal integration to facilitate business visa routes.'
    },
    {
      icon: <Handshake className="w-8 h-8 text-purple-600" />,
      title: isAr ? 'إدارة الثروات والممتلكات' : 'Wealth & Property Integration',
      desc: isAr ? 'تأمين استثماراتك العقارية ودمجها ببرامج الهجرة السيادية للحصول على أفضل عائد وأمان.' : 'Securing your real estate investments and mapping them to sovereign immigration frameworks.'
    },
    {
      icon: <Shield className="w-8 h-8 text-purple-600" />,
      title: isAr ? 'حماية وضمان الملفات' : 'Protected Case Management',
      desc: isAr ? 'مراجعة وتدقيق سيادي لكافة المستندات لضمان التوافق المطلق مع المتطلبات القانونية للدول المختارة.' : 'Full sovereign audit of all documents ensuring absolute compliance with destination country frameworks.'
    }
  ];

  return (
    <section className="bg-[#FAF9F6] py-12 md:py-20 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 tracking-tight">
            {isAr ? 'الخدمات الاستراتيجية' : 'Strategic Services'}
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl">
            {isAr 
              ? 'نقدم مجموعة متكاملة من الحلول المصممة لكبار المستثمرين لضمان انتقال آمن واستثمار مستدام.' 
              : 'Delivering a comprehensive suite of solutions engineered for high-net-worth investors to ensure secure mobility and sustainable growth.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((svc, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-purple-50 rounded-xl flex items-center justify-center mb-6">
                {svc.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{svc.title}</h3>
              <p className="text-gray-500 leading-relaxed font-medium">
                {svc.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
