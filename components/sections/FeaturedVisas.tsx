import { Link } from '@/i18n/routing';
import { Visa } from '@/lib/api';
import { ArrowRight, ArrowLeft, ShieldCheck, MapPin } from 'lucide-react';
import Image from 'next/image';

export function FeaturedVisas({locale, visas}: {locale: string, visas: Visa[]}) {
  const isAr = locale === 'ar';
  
  // Show only top 3 featured visas
  const featured = visas.slice(0, 3);

  if (featured.length === 0) return null;

  return (
    <section className="bg-[#FAF9F6] py-16 md:py-24 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tighter">
              {isAr ? 'المسارات السيادية ' : 'Sovereign Frameworks'}
            </h2>
            <p className="text-lg text-gray-500 font-light leading-relaxed">
              {isAr 
                ? 'أبرز البرامج المصممة حصرياً لمحفظتك الاستثمارية والتي نضمن لك فيها أعلى معايير الجودة التنفيذية.' 
                : 'Top-tier deployment programs engineered for elite capital, strictly audited for maximum global mobility yield.'}
            </p>
          </div>
          <Link 
            href="/visas" 
            className="inline-flex items-center h-12 px-6 rounded-full bg-white border border-gray-200 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors shadow-sm whitespace-nowrap"
          >
            {isAr ? 'تصفح الدليل الكامل' : 'Access Full Pipeline'}
            {isAr ? <ArrowLeft className="w-4 h-4 mr-2" /> : <ArrowRight className="w-4 h-4 ml-2" />}
          </Link>
        </div>

        {/* Bento Grid layout for top 3 visas */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 md:gap-6 min-h-[600px]">
          {featured.map((visa, idx) => {
            // First item gets massive focus
            const isFeatured = idx === 0;
            
            return (
              <Link 
                key={visa.id} 
                href={`/visas/${visa.slug}`}
                className={`group relative bg-white border-none rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col ${
                  isFeatured ? 'md:col-span-2 md:row-span-2 shadow-sm' : 'md:col-span-1 md:row-span-1 shadow-sm'
                }`}
              >
                {/* Background Image Image Area */}
                <div className={`relative w-full ${isFeatured ? 'flex-grow min-h-[300px]' : 'h-48'} overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent z-10" />
                  <Image
                    src={visa.image}
                    alt={isAr ? visa.title_ar : visa.title_en}
                    fill
                    sizes={isFeatured ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                  />
                  
                  {/* Floating Action / Metric */}
                  <div className="absolute top-6 left-6 z-20 flex gap-2">
                    <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-mono px-3 py-1.5 rounded-full flex items-center gap-1.5 uppercase tracking-widest">
                       <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                       {isAr ? 'مسار سيادي' : 'Verified Route'}
                    </span>
                  </div>
                </div>

                {/* Content Area Floating Inside/Below Image */}
                <div className={`absolute bottom-0 left-0 right-0 z-20 p-6 md:p-8 ${isFeatured ? 'text-white' : 'text-white'}`}>
                  <div className="flex items-center gap-2 mb-3 text-white/80 text-sm font-mono tracking-widest uppercase">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                    <span>{isAr ? 'نطاق الاختصاص' : 'Jurisdiction'}</span>
                  </div>
                  
                  <h3 className={`font-bold tracking-tight mb-2 ${isFeatured ? 'text-3xl md:text-4xl' : 'text-2xl'}`}>
                    {isAr ? visa.title_ar : visa.title_en}
                  </h3>
                  
                  {isFeatured && (
                    <p className="text-white/80 font-light leading-relaxed max-w-xl mb-6 line-clamp-2">
                      {isAr ? visa.desc_short_ar : visa.desc_short_en}
                    </p>
                  )}
                  
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20 mt-4 backdrop-blur-sm">
                    <div>
                      <span className="block text-[10px] text-white/60 uppercase tracking-widest mb-1">{isAr ? 'المدة' : 'Clearance Time'}</span>
                      <span className="block font-medium text-sm">{isAr ? visa.duration_ar : visa.duration_en}</span>
                    </div>
                    {visa.price && (
                      <div>
                        <span className="block text-[10px] text-white/60 uppercase tracking-widest mb-1">{isAr ? 'رأس المال' : 'Capital Req'}</span>
                        <span className="block font-medium text-sm text-emerald-400">{visa.price} {visa.currency}</span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
