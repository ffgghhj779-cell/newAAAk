import { ClipboardEdit, Search, CheckCircle, Activity, Lock, ArrowRight } from 'lucide-react';

export function HowItWorks({locale}: {locale: string}) {
  const isAr = locale === 'ar';

  return (
    <section className="bg-slate-900 py-16 md:py-24 border-b border-slate-800 relative overflow-hidden">
      {/* Decorative background grid */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-screen pointer-events-none" />
      <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-gradient-to-l from-indigo-900/10 via-slate-900/10 to-transparent blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6 border-b border-slate-800/60 pb-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tighter">
              {isAr ? 'بروتوكول التنفيذ' : 'Execution Protocol'}
            </h2>
            <p className="text-slate-400 font-light text-lg">
              {isAr 
                ? 'ثلاث مراحل سيادية مشفرة تفصلك عن تأمين استثمارك وانتقالك العالمي.' 
                : 'A strict three-phase sovereign pipeline engineered to secure your global mobility assets.'}
            </p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-full px-4 py-2 flex items-center gap-2 text-xs font-mono text-emerald-400">
            <Lock className="w-3.5 h-3.5" />
            {isAr ? 'نظام مشفر ومحمي' : 'END-TO-END ENCRYPTED'}
          </div>
        </div>

        {/* Bento/Pipeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          
          {/* Step 1 */}
          <div className="bg-[#0A1628] rounded-3xl p-8 border border-slate-800/80 hover:border-blue-500/30 transition-colors group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-colors" />
            <div className="text-6xl font-black text-slate-800/50 absolute -right-4 -bottom-4 tracking-tighter pointer-events-none">01</div>
            
            <div className="flex items-center justify-between mb-8 relative z-10">
              <div className="w-14 h-14 bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700 shadow-inner">
                <ClipboardEdit className="w-6 h-6 text-blue-400" />
              </div>
              <Activity className="w-5 h-5 text-slate-600" />
            </div>
            
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{isAr ? 'التهيئة المبدئية' : 'Initial Initialization'}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {isAr 
                  ? 'قم بإنشاء وتشفير ملفك الاستثماري ورفع المستندات الأولية عبر بروتوكولنا الآمن.' 
                  : 'Create your encrypted investment profile and upload preliminary data payloads through our secure terminal.'}
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-[#0A1628] rounded-3xl p-8 border border-slate-800/80 hover:border-indigo-500/30 transition-colors group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-colors" />
            <div className="text-6xl font-black text-slate-800/50 absolute -right-4 -bottom-4 tracking-tighter pointer-events-none">02</div>
            
            <div className="flex items-center justify-between mb-8 relative z-10">
              <div className="w-14 h-14 bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700 shadow-inner">
                <Search className="w-6 h-6 text-indigo-400" />
              </div>
              <ArrowRight className="w-5 h-5 text-slate-600 hidden md:block" />
            </div>
            
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{isAr ? 'التدقيق السيادي' : 'Sovereign Audit'}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {isAr 
                  ? 'يقوم خبراؤنا بالتدقيق القانوني والمالي الشامل لضمان التوافق مع المعايير الدولية.' 
                  : 'Our analysts run a comprehensive legal and financial audit to guarantee cross-border compliance.'}
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-[#0A1628] rounded-3xl p-8 border border-slate-800/80 hover:border-emerald-500/30 transition-colors group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-colors" />
            <div className="text-6xl font-black text-slate-800/50 absolute -right-4 -bottom-4 tracking-tighter pointer-events-none">03</div>
            
            <div className="flex items-center justify-between mb-8 relative z-10">
              <div className="w-14 h-14 bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700 shadow-inner">
                <CheckCircle className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="py-1 px-2 bg-emerald-500/10 text-emerald-400 text-[10px] uppercase tracking-widest rounded border border-emerald-500/20">
                {isAr ? 'الاعتماد' : 'Issued'}
              </div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{isAr ? 'الموافقة والإصدار' : 'Approval & Issuance'}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {isAr 
                  ? 'تلقي الموافقة النهائية واستلام التأشيرة أو وثائق الإقامة الخاصة بك رسمياً.' 
                  : 'Receive definitive pipeline approval and officially secure your visa or residency documentation.'}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
