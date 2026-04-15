'use client';

import { ShieldCheck, Building2, Globe2, Users } from 'lucide-react';

export function TrustSection({locale}: {locale: string}) {
  const isAr = locale === 'ar';
  
  const stats = [
    {
      id: 1,
      icon: <Users className="w-5 h-5 text-blue-500/70" />,
      value: '10,000+',
      label: isAr ? 'مستثمر معتمد' : 'Approved Investors'
    },
    {
      id: 2,
      icon: <Globe2 className="w-5 h-5 text-blue-500/70" />,
      value: '50+',
      label: isAr ? 'دولة مدعومة' : 'Supported Jurisdictions'
    },
    {
      id: 3,
      icon: <ShieldCheck className="w-5 h-5 text-emerald-500/70" />,
      value: '99.9%',
      label: isAr ? 'نسبة نجاح الملفات' : 'Clearance Rate'
    },
    {
      id: 4,
      icon: <Building2 className="w-5 h-5 text-indigo-500/70" />,
      value: '$5B+',
      label: isAr ? 'أصول مدارة' : 'Assets Integrated'
    }
  ];

  return (
    <section className="bg-[#050B14] border-b border-white/5 py-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <p className="text-center text-xs font-mono font-bold tracking-[0.2em] text-slate-500 uppercase mb-8">
          {isAr ? 'تم التدقيق والاعتماد عبر كبرى المؤسسات السيادية' : 'Audited and verified by global sovereign institutions'}
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 divide-y md:divide-y-0 md:divide-x rtl:md:divide-x-reverse divide-slate-800/60">
          {stats.map((stat, idx) => (
            <div key={stat.id} className={`flex flex-col items-center justify-center text-center px-4 ${idx > 1 ? 'pt-6 md:pt-0' : ''}`}>
              <div className="flex items-center gap-2 mb-1">
                {stat.icon}
                <span className="text-3xl font-bold text-white tracking-tighter">{stat.value}</span>
              </div>
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
