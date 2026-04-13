'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, Loader2, CheckCircle2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

type LeadFormModalProps = {
  visaId: string;
  visaTitle: string;
  locale: string;
  isOpen: boolean;
  onClose: () => void;
};

export default function LeadFormModal({ visaId, visaTitle, locale, isOpen, onClose }: LeadFormModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const supabase = createClient();

  const isAr = locale === 'ar';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Spam protection: if honeypot is filled, silently succeed
    if (honeypot) {
      setIsSuccess(true);
      return;
    }

    setIsSubmitting(true);

    try {
      const { error: insertError } = await supabase.from('leads').insert([
        {
          name,
          email,
          phone,
          visa_id: visaId,
          message,
          status: 'new'
        }
      ]);

      if (insertError) throw insertError;

      setIsSuccess(true);
    } catch (err: any) {
      toast.error(err.message || (isAr ? 'حدث خطأ. يرجى المحاولة مرة أخرى.' : 'An error occurred. Please try again.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden relative animate-in fade-in zoom-in duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 rtl:left-4 rtl:right-auto p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="p-10 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {isAr ? 'تم استلام طلبك بنجاح!' : 'Request Received Successfully!'}
            </h2>
            <p className="text-gray-600 mb-8">
              {isAr 
                ? 'سيتواصل معك أحد خبرائنا قريباً لمناقشة تفاصيل تأشيرتك.' 
                : 'One of our experts will contact you shortly to discuss your visa details.'}
            </p>
            <Button onClick={onClose} className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white h-12 rounded-xl text-lg">
              {isAr ? 'إغلاق' : 'Close'}
            </Button>
          </div>
        ) : (
          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {isAr ? 'طلب تأشيرة' : 'Apply for Visa'}
              </h2>
              <p className="text-gray-600">
                {isAr ? 'أنت تقدم على:' : 'You are applying for:'} <span className="font-semibold text-[#7C3AED]">{visaTitle}</span>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Honeypot field - hidden from real users */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input 
                  type="text" 
                  id="website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {isAr ? 'الاسم الكامل' : 'Full Name'} <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  required 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent outline-none transition-all"
                  placeholder={isAr ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {isAr ? 'البريد الإلكتروني' : 'Email Address'} <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="email" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    dir="ltr"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent outline-none transition-all text-left"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {isAr ? 'رقم الهاتف' : 'Phone Number'} <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="tel" 
                    required 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    dir="ltr"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent outline-none transition-all text-left"
                    placeholder="+1 234 567 8900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {isAr ? 'رسالة إضافية (اختياري)' : 'Additional Message (Optional)'}
                </label>
                <textarea 
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent outline-none transition-all resize-none"
                  placeholder={isAr ? 'أي تفاصيل إضافية تود مشاركتها...' : 'Any additional details you want to share...'}
                />
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full h-14 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-xl text-lg font-medium transition-all mt-4"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
                {isSubmitting 
                  ? (isAr ? 'جاري الإرسال...' : 'Submitting...') 
                  : (isAr ? 'تأكيد الطلب' : 'Submit Application')}
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
