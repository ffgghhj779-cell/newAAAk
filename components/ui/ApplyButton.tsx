'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import dynamic from 'next/dynamic';

const LeadFormModal = dynamic(() => import('@/components/ui/LeadFormModal'), {
  ssr: false,
});

export default function ApplyButton({ visaId, visaTitle, locale, text }: { visaId: string, visaTitle: string, locale: string, text: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button 
        onClick={() => setIsModalOpen(true)}
        className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] h-16 text-lg rounded-2xl shadow-lg shadow-[#7C3AED]/20 transition-all hover:shadow-[#7C3AED]/40 hover:-translate-y-0.5"
      >
        {text}
      </Button>
      
      <LeadFormModal 
        visaId={visaId}
        visaTitle={visaTitle}
        locale={locale}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
