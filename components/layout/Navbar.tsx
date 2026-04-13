'use client';

import {useTranslations} from 'next-intl';
import {Link, usePathname, useRouter} from '@/i18n/routing';
import {Button} from '@/components/ui/button';
import {Globe, Menu, X} from 'lucide-react';
import {useState, useEffect} from 'react';
import {motion, AnimatePresence} from 'motion/react';

export function Navbar({locale}: {locale: string}) {
  const t = useTranslations('Navigation');
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    const nextLocale = locale === 'ar' ? 'en' : 'ar';
    router.replace(pathname, {locale: nextLocale});
  };

  const navLinks = [
    {href: '/', label: t('home')},
    {href: '/visas', label: t('visas')},
    {href: '/categories', label: t('categories')},
    {href: '/about', label: t('about')},
    {href: '/contact', label: t('contact')},
  ];

  return (
    <nav className={`sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md transition-all duration-300 ${isScrolled ? 'shadow-md border-b-transparent' : 'border-b border-gray-200'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#7C3AED] rounded-lg flex items-center justify-center">
                <Globe className="text-white w-6 h-6" />
              </div>
              <span className="font-bold text-xl text-[#1F2937]">
                {locale === 'ar' ? 'صندوق المعارج السيادي' : "Sovereign Ma'arij Fund"}
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-medium transition-colors relative ${isActive ? 'text-[#7C3AED]' : 'text-[#1F2937] hover:text-[#7C3AED]'}`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -bottom-7 left-0 right-0 h-0.5 bg-[#7C3AED]"
                    />
                  )}
                </Link>
              );
            })}
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              className="text-[#1F2937]"
              aria-label="Toggle language"
            >
              <span className="font-bold">{locale === 'ar' ? 'EN' : 'AR'}</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              className="text-[#1F2937] mr-2 rtl:ml-2 rtl:mr-0"
            >
              <span className="font-bold">{locale === 'ar' ? 'EN' : 'AR'}</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#1F2937]"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b overflow-hidden"
          >
            <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-3 py-3 rounded-xl text-base font-medium transition-colors ${isActive ? 'text-[#7C3AED] bg-[#7C3AED]/10' : 'text-[#1F2937] hover:text-[#7C3AED] hover:bg-gray-50'}`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
