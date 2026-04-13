'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export function ContactForm({ isAr }: { isAr: boolean }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    // Honeypot field
    organization: ''
  });

  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Honeypot check
    if (formData.organization) {
      toast.success(isAr ? 'تم إرسال رسالتك بنجاح' : 'Message sent successfully');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from('leads').insert([{
        name: formData.name,
        email: formData.email,
        message: formData.message,
        visa_id: null,
        status: 'new'
      }]);

      if (error) throw error;

      toast.success(isAr ? 'تم إرسال رسالتك بنجاح' : 'Message sent successfully');
      setFormData({ name: '', email: '', message: '', organization: '' });
    } catch (err: any) {
      toast.error(isAr ? 'حدث خطأ أثناء الإرسال' : 'Error sending message');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot field (hidden from users, visible to bots) */}
      <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
        <label>Organization (Do not fill this out if you are human)</label>
        <input
          type="text"
          value={formData.organization}
          onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {isAr ? 'الاسم الكامل' : 'Full Name'}
        </label>
        <input 
          required
          type="text" 
          value={formData.name}
          onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent outline-none transition-all"
          placeholder={isAr ? 'أدخل اسمك' : 'Enter your name'}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {isAr ? 'البريد الإلكتروني' : 'Email Address'}
        </label>
        <input 
          required
          type="email" 
          value={formData.email}
          onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent outline-none transition-all"
          placeholder={isAr ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {isAr ? 'الرسالة' : 'Message'}
        </label>
        <textarea 
          required
          rows={5}
          value={formData.message}
          onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent outline-none transition-all resize-none"
          placeholder={isAr ? 'كيف يمكننا مساعدتك؟' : 'How can we help you?'}
        ></textarea>
      </div>
      <Button disabled={loading} type="submit" className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] h-14 text-lg">
        {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (isAr ? 'إرسال الرسالة' : 'Send Message')}
      </Button>
    </form>
  );
}
