'use client';

import { Link } from '@/i18n/routing';
import { ArrowRight, ArrowLeft, Mail } from 'lucide-react';
import { motion } from 'motion/react';

export function CTASection({locale}: {locale: string}) {
  const isAr = locale === 'ar';

  return (
    <section className="bg-[#050B14] py-16 md:py-24 relative overflow-hidden border-t border-slate-900">
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-screen pointer-events-none" />
      
      {/* Electric Accents */}
      <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-gradient-to-l from-blue-900/10 via-slate-900/10 to-transparent blur-3xl pointer-events-none transform translate-x-1/4 rounded-full" />
      <div className="absolute bottom-0 left-0 w-full lg:w-1/3 h-full bg-gradient-to-tr from-indigo-900/10 to-transparent blur-3xl pointer-events-none rounded-full" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tighter leading-tight">
          {isAr ? 'جاهز لتأمين مستقبلك العالمي؟' : 'Ready to secure your global future?'}
        </h2>
        <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto font-light">
          {isAr 
            ? 'تواصل مع مستشارينا لبدء رحلتك الاستثمارية عبر حلول الهجرة والتأشيرات السيادية.' 
            : 'Initialize contact with our elite advisory tier to begin your capital deployment across sovereign mobility frameworks.'}
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
            <Link 
              href="/contact" 
              className="w-full sm:w-auto inline-flex justify-center items-center h-14 px-10 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-500 transition-all shadow-[0_4px_14px_0_rgba(59,130,246,0.39)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.23)]"
            >
              {isAr ? 'بدء المراحل الأولية' : 'Initiate Secure Contact'}
              {isAr ? <ArrowLeft className="mr-2 w-5 h-5" /> : <ArrowRight className="ml-2 w-5 h-5" />}
            </Link>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
            <Link 
              href="mailto:abdallahnooh7@gmail.com" 
              className="w-full sm:w-auto inline-flex justify-center items-center h-14 px-10 rounded-full bg-[#0A1628] border border-slate-800 text-slate-300 font-medium hover:bg-slate-800 hover:text-white transition-colors"
            >
              <Mail className={isAr ? "ml-2 w-5 h-5 text-blue-400" : "mr-2 w-5 h-5 text-blue-400"} />
              <span className="font-mono text-sm tracking-tight">abdallahnooh7@gmail.com</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
