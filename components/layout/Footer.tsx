import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/routing';
import {Globe, Mail, Phone, MapPin} from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import Image from 'next/image';

export async function Footer({locale}: {locale: string}) {
  const t = await getTranslations('Footer');
  const tNav = await getTranslations('Navigation');
  const tContact = await getTranslations('Contact');

  return (
    <footer className="bg-[#1F2937] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-12 h-12 relative flex items-center justify-center">
                  <Image 
                    src="/mylogo.png" 
                    alt="Sovereign Ma'arij Fund Logo" 
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="font-bold text-xl">
                  {locale === 'ar' ? 'صندوق المعارج السيادي' : "Sovereign Maareg Fund"}
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                {locale === 'ar' 
                  ? 'نقدم خدمات تأشيرات متميزة وحلول تنقل عالمية بمعايير سيادية.'
                  : 'Providing premium visa services and global mobility solutions with sovereign standards.'}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6">{t('quick_links')}</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                    {tNav('home')}
                  </Link>
                </li>
                <li>
                  <Link href="/visas" className="text-gray-400 hover:text-white transition-colors">
                    {tNav('visas')}
                  </Link>
                </li>
                <li>
                  <Link href="/categories" className="text-gray-400 hover:text-white transition-colors">
                    {tNav('categories')}
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                    {tNav('about')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-6">{t('contact_info')}</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-gray-400">
                  <MapPin className="w-5 h-5 text-[#A78BFA]" />
                  <span>{tContact('address_value')}</span>
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                  <Phone className="w-5 h-5 text-[#A78BFA]" />
                  <span dir="ltr">{tContact('phone')}</span>
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                  <Mail className="w-5 h-5 text-[#A78BFA]" />
                  <span>{tContact('email_label')}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} {locale === 'ar' ? 'صندوق المعارج السيادي' : "Sovereign Ma'arij Fund"}. {t('rights')}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
}
