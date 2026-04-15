import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/routing';
import {Globe, Mail, Phone, MapPin, ShieldCheck} from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import Image from 'next/image';

export async function Footer({locale}: {locale: string}) {
  const t = await getTranslations('Footer');
  const tNav = await getTranslations('Navigation');
  const tContact = await getTranslations('Contact');
  const isAr = locale === 'ar';

  return (
    <footer className="bg-[#050B14] text-white pt-20 pb-12 border-t border-slate-900 overflow-hidden relative">
      {/* Subtle Data Pattern */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-screen pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-24 mb-20">
            
            {/* Brand Column (Wider) */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 relative flex items-center justify-center">
                  <Image 
                    src="/mylogo.png" 
                    alt="Sovereign Ma'arij Fund Logo" 
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-lg tracking-tight">
                    {isAr ? 'صندوق المعارج' : "Sovereign Maareg"}
                  </span>
                  <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-blue-500 font-bold">
                    {isAr ? 'صندوق سيادي' : "Sovereign Fund"}
                  </span>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed font-light mb-8 max-w-xs">
                {isAr 
                  ? 'منظومة عالمية متكاملة لخدمات التنقل السيادي وإدارة الأصول الاستثمارية بمعايير عالمية.'
                  : 'A comprehensive global ecosystem for sovereign mobility and asset management built for the executive elite.'}
              </p>
              
              {/* Compliance Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                 <ShieldCheck className="w-3 h-3 text-emerald-500" />
                 {isAr ? 'نظام مشفر ومؤمن' : 'Encrypted & Secure'}
              </div>
            </div>

            {/* Platform Links */}
            <div>
              <h3 className="text-xs font-mono font-bold tracking-[0.2em] text-white uppercase mb-8">{isAr ? 'المنصة' : 'Platform'}</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="/" className="text-sm text-slate-400 hover:text-blue-400 transition-colors">
                    {tNav('home')}
                  </Link>
                </li>
                <li>
                  <Link href="/visas" className="text-sm text-slate-400 hover:text-blue-400 transition-colors">
                    {tNav('visas')}
                  </Link>
                </li>
                <li>
                  <Link href="/categories" className="text-sm text-slate-400 hover:text-blue-400 transition-colors">
                    {tNav('categories')}
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-sm text-slate-400 hover:text-blue-400 transition-colors">
                    {tNav('about')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Intelligence Links */}
            <div>
              <h3 className="text-xs font-mono font-bold tracking-[0.2em] text-white uppercase mb-8">{isAr ? 'الموارد' : 'Intelligence'}</h3>
              <ul className="space-y-4">
                <li>
                   <Link href="/contact" className="text-sm text-slate-400 hover:text-blue-400 transition-colors">
                      {isAr ? 'مركز الدعم' : 'Support Terminal'}
                   </Link>
                </li>
                <li>
                   <Link href="/auth/login" className="text-sm text-slate-400 hover:text-blue-400 transition-colors">
                      {isAr ? 'بوابة المستثمر' : 'Investor Portal'}
                   </Link>
                </li>
                <li>
                   <span className="text-sm text-slate-600 cursor-not-allowed">
                      {isAr ? 'التقرير السنوي' : 'Annual Report (Locked)'}
                   </span>
                </li>
              </ul>
            </div>

            {/* Connectivity */}
            <div>
              <h3 className="text-xs font-mono font-bold tracking-[0.2em] text-white uppercase mb-8">{isAr ? 'الاتصال' : 'Connectivity'}</h3>
              <ul className="space-y-5">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                  <span className="text-sm text-slate-400 font-light">{tContact('address_value')}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-blue-500 shrink-0" />
                  <span dir="ltr" className="text-sm text-slate-400 font-mono tracking-tight hover:text-white transition-colors cursor-pointer">{tContact('phone')}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                  <span className="text-sm text-slate-400 font-light hover:text-white transition-colors cursor-pointer">abdallahnooh7@gmail.com</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Infrastructure Bar */}
          <div className="border-t border-slate-900 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col gap-1 text-center md:text-left">
               <p className="text-slate-500 text-[10px] font-mono tracking-widest uppercase">
                  © {new Date().getFullYear()} {isAr ? 'صندوق المعارج' : "Sovereign Maareg"}. {t('rights')}
               </p>
               <p className="text-[9px] text-slate-700 font-mono uppercase tracking-[0.3em] md:mt-2">
                  System: Riyadh-Live // SMF Core v1.2.0 // Node Active
               </p>
            </div>
            
            <div className="flex gap-8">
               <span className="text-[10px] text-slate-600 font-mono tracking-widest uppercase hover:text-slate-400 cursor-pointer">Legal Protocol</span>
               <span className="text-[10px] text-slate-600 font-mono tracking-widest uppercase hover:text-slate-400 cursor-pointer">Security Policy</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
}
