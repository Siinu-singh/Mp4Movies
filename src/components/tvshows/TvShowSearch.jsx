
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const containerVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "circOut", staggerChildren: 0.1 }
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "circOut" } },
};

export default function TvShowSearch({ onSearchChange, searchTerm }) {
  const [isFocused, setIsFocused] = useState(false);

  const [internalSearchTerm, setInternalSearchTerm] = useState('');
  const currentSearchTerm = searchTerm !== undefined ? searchTerm : internalSearchTerm;
  const handleInputChange = (e) => {
    if (onSearchChange) {
      onSearchChange(e.target.value);
    } else {
      setInternalSearchTerm(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for actual search submission logic
    console.log("Search submitted:", currentSearchTerm);
  };

  return (
    <motion.div
      className="py-6 sm:py-8 md:py-12 px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2
        variants={itemVariants}
        className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-center mb-4 sm:mb-6 md:mb-8 bg-gradient-to-r from-[#d53369] to-[#daae51] bg-clip-text text-transparent"
      >
        Find Your Favorite TV Shows
      </motion.h2>

      <motion.div 
        variants={itemVariants}
        className="max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto relative"
      >
        <motion.div
          className="absolute inset-0 rounded-full p-px z-0" 
          initial={{ opacity: 0 }}
          animate={{ opacity: isFocused ? 1 : 0 }}
          transition={{ duration: 0.3, ease: 'circOut' }}
          aria-hidden="true"
        >
          <div className="w-full h-full rounded-full bg-gradient-to-r from-[#d53369] to-[#daae51]" />
        </motion.div>

        <form
          onSubmit={handleSubmit}
          className="relative z-10 flex items-center gap-0 sm:gap-1 rounded-full bg-card shadow-lg backdrop-blur-sm overflow-hidden m-px"
        >
          <div className="relative flex-grow h-full">
            <Input
              type="text"
              placeholder="Search TV Shows..."
              value={currentSearchTerm}
              onChange={handleInputChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className={cn(
                "w-full h-10 sm:h-12 md:h-14 lg:h-16 pl-4 sm:pl-6 pr-3 sm:pr-4 text-sm sm:text-base md:text-lg lg:text-xl text-foreground placeholder:text-muted-foreground/60",
                "bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-l-full"
              )}
              aria-label="Search TV Shows"
            />
          </div>
          <div className="p-1 sm:p-1.5 flex items-center"> 
            <Button
              type="submit"
              size="icon"
              className={cn(
                "w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 rounded-full text-primary-foreground shadow-md transition-all duration-300 ease-in-out",
                "bg-gradient-to-r from-primary via-orange-500 to-orange-600 hover:shadow-primary/40 hover:shadow-lg hover:brightness-110 active:scale-95"
              )}
              aria-label="Search"
            >
              <Search size={20} />
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

