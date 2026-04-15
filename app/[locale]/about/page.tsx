import {setRequestLocale} from 'next-intl/server';
import {useTranslations} from 'next-intl';
import Image from 'next/image';
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
    title: isAr ? 'من نحن | صندوق المعارج السيادي' : 'About Us | Sovereign Maareg Fund',
    description: isAr
      ? 'تعرف على صندوق المعارج السيادي، مؤسسة رائدة في خدمات التأشيرات والتنقل العالمي. شبكة شراكات عالمية مع السفارات والقنصليات.'
      : 'Learn about Sovereign Maareg Fund, a premier institution in visa services and global mobility. A global network of partnerships with embassies and consulates.',
    alternates: {
      canonical: `${SITE_URL}/${locale}/about`,
      languages: {
        'en': `${SITE_URL}/en/about`,
        'ar': `${SITE_URL}/ar/about`,
        'x-default': `${SITE_URL}/en/about`,
      },
    },
    openGraph: {
      title: isAr ? 'من نحن - صندوق المعارج السيادي' : 'About Us - Sovereign Maareg Fund',
      description: isAr
        ? 'مؤسسة رائدة في خدمات التأشيرات وحلول التنقل العالمي بمعايير سيادية.'
        : 'A premier institution in visa services and global mobility solutions with sovereign standards.',
      url: `${SITE_URL}/${locale}/about`,
    },
  };
}
export default async function AboutPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  
  // In a real app we'd use getTranslations
  const isAr = locale === 'ar';

  return (
    <div className="py-16 bg-[#FAF9F6] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-[#1F2937] mb-4">
            {isAr ? 'من نحن' : 'About Us'}
          </h1>
          <div className="w-20 h-1 bg-[#7C3AED] mx-auto rounded-full" />
        </div>

        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-xl">
              <Image
                src="https://picsum.photos/seed/building/1200/800"
                alt="Corporate Building"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                referrerPolicy="no-referrer"
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-[#1F2937] mb-6">
                {isAr ? 'صندوق المعارج السيادي' : "Sovereign Ma'arij Fund"}
              </h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  {isAr 
                    ? 'نحن مؤسسة رائدة متخصصة في تقديم خدمات التأشيرات وحلول التنقل العالمي بمعايير سيادية. نهدف إلى تسهيل حركة الأفراد والأعمال عبر الحدود بكفاءة وموثوقية عالية.'
                    : 'We are a premier institution specializing in visa services and global mobility solutions with sovereign standards. We aim to facilitate the movement of individuals and businesses across borders with high efficiency and reliability.'}
                </p>
                <p>
                  {isAr
                    ? 'منذ تأسيسنا، بنينا شبكة واسعة من الشراكات الاستراتيجية مع السفارات والقنصليات والجهات الحكومية حول العالم، مما يمكننا من تقديم خدمات حصرية وسريعة لعملائنا.'
                    : 'Since our inception, we have built a vast network of strategic partnerships with embassies, consulates, and government entities worldwide, enabling us to provide exclusive and fast services to our clients.'}
                </p>
                <p>
                  {isAr
                    ? 'فريقنا يتكون من خبراء متخصصين في قوانين الهجرة والتأشيرات، ملتزمون بتقديم استشارات دقيقة ومخصصة تلبي احتياجات كل عميل بدقة وسرية تامة.'
                    : 'Our team consists of experts specializing in immigration and visa laws, committed to providing accurate and personalized consultations that meet the needs of each client with precision and complete confidentiality.'}
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
