'use client';

import {useTranslations} from 'next-intl';
import {Link, usePathname, useRouter} from '@/i18n/routing';
import {Button} from '@/components/ui/button';
import {Globe, Menu, X, LogOut, User} from 'lucide-react';
import Image from 'next/image';
import {useState, useEffect} from 'react';
import {motion, AnimatePresence} from 'motion/react';
import {createClient} from '@/lib/supabase/client';

export function Navbar({locale}: {locale: string}) {
  const t = useTranslations('Navigation');
  const tAuth = useTranslations('Auth');
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Listen for auth state changes
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const toggleLanguage = () => {
    const nextLocale = locale === 'ar' ? 'en' : 'ar';
    router.replace(pathname, {locale: nextLocale});
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsUserMenuOpen(false);
    router.refresh();
  };

  const navLinks = [
    {href: '/', label: t('home')},
    {href: '/visas', label: t('visas')},
    {href: '/categories', label: t('categories')},
    {href: '/about', label: t('about')},
    {href: '/contact', label: t('contact')},
  ];

  const userInitial = user?.user_metadata?.full_name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U';

  return (
    <nav className={`sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md transition-all duration-300 ${isScrolled ? 'shadow-md border-b-transparent' : 'border-b border-gray-200'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 md:w-12 md:h-12 relative flex items-center justify-center">
                <Image 
                  src="/mylogo.png" 
                  alt="Sovereign Ma'arij Fund Logo" 
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-bold text-lg md:text-xl text-[#0F172A] tracking-tighter">
                {locale === 'ar' ? 'صندوق المعارج' : "Sovereign Maareg"}
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-bold transition-all relative tracking-tight uppercase ${isActive ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -bottom-7 left-0 right-0 h-0.5 bg-blue-600"
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

            {/* Auth Buttons */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-black shadow-sm">
                    {userInitial}
                  </div>
                </button>
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full mt-2 right-0 rtl:right-auto rtl:left-0 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
                    >
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900 truncate">{user.user_metadata?.full_name || ''}</p>
                        <p className="text-xs text-gray-500 truncate" dir="ltr">{user.email}</p>
                      </div>
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 text-sm font-medium transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        {tAuth('logout')}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                 <Button asChild variant="ghost" className="text-slate-600 font-bold text-sm uppercase tracking-tight">
                  <Link href="/auth/login">{tAuth('login')}</Link>
                </Button>
                <Button asChild className="bg-blue-600 hover:bg-blue-500 text-white rounded-full px-6 py-5 text-sm font-bold shadow-lg shadow-blue-500/20 transition-all active:scale-95">
                  <Link href="/auth/signup">{tAuth('signup')}</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Right Edge (Language + Auth) */}
          <div className="md:hidden flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              className="text-[#1F2937]"
            >
              <span className="font-bold">{locale === 'ar' ? 'EN' : 'AR'}</span>
            </Button>

            {user && (
              <div className="w-8 h-8 bg-[#7C3AED] text-white rounded-full flex items-center justify-center text-sm font-bold shadow-sm">
                {userInitial}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
