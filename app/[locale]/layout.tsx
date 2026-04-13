import {NextIntlClientProvider} from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';
import {routing} from '@/i18n/routing';
import {notFound} from 'next/navigation';
import {Inter, Noto_Kufi_Arabic, Playfair_Display} from 'next/font/google';
import '../globals.css';
import {Navbar} from '@/components/layout/Navbar';
import {Footer} from '@/components/layout/Footer';
import {Toaster} from 'sonner';

const inter = Inter({subsets: ['latin'], variable: '--font-inter'});
const notoKufi = Noto_Kufi_Arabic({subsets: ['arabic'], variable: '--font-arabic', weight: ['300', '400', '500', '600', '700']});
const playfair = Playfair_Display({subsets: ['latin'], variable: '--font-playfair'});

import {Metadata} from 'next';

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  return {
    title: {
      template: locale === 'ar' ? '%s | صندوق المعارج السيادي' : "%s | Sovereign Ma'arij Fund",
      default: locale === 'ar' ? 'صندوق المعارج السيادي لحلول الـتأشيرات' : "Sovereign Ma'arij Fund | Visa Solutions",
    },
    description: locale === 'ar' ? 'نقدم خدمات تأشيرات متميزة وحلول تنقل عالمية بمعايير سيادية.' : 'Providing premium visa services and global mobility solutions with sovereign standards.',
    alternates: {
      languages: {
        'en': '/en',
        'ar': '/ar',
        'x-default': '/en',
      },
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir} className={`${inter.variable} ${notoKufi.variable} ${playfair.variable}`}>
      <body className={`bg-[#F0F2F5] text-[#1F2937] min-h-screen flex flex-col antialiased ${locale === 'ar' ? 'font-arabic' : 'font-sans'}`}>
        <NextIntlClientProvider messages={messages}>
          <Navbar locale={locale} />
          <main className="flex-grow">
            {children}
          </main>
          <Footer locale={locale} />
          <Toaster position="bottom-right" richColors />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
