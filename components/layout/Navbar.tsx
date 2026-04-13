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
              <span className="font-bold text-lg md:text-xl text-[#1F2937]">
                {locale === 'ar' ? 'صندوق المعارج السيادي' : "Sovereign Maareg Fund"}
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

            {/* Auth Buttons */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-[#7C3AED] text-white rounded-full flex items-center justify-center text-sm font-bold">
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
                <Button asChild variant="ghost" className="text-[#1F2937] font-medium">
                  <Link href="/auth/login">{tAuth('login')}</Link>
                </Button>
                <Button asChild className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-full px-6 shadow-md shadow-[#7C3AED]/20">
                  <Link href="/auth/signup">{tAuth('signup')}</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
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
              <div className="w-8 h-8 bg-[#7C3AED] text-white rounded-full flex items-center justify-center text-sm font-bold">
                {userInitial}
              </div>
            )}

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

              {/* Mobile Auth */}
              <div className="border-t border-gray-100 mt-3 pt-3 space-y-1">
                {user ? (
                  <button
                    onClick={() => { handleSignOut(); setIsMobileMenuOpen(false); }}
                    className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-red-600 hover:bg-red-50 text-base font-medium"
                  >
                    <LogOut className="w-5 h-5" />
                    {tAuth('logout')}
                  </button>
                ) : (
                  <>
                    <Link
                      href="/auth/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-3 py-3 rounded-xl text-base font-medium text-[#1F2937] hover:bg-gray-50"
                    >
                      {tAuth('login')}
                    </Link>
                    <Link
                      href="/auth/signup"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-3 py-3 rounded-xl text-base font-medium text-[#7C3AED] bg-[#7C3AED]/10"
                    >
                      {tAuth('signup')}
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
