'use client';

import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import {Button} from '@/components/ui/button';
import {ArrowRight, ArrowLeft, ShieldCheck, Globe2, Users} from 'lucide-react';
import Image from 'next/image';
import {motion} from 'motion/react';
import {AnimatedCounter} from '@/components/ui/AnimatedCounter';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

export function HeroSection({locale}: {locale: string}) {
  const t = useTranslations('Index');

  return (
    <section className="relative overflow-hidden bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 lg:pt-32 lg:pb-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="z-10"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7C3AED]/10 text-[#7C3AED] font-medium text-sm mb-6 border border-[#7C3AED]/20 animate-pulse-glow">
              <ShieldCheck className="w-4 h-4" />
              <span>{locale === 'ar' ? 'شريكك الموثوق للتأشيرات' : 'Your Trusted Visa Partner'}</span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-5xl lg:text-7xl font-serif font-bold text-[#1F2937] leading-tight mb-6">
              {t('hero_title')}
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl font-light">
              {t('hero_subtitle')}
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button asChild size="lg" className="bg-[#7C3AED] hover:bg-[#6D28D9] text-lg h-14 px-8 shadow-lg shadow-[#7C3AED]/20 transition-all hover:shadow-[#7C3AED]/40 hover:-translate-y-0.5">
                <Link href="/visas">
                  {t('explore_visas')}
                  {locale === 'ar' ? <ArrowLeft className="ml-2 w-5 h-5" /> : <ArrowRight className="ml-2 w-5 h-5" />}
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg h-14 px-8 border-2 border-gray-200 hover:border-[#7C3AED] hover:bg-transparent transition-all hover:-translate-y-0.5 bg-white">
                <Link href="/about">
                  {t('learn_more')}
                </Link>
              </Button>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-8 border-t border-gray-200/60">
              <div>
                <div className="text-3xl font-bold text-[#1F2937] mb-1"><AnimatedCounter value={500} />+</div>
                <div className="text-sm text-gray-500 font-medium flex items-center gap-1.5"><Users className="w-4 h-4 text-[#7C3AED]" /> {locale === 'ar' ? 'عميل سعيد' : 'Happy Clients'}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#1F2937] mb-1"><AnimatedCounter value={50} />+</div>
                <div className="text-sm text-gray-500 font-medium flex items-center gap-1.5"><Globe2 className="w-4 h-4 text-[#7C3AED]" /> {locale === 'ar' ? 'وجهة عالمية' : 'Global Destinations'}</div>
              </div>
              <div className="hidden sm:block">
                <div className="text-3xl font-bold text-[#1F2937] mb-1"><AnimatedCounter value={99} />%</div>
                <div className="text-sm text-gray-500 font-medium flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-[#7C3AED]" /> {locale === 'ar' ? 'نسبة النجاح' : 'Success Rate'}</div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className="relative z-10 lg:h-[600px] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/10 animate-float"
          >
            <Image
              src="https://picsum.photos/seed/travel/1200/800"
              alt="Global Travel"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              referrerPolicy="no-referrer"
              className="object-cover hover:scale-105 transition-transform duration-700"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1F2937]/60 via-transparent to-transparent" />
          </motion.div>
        </div>
      </div>
      
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] bg-gradient-to-br from-[#7C3AED]/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] bg-gradient-to-tr from-[#A78BFA]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}
