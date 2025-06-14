
'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function TvCategoryTile({ genre, isActive, onSelectGenre }) {
  return (
    <motion.div
      onClick={() => onSelectGenre(genre)}
      className={cn(
        "px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-lg cursor-pointer transition-all duration-300 ease-in-out",
        "bg-card/50 backdrop-blur-md border",
        isActive 
          ? "border-primary shadow-[0_0_15px_2px_hsl(var(--primary)/0.4)] text-primary scale-105" 
          : "border-border/30 hover:border-primary/70 hover:shadow-[0_0_10px_1px_hsl(var(--primary)/0.2)] text-muted-foreground hover:text-foreground"
      )}
      whileHover={{ scale: isActive ? 1.05 : 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      layout 
    >
      <span className="text-xs sm:text-sm md:text-base font-medium">{genre}</span>
    </motion.div>
  );
}

