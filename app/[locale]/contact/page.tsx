import {setRequestLocale} from 'next-intl/server';
import {Button} from '@/components/ui/button';
import {Mail, Phone, MapPin} from 'lucide-react';
import { ContactForm } from '@/components/form/ContactForm';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Metadata } from 'next';

const SITE_URL = 'https://www.almaarijsovereignwealthfund.com';

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const isAr = locale === 'ar';

  return {
    title: isAr ? 'اتصل بنا | صندوق المعارج السيادي' : 'Contact Us | Sovereign Maareg Fund',
    description: isAr
      ? 'تواصل مع خبراء صندوق المعارج السيادي للاستشارات والاستفسارات حول خدمات التأشيرات والتنقل العالمي.'
      : 'Get in touch with Sovereign Maareg Fund experts for consultations and inquiries about visa services and global mobility.',
    alternates: {
      canonical: `${SITE_URL}/${locale}/contact`,
      languages: {
        'en': `${SITE_URL}/en/contact`,
        'ar': `${SITE_URL}/ar/contact`,
        'x-default': `${SITE_URL}/en/contact`,
      },
    },
    openGraph: {
      title: isAr ? 'اتصل بنا - صندوق المعارج السيادي' : 'Contact Us - Sovereign Maareg Fund',
      description: isAr
        ? 'تواصل مع فريقنا للاستشارات حول التأشيرات والتنقل العالمي.'
        : 'Contact our team for visa and global mobility consultations.',
      url: `${SITE_URL}/${locale}/contact`,
    },
  };
}
export default async function ContactPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  
  const isAr = locale === 'ar';

  return (
    <div className="py-16 bg-[#FAF9F6] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-[#1F2937] mb-4">
            {isAr ? 'اتصل بنا' : 'Contact Us'}
          </h1>
          <div className="w-20 h-1 bg-[#7C3AED] mx-auto rounded-full" />
        </div>

        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <h2 className="text-2xl font-bold text-[#1F2937] mb-6">
                {isAr ? 'أرسل لنا رسالة' : 'Send us a message'}
              </h2>
              <ContactForm isAr={isAr} />
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-[#1F2937] mb-6">
                  {isAr ? 'معلومات التواصل' : 'Contact Information'}
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  {isAr 
                    ? 'فريقنا متاح للرد على استفساراتكم وتقديم الاستشارات اللازمة. لا تتردد في التواصل معنا عبر أي من القنوات التالية.'
                    : 'Our team is available to answer your inquiries and provide necessary consultations. Do not hesitate to contact us through any of the following channels.'}
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#7C3AED]/10 rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-[#7C3AED]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1F2937] text-lg mb-1">
                      {isAr ? 'العنوان' : 'Address'}
                    </h3>
                    <p className="text-gray-600">
                      {isAr ? 'مدينة نصر' : 'Nasr City'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#7C3AED]/10 rounded-full flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-[#7C3AED]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1F2937] text-lg mb-1">
                      {isAr ? 'الهاتف' : 'Phone'}
                    </h3>
                    <p className="text-gray-600" dir="ltr">
                      +201009086283
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#7C3AED]/10 rounded-full flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-[#7C3AED]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1F2937] text-lg mb-1">
                      {isAr ? 'البريد الإلكتروني' : 'Email'}
                    </h3>
                    <p className="text-gray-600">
                      abdallahnooh7@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
