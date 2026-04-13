import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/routing';
import {Button} from '@/components/ui/button';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export async function CTASection() {
  const t = await getTranslations('Index');

  return (
    <section className="py-32 bg-[#1F2937] relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000')] opacity-20 bg-cover bg-center mix-blend-overlay" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1F2937]/90" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <ScrollReveal>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8 leading-tight">
            {t('cta_title')}
          </h2>
          <p className="text-xl md:text-2xl text-white/80 mb-12 leading-relaxed font-light max-w-2xl mx-auto">
            {t('cta_desc')}
          </p>
          <Button asChild size="lg" className="bg-white text-[#1F2937] hover:bg-gray-100 text-lg h-16 px-12 font-semibold shadow-2xl shadow-white/10 transition-all hover:scale-105 rounded-full animate-float">
            <Link href="/contact">
              {t('contact_us')}
            </Link>
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}
