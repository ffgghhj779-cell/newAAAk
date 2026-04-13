'use client';

import {useTranslations} from 'next-intl';
import { ShieldCheck, Building2, Globe2, Users } from 'lucide-react';

export function TrustSection({locale}: {locale: string}) {
  const isAr = locale === 'ar';
  
  const stats = [
    {
      id: 1,
      icon: <Users className="w-5 h-5 text-gray-400" />,
      value: '10,000+',
      label: isAr ? 'مستثمر معتمد' : 'Approved Investors'
    },
    {
      id: 2,
      icon: <Globe2 className="w-5 h-5 text-gray-400" />,
      value: '50+',
      label: isAr ? 'دولة مدعومة' : 'Supported Countries'
    },
    {
      id: 3,
      icon: <ShieldCheck className="w-5 h-5 text-gray-400" />,
      value: '99.9%',
      label: isAr ? 'نسبة نجاح الملفات' : 'Process Success Rate'
    },
    {
      id: 4,
      icon: <Building2 className="w-5 h-5 text-gray-400" />,
      value: '$5B+',
      label: isAr ? 'أصول مدارة' : 'Assets Managed'
    }
  ];

  return (
    <section className="bg-white border-b border-gray-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold tracking-widest text-gray-400 uppercase mb-6">
          {isAr ? 'موثوق من قبل كبرى المؤسسات والأفراد' : 'Trusted by leading institutions & individuals worldwide'}
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-x rtl:divide-x-reverse divide-gray-100">
          {stats.map((stat) => (
            <div key={stat.id} className="flex flex-col items-center justify-center text-center px-4">
              <div className="flex items-center gap-2 mb-1">
                {stat.icon}
                <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
              </div>
              <span className="text-sm text-gray-500 font-medium">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
