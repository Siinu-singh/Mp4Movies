
'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function SectionHeader({ title, viewAllLink, className }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn("flex items-center justify-between mb-4 md:mb-6", className)}>
      <h2 className={cn(
        "text-2xl md:text-3xl font-bold font-headline",
        "bg-gradient-to-r from-[#d53369] to-[#daae51] bg-clip-text text-transparent"
      )}>
        {title}
      </h2>
      {viewAllLink && (
        <Link href={viewAllLink} className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors group">
          View All
          <ChevronRight size={18} className="ml-1 group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </motion.div>
  );
}
