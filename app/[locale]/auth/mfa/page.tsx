'use client';

import { useState, useEffect } from 'react';
import { useRouter } from '@/i18n/routing';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { motion } from 'motion/react';
import { Shield } from 'lucide-react';

export default function MFAPage({ params }: { params: Promise<{ locale: string }> }) {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [factorId, setFactorId] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();
  const t = useTranslations('Auth');
  const [locale, setLocale] = useState('en');

  useEffect(() => {
    params.then(p => setLocale(p.locale));
    
    // Check if user actually needs MFA
    supabase.auth.mfa.getAuthenticatorAssuranceLevel().then(({ data }) => {
      if (data?.currentLevel === 'aal2') {
        router.push('/'); // Already verified
      } else if (data?.currentLevel === 'aal1' && data?.nextLevel === 'aal1') {
        router.push('/'); // No MFA set up
      }
    });

    // Get the TOTP factor ID
    supabase.auth.mfa.listFactors().then(({ data }) => {
      if (data && data.totp.length > 0) {
        setFactorId(data.totp[0].id);
      }
    });
  }, [params, router, supabase.auth.mfa]);

  const isAr = locale === 'ar';

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!factorId) {
      toast.error(isAr ? 'لم يتم العثور على عامل مصادقة' : 'No authentication factor found');
      return;
    }

    setIsLoading(true);

    try {
      const challenge = await supabase.auth.mfa.challenge({ factorId });
      if (challenge.error) throw challenge.error;

      const verify = await supabase.auth.mfa.verify({
        factorId,
        challengeId: challenge.data.id,
        code,
      });

      if (verify.error) throw verify.error;

      toast.success(isAr ? 'تم التحقق بنجاح' : 'Verified successfully');
      router.refresh();
      router.push('/');
    } catch (err: any) {
      toast.error(err.message || 'Verification failed');
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
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#7C3AED]/10 mb-4">
            <Shield className="w-8 h-8 text-[#7C3AED]" />
          </div>
          <h1 className="text-3xl font-bold text-[#1F2937] mb-2">{isAr ? 'المصادقة الثنائية' : 'Two-Factor Auth'}</h1>
          <p className="text-gray-500">{isAr ? 'يرجى إدخال رمز التحقق من تطبيق المصادقة الخاص بك' : 'Please enter the verification code from your authenticator app'}</p>
        </div>

        <form onSubmit={handleVerify} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isAr ? 'رمز التحقق' : 'Verification Code'}
            </label>
            <div className="relative">
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                required
                maxLength={6}
                className="w-full text-center tracking-[0.5em] text-2xl py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent outline-none transition-all"
                placeholder="000000"
                dir="ltr"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading || code.length !== 6}
            className="w-full h-12 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-xl text-lg font-medium transition-all shadow-lg shadow-[#7C3AED]/20"
          >
            {isLoading ? (isAr ? 'جاري التحقق...' : 'Verifying...') : (isAr ? 'تأكيد' : 'Verify')}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
