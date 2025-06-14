
'use client';

import { motion } from 'framer-motion';

export default function TvGradientHeading({ text }) {
  return (
    <motion.h1
      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center py-6 sm:py-8 md:py-12 bg-gradient-to-r from-[#d53369] to-[#daae51] bg-clip-text text-transparent"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "circOut" }}
    >
      {text}
    </motion.h1>
  );
}

