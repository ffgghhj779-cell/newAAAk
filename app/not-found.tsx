'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#7C3AED]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-md relative z-10"
      >
        <motion.h1 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-9xl font-serif font-bold text-[#1F2937] mb-4 drop-shadow-md"
        >
          404
        </motion.h1>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h2>
        <p className="text-lg text-gray-600 mb-10 leading-relaxed font-light">
          Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
        </p>
        <Button asChild className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-full px-10 h-14 text-lg shadow-xl shadow-[#7C3AED]/20 transition-all hover:scale-105 active:scale-95 animate-float">
          <Link href="/">
            Return Home
          </Link>
        </Button>
      </motion.div>
    </div>
  );
}
