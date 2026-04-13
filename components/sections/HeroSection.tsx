'use client';

import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import {motion} from 'motion/react';
import {Globe2, Map, FileText, Send, User, Shield} from 'lucide-react';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export function HeroSection({locale}: {locale: string}) {
  const t = useTranslations('Index');
  const isAr = locale === 'ar';

  const actionCards = [
    {
      title: isAr ? 'استكشف التأشيرات' : 'Explore Visas',
      desc: isAr ? 'تصفح جميع التأشيرات المتاحة لجميع الوجهات العالمية' : 'Browse all available visas for global destinations.',
      icon: <Globe2 className="w-8 h-8 text-[#7C3AED]" />,
      href: '/visas',
      bgColor: 'bg-[#7C3AED]/10'
    },
    {
      title: isAr ? 'تصفح الفئات' : 'Browse Categories',
      desc: isAr ? 'ابحث عن التأشيرة المناسبة لغرض سفرك (سياحة، عمل، الخ)' : 'Find the right visa for your travel purpose (Tourism, Business, etc).',
      icon: <Map className="w-8 h-8 text-blue-500" />,
      href: '/categories',
      bgColor: 'bg-blue-500/10'
    },
    {
      title: isAr ? 'ابدأ طلبك' : 'Start Application',
      desc: isAr ? 'قدم أوراقك الآن وسيتواصل معك خبراؤنا فوراً' : 'Submit your documents now and our experts will contact you.',
      icon: <FileText className="w-8 h-8 text-emerald-500" />,
      href: '/contact',
      bgColor: 'bg-emerald-500/10'
    },
    {
      title: isAr ? 'تواصل مع الدعم' : 'Contact Support',
      desc: isAr ? 'هل لديك أسئلة؟ فريق الدعم متاح للرد على استفساراتك' : 'Have questions? Our support team is available to help.',
      icon: <Send className="w-8 h-8 text-amber-500" />,
      href: '/contact',
      bgColor: 'bg-amber-500/10'
    }
  ];

  return (
    <section className="pt-12 pb-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dashboard Welcome Header */}
        <div className="mb-10">
          <motion.div initial="hidden" animate="visible" variants={itemVariants}>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#1F2937] mb-2">{t('hero_title')}</h1>
            <p className="text-gray-500 text-lg max-w-2xl">{t('hero_subtitle')}</p>
          </motion.div>
        </div>

        {/* Quick Actions Grid (WE Style) */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {actionCards.map((card, idx) => (
            <Link key={idx} href={card.href} className="block group">
              <motion.div 
                variants={itemVariants}
                className="bg-white border border-gray-200 rounded-2xl p-6 h-full shadow-sm hover:border-[#7C3AED] hover:shadow-md transition-all duration-200"
              >
                <div className={`w-14 h-14 ${card.bgColor} rounded-xl flex items-center justify-center mb-5`}>
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold text-[#1F2937] mb-2">{card.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{card.desc}</p>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* Dashboard Summary Metrics (Binance Style) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8"
        >
          <div className="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x sm:rtl:divide-x-reverse divide-gray-100">
            <div className="flex-1 py-4 sm:py-0 sm:px-6 first:pt-0 first:sm:pl-0 last:pb-0 last:sm:pr-0">
              <div className="flex items-center gap-2 mb-2">
                <User className="w-5 h-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-500">{t('happy_clients')}</span>
              </div>
              <div className="text-3xl font-bold text-[#1F2937]"><AnimatedCounter value={500} />+</div>
            </div>
            
            <div className="flex-1 py-4 sm:py-0 sm:px-6 first:pt-0 first:sm:pl-0 last:pb-0 last:sm:pr-0">
              <div className="flex items-center gap-2 mb-2">
                <Globe2 className="w-5 h-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-500">{t('global_destinations')}</span>
              </div>
              <div className="text-3xl font-bold text-[#1F2937]"><AnimatedCounter value={50} />+</div>
            </div>

            <div className="flex-1 py-4 sm:py-0 sm:px-6 first:pt-0 first:sm:pl-0 last:pb-0 last:sm:pr-0">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-500">{t('success_rate')}</span>
              </div>
              <div className="text-3xl font-bold text-[#1F2937]"><AnimatedCounter value={99} />%</div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
