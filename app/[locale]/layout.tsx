import {NextIntlClientProvider} from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';
import {routing} from '@/i18n/routing';
import {notFound} from 'next/navigation';
import {Inter, Noto_Kufi_Arabic, Playfair_Display} from 'next/font/google';
import '../globals.css';
import {Navbar} from '@/components/layout/Navbar';
import {Footer} from '@/components/layout/Footer';
import {MobileTabBar} from '@/components/layout/MobileTabBar';
import {Toaster} from 'sonner';
import {getOrganizationSchema, getFinancialServiceSchema, getWebSiteSchema} from '@/lib/schema';

const inter = Inter({subsets: ['latin'], variable: '--font-inter'});
const notoKufi = Noto_Kufi_Arabic({subsets: ['arabic'], variable: '--font-arabic', weight: ['300', '400', '500', '600', '700']});
const playfair = Playfair_Display({subsets: ['latin'], variable: '--font-playfair'});

import {Metadata} from 'next';

const SITE_URL = 'https://www.almaarijsovereignwealthfund.com';

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const isAr = locale === 'ar';

  return {
    // Core Meta
    title: {
      template: isAr ? '%s | صندوق المعارج السيادي' : "%s | Sovereign Maareg Fund",
      default: isAr 
        ? 'صندوق المعارج السيادي | حلول التأشيرات والتنقل العالمي للمستثمرين'
        : "Sovereign Maareg Fund | Premium Visa & Global Mobility for Investors",
    },
    description: isAr
      ? 'صندوق المعارج السيادي - مؤسسة رائدة متخصصة في خدمات التأشيرات السيادية، إقامة المستثمرين، تأسيس الشركات الدولية، وحلول التنقل العالمي لكبار المستثمرين ورجال الأعمال. نسبة نجاح تتجاوز 99.9%.'
      : 'Sovereign Maareg Fund - A premier institution specializing in sovereign visa services, investor residency, international company formation, and global mobility solutions for high-net-worth investors. 99.9%+ success rate.',
    
    // Metadata Base URL
    metadataBase: new URL(SITE_URL),

    // Canonical & Language Alternates
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        'en': `${SITE_URL}/en`,
        'ar': `${SITE_URL}/ar`,
        'x-default': `${SITE_URL}/en`,
      },
    },

    // Keywords
    keywords: isAr
      ? ['صندوق المعارج', 'تأشيرات استثمارية', 'إقامة المستثمرين', 'جنسية عن طريق الاستثمار', 'تأشيرة ذهبية', 'تنقل عالمي', 'تأسيس شركات دولية', 'إدارة ثروات']
      : ['Sovereign Maareg Fund', 'investor visa', 'citizenship by investment', 'golden visa', 'global mobility', 'corporate establishment', 'wealth management', 'residency by investment', 'premium visa services'],

    // OpenGraph - For social media sharing (Facebook, LinkedIn, WhatsApp)
    openGraph: {
      type: 'website',
      locale: locale === 'ar' ? 'ar_EG' : 'en_US',
      alternateLocale: locale === 'ar' ? 'en_US' : 'ar_EG',
      url: `${SITE_URL}/${locale}`,
      siteName: isAr ? 'صندوق المعارج السيادي' : 'Sovereign Maareg Fund',
      title: isAr 
        ? 'صندوق المعارج السيادي | حلول التأشيرات والتنقل العالمي'
        : 'Sovereign Maareg Fund | Premium Visa & Global Mobility',
      description: isAr
        ? 'حلول تأشيرات سيادية وتنقل عالمي لكبار المستثمرين ورجال الأعمال. نسبة نجاح تتجاوز 99.9%.'
        : 'Sovereign visa solutions and global mobility for high-net-worth investors. 99.9%+ success rate.',
      images: [
        {
          url: `${SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: isAr ? 'صندوق المعارج السيادي' : 'Sovereign Maareg Fund',
          type: 'image/png',
        },
      ],
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: isAr 
        ? 'صندوق المعارج السيادي'
        : 'Sovereign Maareg Fund',
      description: isAr
        ? 'حلول تأشيرات سيادية وتنقل عالمي لكبار المستثمرين.'
        : 'Sovereign visa solutions and global mobility for investors.',
      images: [`${SITE_URL}/og-image.png`],
    },

    // Robots Directive
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },

    // Search Engine Verification
    verification: {
      google: 'mLKZtJlxOUu3QypCr5CD6SbWP_PScnNl2x9W24QEqIM',
    },

    // App Info
    applicationName: isAr ? 'صندوق المعارج السيادي' : 'Sovereign Maareg Fund',
    category: 'finance',
    creator: 'Sovereign Maareg Fund',
    publisher: 'Sovereign Maareg Fund',
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

  // Generate structured data schemas
  const organizationSchema = getOrganizationSchema(locale);
  const financialServiceSchema = getFinancialServiceSchema(locale);
  const webSiteSchema = getWebSiteSchema(locale);

  return (
    <html lang={locale} dir={dir} className={`${inter.variable} ${notoKufi.variable} ${playfair.variable}`}>
      <head>
        {/* JSON-LD Structured Data for AI & Search Engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(financialServiceSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
      </head>
      <body className={`bg-purple-50 text-[#1F2937] min-h-screen flex flex-col antialiased ${locale === 'ar' ? 'font-arabic' : 'font-sans'}`}>
        <NextIntlClientProvider messages={messages}>
          <div className="max-w-[1440px] mx-auto min-h-screen bg-[#F0F2F5] shadow-2xl overflow-hidden flex flex-col relative w-full">
            <Navbar locale={locale} />
            <main className="flex-grow flex flex-col pb-16 md:pb-0">
              {children}
            </main>
            <Footer locale={locale} />
          </div>
          <MobileTabBar locale={locale} />
          <Toaster position="bottom-right" richColors />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
