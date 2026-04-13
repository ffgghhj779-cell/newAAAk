'use client';

import { useState } from 'react';
import { Link } from '@/i18n/routing';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { motion } from 'motion/react';
import { Mail, ArrowLeft, ArrowRight } from 'lucide-react';

export default function ResetPasswordPage({ params }: { params: Promise<{ locale: string }> }) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const supabase = createClient();
  const t = useTranslations('Auth');
  const [locale, setLocale] = useState('en');

  useState(() => {
    params.then(p => setLocale(p.locale));
  });

  const isAr = locale === 'ar';

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/${locale}/auth/update-password`,
      });
      if (error) throw error;
      setIsSent(true);
      toast.success(t('reset_sent'));
    } catch (err: any) {
      toast.error(err.message || 'Failed to send reset link');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6] px-4 py-16 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#7C3AED]/8 to-transparent rounded-full blur-3xl pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-gray-100 relative z-10"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#1F2937] mb-2">{t('reset_password')}</h1>
          <p className="text-gray-500">{t('reset_subtitle')}</p>
        </div>

        {isSent ? (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Mail className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-gray-600">{t('reset_sent')}</p>
            <Link href="/auth/login" className="inline-flex items-center gap-2 text-[#7C3AED] hover:underline font-semibold">
              {isAr ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
              {t('back_to_login')}
            </Link>
          </div>
        ) : (
          <>
            <form onSubmit={handleReset} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('email')}
                </label>
                <div className="relative">
                  <Mail className="absolute top-1/2 -translate-y-1/2 left-3 rtl:left-auto rtl:right-3 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-11 rtl:pl-4 rtl:pr-11 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent outline-none transition-all"
                    placeholder={t('email_placeholder')}
                    dir="ltr"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-xl text-lg font-medium transition-all shadow-lg shadow-[#7C3AED]/20"
              >
                {isLoading ? t('sending_link') : t('send_reset_link')}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <Link href="/auth/login" className="inline-flex items-center gap-2 text-[#7C3AED] hover:underline font-semibold text-sm">
                {isAr ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
                {t('back_to_login')}
              </Link>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
