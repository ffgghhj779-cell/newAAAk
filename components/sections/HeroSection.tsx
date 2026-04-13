'use client';

import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import {motion} from 'motion/react';
import {ArrowRight, ArrowLeft, ShieldCheck, FileText, Globe2} from 'lucide-react';
import Image from 'next/image';

export function HeroSection({locale}: {locale: string}) {
  const t = useTranslations('Index');
  const isAr = locale === 'ar';

  return (
    <section className="relative overflow-hidden bg-white border-b border-gray-200">
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.015] mix-blend-multiply pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-purple-50 to-transparent opacity-60 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20 lg:pt-28 lg:pb-28 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-purple-100 text-purple-800 font-semibold text-xs tracking-wider uppercase mb-6">
              <ShieldCheck className="w-4 h-4" />
              <span>{isAr ? 'منصة التأشيرات الحكومية والاستثمارية' : 'Government & Investment Visa Platform'}</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] mb-6 tracking-tight">
              {isAr ? 'بوابتك السيادية نحو ' : 'Your Sovereign Gateway to '}
              <span className="text-purple-700">{isAr ? 'العالم' : 'The World'}</span>
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-xl">
              {isAr 
                ? 'استمتع بخدمات تأشيرات استثنائية مصممة خصيصاً للمستثمرين وكبار الشخصيات ورجال الأعمال، مع معايير سيادية من الموثوقية والسرعة.' 
                : 'Experience exceptional visa services tailored for investors, VIPs, and business professionals, with sovereign standards of reliability and speed.'}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/visas" 
                className="inline-flex justify-center items-center h-14 px-8 rounded-xl bg-purple-700 text-white font-medium hover:bg-purple-800 transition-colors shadow-sm"
              >
                {isAr ? 'ابدأ طلبك الآن' : 'Start Your Application'}
                {isAr ? <ArrowLeft className="mr-2 w-5 h-5" /> : <ArrowRight className="ml-2 w-5 h-5" />}
              </Link>
              <Link 
                href="/categories" 
                className="inline-flex justify-center items-center h-14 px-8 rounded-xl bg-white border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors shadow-sm"
              >
                {isAr ? 'تصفح البرامج' : 'Explore Programs'}
              </Link>
            </div>
          </motion.div>

          {/* Right Visual Structure - High-End SaaS Dashboard Mockup */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative rounded-2xl bg-white shadow-2xl shadow-indigo-100/50 border border-gray-200 overflow-hidden">
              <div className="h-12 bg-gray-50 border-b border-gray-200 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="p-6 grid gap-4 bg-gray-50/50 h-[400px]">
                {/* Mocked structure representing a clean dashboard */}
                <div className="flex justify-between items-end mb-2">
                   <div className="h-4 w-32 bg-gray-200 rounded" />
                   <div className="h-8 w-24 bg-purple-100 rounded" />
                </div>
                <div className="h-32 bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex gap-4">
                   <div className="w-16 h-16 bg-purple-50 rounded-lg flex items-center justify-center">
                     <Globe2 className="w-8 h-8 text-purple-600" />
                   </div>
                   <div className="flex flex-col gap-2 flex-grow justify-center">
                     <div className="h-3 w-1/2 bg-gray-200 rounded" />
                     <div className="h-2 w-1/3 bg-gray-100 rounded" />
                   </div>
                </div>
                <div className="h-32 bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex gap-4">
                   <div className="w-16 h-16 bg-blue-50 rounded-lg flex items-center justify-center">
                     <FileText className="w-8 h-8 text-blue-600" />
                   </div>
                   <div className="flex flex-col gap-2 flex-grow justify-center">
                     <div className="h-3 w-2/3 bg-gray-200 rounded" />
                     <div className="h-2 w-1/2 bg-gray-100 rounded" />
                   </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
