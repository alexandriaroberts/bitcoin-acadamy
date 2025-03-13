'use client';
import { motion } from 'framer-motion';

export function BitcoinLogo2D() {
  return (
    <motion.div
      className='w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center'
      animate={{ rotate: 360 }}
      transition={{
        duration: 10,
        repeat: Number.POSITIVE_INFINITY,
        ease: 'linear',
      }}
    >
      <span className='text-white text-4xl font-bold'>₿</span>
    </motion.div>
  );
}
