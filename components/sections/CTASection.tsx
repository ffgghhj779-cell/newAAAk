'use client';

import { Link } from '@/i18n/routing';
import { ArrowRight, ArrowLeft, Mail } from 'lucide-react';

export function CTASection({locale}: {locale: string}) {
  const isAr = locale === 'ar';

  return (
    <section className="bg-purple-900 py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-multiply pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-purple-800 to-transparent opacity-80 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
          {isAr ? 'جاهز لتأمين مستقبلك العالمي؟' : 'Ready to secure your global future?'}
        </h2>
        <p className="text-xl text-purple-200 mb-10 max-w-2xl mx-auto">
          {isAr 
            ? 'تواصل مع مستشارينا لبدء رحلتك الاستثمارية عبر حلول الهجرة والتأشيرات السيادية.' 
            : 'Connect with our elite advisors to begin your investment journey through sovereign mobility solutions.'}
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link 
            href="/contact" 
            className="w-full sm:w-auto inline-flex justify-center items-center h-14 px-10 rounded-xl bg-white text-purple-900 font-bold hover:bg-gray-50 transition-colors shadow-lg shadow-black/10"
          >
            {isAr ? 'تواصل معنا الآن' : 'Contact Us Now'}
            {isAr ? <ArrowLeft className="mr-2 w-5 h-5" /> : <ArrowRight className="ml-2 w-5 h-5" />}
          </Link>
          <Link 
            href="mailto:abdallahnooh7@gmail.com" 
            className="w-full sm:w-auto inline-flex justify-center items-center h-14 px-10 rounded-xl bg-transparent border border-purple-700 text-white font-medium hover:bg-purple-800 transition-colors"
          >
            <Mail className={isAr ? "ml-2 w-5 h-5" : "mr-2 w-5 h-5"} />
            abdallahnooh7@gmail.com
          </Link>
        </div>
      </div>
    </section>
  );
}
