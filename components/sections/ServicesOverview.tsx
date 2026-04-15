'use client';

import { Globe, TrendingUp, Handshake, Shield, ArrowRight, ArrowLeft, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from '@/i18n/routing';

export function ServicesOverview({locale}: {locale: string}) {
  const isAr = locale === 'ar';

  return (
    <section className="bg-white py-16 md:py-24 border-b border-gray-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tighter">
              {isAr ? 'الخدمات الاستراتيجية' : 'Strategic Architecture'}
            </h2>
            <p className="text-lg text-gray-500 font-light leading-relaxed">
              {isAr 
                ? 'نقدم منظومة متكاملة من الحلول السيادية المصممة لكبار المستثمرين لضمان أقصى درجات الأمان والانتقال العالمي السلس.' 
                : 'Delivering a comprehensive sovereign ecosystem engineered for high-net-worth investors to ensure absolute security and seamless global mobility.'}
            </p>
          </div>
        </div>

        {/* Bento Box Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 md:auto-rows-[320px]">
          
          {/* Card 1: Large Span */}
          <div className="md:col-span-2 relative bg-[#F8FAFC] rounded-3xl p-8 md:p-10 border border-slate-200/60 overflow-hidden group hover:border-blue-200 transition-colors">
             <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50 transform translate-x-1/3 -translate-y-1/3" />
             
             <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm border border-slate-100">
                    <Globe className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">
                    {isAr ? 'إقامة المستثمرين المتميزة' : 'Premium Residency'}
                  </h3>
                  <p className="text-gray-500 leading-relaxed font-medium max-w-md">
                    {isAr 
                      ? 'مساعدة شاملة للحصول على الإقامة والجنسية عبر برامج الاستثمار الاستراتيجية حول العالم.' 
                      : 'End-to-end framework assembly for securing citizenship and residency via sovereign investment programs.'}
                  </p>
                </div>
                
                <Link href="/categories" className="inline-flex items-center text-sm font-bold text-blue-600 hover:text-blue-700 mt-6 md:mt-0 font-mono uppercase tracking-wider">
                  {isAr ? 'اكتشف المزيد' : 'Explore Program'}
                  {isAr ? <ArrowLeft className="w-4 h-4 mr-2" /> : <ArrowRight className="w-4 h-4 ml-2" />}
                </Link>
             </div>
          </div>

          {/* Card 2: Vertical Span / Standard */}
          <div className="relative bg-slate-900 rounded-3xl p-8 md:p-10 border border-slate-800 overflow-hidden group">
             <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-indigo-500/10 to-transparent opacity-50" />
             
             <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center mb-8 border border-slate-700">
                    <TrendingUp className="w-6 h-6 text-indigo-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
                    {isAr ? 'الكيانات المؤسسية' : 'Corporate Assets'}
                  </h3>
                  <p className="text-slate-400 leading-relaxed font-light">
                    {isAr 
                      ? 'تأسيس شركات دولية مع دمج قانوني كامل لتسهيل مسارات تأشيرات الأعمال بفاعلية.' 
                      : 'International company formation and direct legal integration to operationalize business visa pipelines.'}
                  </p>
                </div>
             </div>
          </div>

          {/* Card 3: Standard Square */}
          <div className="relative bg-white rounded-3xl p-8 md:p-10 border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
             <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-6">
                    <Handshake className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">
                    {isAr ? 'إدارة الثروات' : 'Wealth Integration'}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed font-medium">
                    {isAr 
                      ? 'تأمين استثماراتك العقارية ودمجها ببرامج الهجرة.' 
                      : 'Securing real estate acquisitions to sovereign immigration frameworks.'}
                  </p>
                </div>
             </div>
          </div>

          {/* Card 4: Horizontal Span on MD */}
          <div className="md:col-span-2 relative bg-white rounded-3xl p-8 md:p-10 border border-slate-200/60 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-8 hover:shadow-md transition-shadow">
             <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 tracking-tight">
                    {isAr ? 'التدقيق والحماية السيادية' : 'Sovereign Case Management'}
                  </h3>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed font-medium max-w-xl">
                  {isAr 
                    ? 'مراجعة وتدقيق سيادي لكافة المستندات لضمان التوافق المطلق مع المتطلبات القانونية للدول المختارة قبل التقديم النهائي.' 
                    : 'Systematic sovereign audit of all operational documents ensuring absolute compliance with destination country legal frameworks prior to execution.'}
                </p>
             </div>
             
             <div className="hidden md:block">
                 <ShieldCheck className="w-24 h-24 text-slate-100" />
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
