
'use client';

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
    },
  },
};

const tileVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
  hover: { scale: 1.1, transition: { type: 'spring', stiffness: 400, damping: 15 } },
  tap: { scale: 0.95 }
};

function CategoryTile({ category, isActive, onSelectCategory }) {
  return (
    <motion.div
      onClick={() => onSelectCategory(category)}
      className={cn(
        "px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 lg:px-6 lg:py-3 rounded-lg cursor-pointer transition-all duration-300 ease-in-out text-[0.7rem] sm:text-xs md:text-sm lg:text-base font-medium",
        "bg-card/60 backdrop-blur-md border",
        isActive 
          ? "border-primary shadow-[0_0_15px_2px_hsl(var(--primary)/0.4)] text-primary scale-105" 
          : "border-border/40 hover:border-primary/70 hover:shadow-[0_0_10px_1px_hsl(var(--primary)/0.2)] text-muted-foreground hover:text-foreground"
      )}
      variants={tileVariants}
      whileHover="hover"
      whileTap="tap"
      layout 
    >
      {category}
    </motion.div>
  );
}


export default function LiveTvCategoryFilter({ categories, selectedCategory, onSelectCategory }) {
  if (!categories || categories.length === 0) {
    return null;
  }

  const allChannelsOption = "All Channels";

  return (
    <div className="mb-6 sm:mb-8 md:mb-12 px-4">
      <h3 className={cn(
        "text-base sm:text-lg md:text-xl lg:text-2xl font-semibold mb-2 sm:mb-3 md:mb-4",
        "bg-gradient-to-r from-[#d53369] to-[#daae51] bg-clip-text text-transparent"
        )}>
        Browse by Category
      </h3>
      <ScrollArea className="w-full whitespace-nowrap pb-3">
        <motion.div 
          className="flex space-x-1.5 sm:space-x-2 md:space-x-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <CategoryTile
            category={allChannelsOption}
            isActive={selectedCategory === null || selectedCategory === allChannelsOption}
            onSelectCategory={() => onSelectCategory(null)} 
          />
          {categories.map((category) => (
            <CategoryTile
              key={category}
              category={category}
              isActive={selectedCategory === category}
              onSelectCategory={onSelectCategory}
            />
          ))}
        </motion.div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}

