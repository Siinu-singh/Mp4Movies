
'use client';

import Link from 'next/link';
import { Clapperboard } from 'lucide-react'; // Changed from Film to Clapperboard
import { motion } from 'framer-motion';

export default function SidebarLogo({ isExpanded }) {
  return (
    <Link href="/" className="flex items-center justify-center h-16 shrink-0">
      <motion.div
        className="flex items-center text-primary overflow-hidden" // Icon inherits text-primary
        initial={false}
        animate={{ paddingLeft: isExpanded ? '0.5rem' : '0rem', paddingRight: isExpanded ? '0.5rem' : '0rem' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <Clapperboard size={isExpanded ? 28 : 24} className="transition-all shrink-0" />
        <motion.span
          className="ml-2 text-xl font-bold font-headline whitespace-nowrap"
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: isExpanded ? 1 : 0, width: isExpanded ? 'auto' : 0 }}
          transition={{ duration: 0.2, delay: isExpanded ? 0.1 : 0 }}
        >
          <span className="bg-gradient-to-r from-primary via-orange-400 to-red-500 bg-clip-text text-transparent">
            Mp4movies
          </span>
        </motion.span>
      </motion.div>
    </Link>
  );
}
