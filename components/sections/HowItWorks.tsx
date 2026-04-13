import { ClipboardEdit, Search, CheckCircle } from 'lucide-react';

export function HowItWorks({locale}: {locale: string}) {
  const isAr = locale === 'ar';

  const steps = [
    {
      step: '01',
      icon: <ClipboardEdit className="w-8 h-8 text-purple-600" />,
      title: isAr ? 'تقديم الطلب المبدئي' : 'Initial Submission',
      desc: isAr ? 'قم بإنشاء ملفك الاستثماري ورفع المستندات الأولية المطلوبة عبر منصتنا الآمنة.' : 'Create your investment profile and upload preliminary documents through our secure portal.'
    },
    {
      step: '02',
      icon: <Search className="w-8 h-8 text-purple-600" />,
      title: isAr ? 'المراجعة السيادية' : 'Sovereign Audit',
      desc: isAr ? 'يقوم خبراؤنا بالتدقيق القانوني والمالي الشامل للتأكد من موافقة المعايير الدولية.' : 'Our experts conduct a comprehensive legal and financial audit to ensure international compliance.'
    },
    {
      step: '03',
      icon: <CheckCircle className="w-8 h-8 text-purple-600" />,
      title: isAr ? 'الموافقة والإصدار' : 'Approval & Issuance',
      desc: isAr ? 'تلقي الموافقة النهائية واستلام التأشيرة أو وثائق الإقامة الخاصة بك رسمياً.' : 'Receive final approval and officially obtain your visa or residency documentation.'
    }
  ];

  return (
    <section className="bg-white py-20 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">
            {isAr ? 'منهجية العمل' : 'How It Works'}
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            {isAr ? 'ثلاث خطوات منهجية تفصلك عن تأمين استثمارك وانتقالك العالمي.' : 'Three systematic steps separating you from securing your global mobility.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-[45px] left-[15%] right-[15%] h-0.5 bg-gray-100 z-0" />
          
          {steps.map((step, idx) => (
            <div key={idx} className="relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-white border-8 border-[#F0F2F5] rounded-full flex items-center justify-center mb-6 shadow-sm">
                {step.icon}
              </div>
              <div className="bg-purple-100 text-purple-800 text-xs font-bold px-3 py-1 rounded-full mb-4">
                {isAr ? 'الخطوة' : 'STEP'} {step.step}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-500 text-sm max-w-[280px]">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
