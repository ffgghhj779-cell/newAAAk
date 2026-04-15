'use client';

import { Home, FileText, Grid3X3, Mail, User } from 'lucide-react';
import { Link, usePathname } from '@/i18n/routing';

export function MobileTabBar({ locale }: { locale: string }) {
  const pathname = usePathname();
  const isAr = locale === 'ar';

  const tabs = [
    { href: '/' as const, icon: Home, label: isAr ? 'الرئيسية' : 'Home' },
    { href: '/visas' as const, icon: FileText, label: isAr ? 'التأشيرات' : 'Visas' },
    { href: '/categories' as const, icon: Grid3X3, label: isAr ? 'البرامج' : 'Programs' },
    { href: '/contact' as const, icon: Mail, label: isAr ? 'تواصل' : 'Contact' },
    { href: '/about' as const, icon: User, label: isAr ? 'عنّا' : 'About' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#050B14]/95 backdrop-blur-xl border-t border-slate-800/60 safe-area-bottom">
      <div className="flex items-center justify-around h-16 px-2">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href || (tab.href !== '/' && pathname.startsWith(tab.href));
          const Icon = tab.icon;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-colors relative ${
                isActive ? 'text-blue-400' : 'text-slate-500'
              }`}
            >
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-blue-400 rounded-full" />
              )}
              <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 1.5} />
              <span className="text-[10px] font-medium tracking-tight">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
