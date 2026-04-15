'use client';

import { Link } from '@/i18n/routing';
import { ArrowRight, ArrowLeft, Mail, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export function CTASection({locale}: {locale: string}) {
  const isAr = locale === 'ar';

  return (
    <section className="bg-[#050B14] py-20 md:py-32 relative overflow-hidden border-t border-slate-900">
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-screen pointer-events-none" />
      
      {/* Heavy Electric Accents */}
      <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-gradient-to-l from-blue-600/10 via-slate-900/10 to-transparent blur-3xl pointer-events-none transform translate-x-1/4 rounded-full" />
      <div className="absolute bottom-0 left-0 w-full lg:w-1/3 h-full bg-gradient-to-tr from-indigo-600/10 to-transparent blur-3xl pointer-events-none rounded-full" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Verification Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/50 border border-slate-800 text-blue-400 font-mono text-[10px] tracking-[0.2em] uppercase mb-8 shadow-2xl">
           <ShieldCheck className="w-4 h-4" />
           {isAr ? 'بدء العملية السيادية' : 'Initialize Sovereign Protocol'}
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-8 tracking-tighter leading-[1.1]">
          {isAr ? 'جاهز لتأمين ' : 'Ready to Secure '}
          <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
            {isAr ? 'مستقبلك العالمي؟' : 'Your Global Future?'}
          </span>
        </h2>
        
        <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
          {isAr 
            ? 'تواصل مع مستشارينا لبدء رحلتك الاستثمارية عبر حلول الهجرة والتأشيرات السيادية الأكثر أماناً في العالم.' 
            : 'Initialize communication with our elite advisory tier to begin your capital deployment across the world’s most secure sovereign mobility frameworks.'}
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
            <Link 
              href="/contact" 
              className="w-full sm:w-auto inline-flex justify-center items-center h-16 px-12 rounded-full bg-blue-600 text-white font-bold transition-all shadow-[0_4px_14px_0_rgba(59,130,246,0.39)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.23)] hover:bg-blue-500"
            >
              {isAr ? 'بدء المراحل الأولية' : 'Initiate Secure Contact'}
              {isAr ? <ArrowLeft className="mr-3 w-5 h-5" /> : <ArrowRight className="ml-3 w-5 h-5" />}
            </Link>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
            <Link 
              href="mailto:abdallahnooh7@gmail.com" 
              className="w-full sm:w-auto inline-flex justify-center items-center h-16 px-10 rounded-full bg-[#0A1628] border border-slate-800 text-slate-300 font-medium hover:bg-slate-800 hover:text-white transition-colors"
            >
              <Mail className={isAr ? "ml-3 w-5 h-5 text-blue-400" : "mr-3 w-5 h-5 text-blue-400"} />
              <span className="font-mono text-xs md:text-sm tracking-tight">abdallahnooh7@gmail.com</span>
            </Link>
          </motion.div>
        </div>

        {/* Technical Footer Text */}
        <div className="mt-20 opacity-20 pointer-events-none">
           <p className="font-mono text-[10px] text-slate-500 tracking-[0.3em] uppercase">
              Encrypted Terminal // SMF Protocol v4.0.1 // Node: Riyadh-Global
           </p>
        </div>
      </div>
    </section>
  );
}
