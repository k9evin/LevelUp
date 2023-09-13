'use client';
import Hero from '@/components/Hero';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="overflow-hidden bg-gradient-to-t from-purple-200 to-slate-50">
      <motion.div
        className="scroll-bar-hide overflow-y-hidden no-scrollbar"
        initial={{ opacity: 0, y: '100%' }}
        animate={{ opacity: 1, y: '0%' }}
        exit={{ opacity: 0, y: '100%' }}
        transition={{
          opacity: { duration: 0.15 },
          y: { type: 'spring', stiffness: 100, damping: 15 },
        }}
      >
        <Hero />
      </motion.div>
    </div>
  );
}
