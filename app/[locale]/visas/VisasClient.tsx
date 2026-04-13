'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Clock, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function VisasClient({ visas, categories, locale }: { visas: any[], categories: any[], locale: string }) {
  const t = useTranslations('Visas');
  const [activeTab, setActiveTab] = useState<string>('all');

  // Filter visas based on active tab
  const filteredVisas = activeTab === 'all' 
    ? visas 
    : visas.filter(v => v.categoryId === activeTab);

  return (
    <>
      {/* Radix/Binance style Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200 pb-4">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'all' 
              ? 'bg-[#1F2937] text-white' 
              : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
          }`}
        >
          {locale === 'ar' ? 'الكل' : 'All'}
        </button>
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveTab(category.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === category.id 
                ? 'bg-[#1F2937] text-white' 
                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            {locale === 'ar' ? category.title_ar : category.title_en}
          </button>
        ))}
      </div>

      {/* Visas Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredVisas.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="col-span-full py-12 text-center text-gray-500"
            >
              {t('no_visas')}
            </motion.div>
          ) : (
            filteredVisas.map((visa) => {
              const category = categories.find(c => c.id === visa.categoryId);
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  key={visa.id}
                >
                  <Card className="overflow-hidden flex flex-col h-full bg-white border border-gray-200 shadow-sm hover:border-[#7C3AED] hover:shadow-md transition-all duration-200 rounded-2xl group">
                    <div className="relative h-48 w-full overflow-hidden border-b border-gray-100">
                      <Image
                        src={visa.image}
                        alt={locale === 'ar' ? visa.title_ar : visa.title_en}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        referrerPolicy="no-referrer"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-md text-xs font-bold text-[#7C3AED] uppercase tracking-wide shadow-sm">
                        {locale === 'ar' ? category?.title_ar : category?.title_en}
                      </div>
                    </div>
                    <CardContent className="p-6 flex-grow">
                      <h3 className="text-xl font-bold text-[#1F2937] mb-2 group-hover:text-[#7C3AED] transition-colors">
                        {locale === 'ar' ? visa.title_ar : visa.title_en}
                      </h3>
                      <p className="text-sm text-gray-500 mb-6 line-clamp-2 leading-relaxed">
                        {locale === 'ar' ? visa.desc_short_ar : visa.desc_short_en}
                      </p>
                      <div className="flex flex-col gap-2 mt-auto">
                        <div className="flex items-center justify-between text-sm py-2 border-b border-gray-50">
                          <span className="text-gray-400 flex items-center gap-1.5"><Clock className="w-4 h-4" /> {t('duration')}</span>
                          <span className="font-semibold text-gray-700">{locale === 'ar' ? visa.duration_ar : visa.duration_en}</span>
                        </div>
                        {visa.price && (
                          <div className="flex items-center justify-between text-sm py-2">
                            <span className="text-gray-400 flex items-center gap-1.5"><DollarSign className="w-4 h-4" /> {t('price')}</span>
                            <span className="font-bold text-[#1F2937]">
                              {visa.price} {visa.currency}
                            </span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="p-6 pt-0 mt-auto">
                      <Button asChild className="w-full bg-[#1F2937] hover:bg-black h-11 text-sm rounded-xl transition-all">
                        <Link href={`/visas/${visa.slug}`}>
                          {t('view_details')}
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
