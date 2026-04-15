'use client';

import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import {motion} from 'motion/react';
import {ArrowRight, ArrowLeft, ShieldCheck, Activity, Globe, Zap} from 'lucide-react';

export function HeroSection({locale}: {locale: string}) {
  const t = useTranslations('Index');
  const isAr = locale === 'ar';

  return (
    <section className="relative overflow-hidden bg-[#050B14] border-b border-gray-900">
      {/* Dark Mode Mesh Gradient Background */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-screen pointer-events-none" />
      
      {/* Electric Accents */}
      <div className="absolute top-0 right-0 w-full md:w-1/2 h-[500px] bg-gradient-to-l from-indigo-900/20 via-purple-900/10 to-transparent blur-3xl pointer-events-none transform translate-x-1/4 -translate-y-1/4 rounded-full" />
      <div className="absolute bottom-0 left-0 w-full md:w-1/3 h-[400px] bg-gradient-to-tr from-emerald-900/20 to-transparent blur-3xl pointer-events-none transform -translate-x-1/4 translate-y-1/4 rounded-full" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 lg:pt-36 lg:pb-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0A1628] border border-blue-900/50 text-blue-400 font-semibold text-xs tracking-widest uppercase mb-8 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
              <span className="relative flex h-2 w-2 mr-1 ml-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span>{isAr ? 'الأنظمة تعمل بكفاءة' : 'System Operational'}</span>
            </div>
            
            {/* High Contrast Typography */}
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 tracking-tighter">
              {isAr ? 'بوابتك السيادية نحو ' : 'Your Sovereign Gateway to '}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                {isAr ? 'الاقتصاد العالمي' : 'The Global Market'}
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-400 mb-10 leading-relaxed max-w-xl font-light">
              {isAr 
                ? 'استمتع بخدمات تأشيرات استثنائية مصممة خصيصاً للمستثمرين وكبار الشخصيات ورجال الأعمال، مع معايير سيادية من الموثوقية والسرعة المطلقة.' 
                : 'Experience exceptional visa services engineered for high-net-worth investors and executives, wielding sovereign standards of reliability and absolute speed.'}
            </p>
            
            {/* Magnetic Buttons & Spring Physics */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                <Link 
                  href="/visas" 
                  className="w-full sm:w-auto inline-flex justify-center items-center h-14 px-8 rounded-full bg-blue-600 text-white font-medium transition-all shadow-[0_4px_14px_0_rgba(59,130,246,0.39)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.23)] hover:bg-blue-500"
                >
                  {isAr ? 'بدء تقديم الطلب' : 'Initialize Application'}
                  {isAr ? <ArrowLeft className="mr-2 w-5 h-5" /> : <ArrowRight className="ml-2 w-5 h-5" />}
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                <Link 
                  href="/categories" 
                  className="w-full sm:w-auto inline-flex justify-center items-center h-14 px-8 rounded-full bg-[#0A1628] border border-slate-800 text-slate-300 font-medium hover:bg-slate-800 hover:text-white transition-colors"
                >
                  {isAr ? 'استكشاف الأصول' : 'Explore Frameworks'}
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Visual Structure - High-End Fintech "Bento" Terminal */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="relative hidden lg:block"
          >
            {/* Glassmorphic Panel */}
            <div className="relative rounded-3xl bg-[#0B1221]/80 backdrop-blur-xl border border-slate-800/60 shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none" />
              
              <div className="h-12 border-b border-slate-800/60 flex items-center px-4 justify-between bg-[#050B14]/50">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="text-xs text-slate-500 font-mono flex items-center gap-2">
                  <ShieldCheck className="w-3 h-3" /> ENCRYPTED CONNECTION
                </div>
              </div>

              <div className="p-6 grid grid-cols-2 gap-4 h-[420px]">
                
                {/* Main Data Render Block */}
                <div className="col-span-2 bg-[#0A1628] rounded-2xl border border-slate-800/80 p-5 flex flex-col justify-between relative overflow-hidden group">
                   <div className="flex justify-between items-start z-10 relative">
                     <div>
                       <p className="text-slate-500 text-xs font-mono mb-1 tracking-wider uppercase">Live Processing</p>
                       <p className="text-2xl font-bold text-white tracking-tight">Active Matrix</p>
                     </div>
                     <div className="bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded text-xs font-mono border border-emerald-500/20 flex items-center gap-1">
                       <Zap className="w-3 h-3" /> 14ms
                     </div>
                   </div>
                   
                   {/* Simulated Data Ticker */}
                   <div className="z-10 relative mt-8 space-y-3 font-mono text-sm">
                      <div className="flex justify-between border-b border-slate-800 pb-2">
                        <span className="text-slate-400">Node_Routing</span>
                        <span className="text-blue-400">OPTIMIZED</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-800 pb-2">
                        <span className="text-slate-400">Clearance_Rate</span>
                        <span className="text-white">99.998%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Sys_Capacity</span>
                        <span className="text-emerald-400">NOMINAL</span>
                      </div>
                   </div>
                   
                   {/* Background Glow */}
                   <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-600/20 blur-3xl rounded-full group-hover:bg-blue-600/30 transition-colors duration-700" />
                </div>

                {/* Smaller Bento Blocks */}
                <div className="bg-[#0A1628] rounded-2xl border border-slate-800/80 p-5 flex flex-col items-center justify-center text-center">
                   <Globe className="w-8 h-8 text-indigo-400 mb-3" />
                   <p className="text-white font-bold tracking-tight">50+ Jurisdictions</p>
                   <p className="text-xs text-slate-500 mt-1">Global Coverage</p>
                </div>
                
                <div className="bg-[#0A1628] rounded-2xl border border-slate-800/80 p-5 flex flex-col items-center justify-center text-center">
                   <Activity className="w-8 h-8 text-emerald-400 mb-3" />
                   <p className="text-white font-bold tracking-tight">$5B+ Capital</p>
                   <p className="text-xs text-slate-500 mt-1">AUM Integrated</p>
                </div>

              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
