
'use client';

import TvShowCard from './TvShowCard';
import { motion, AnimatePresence } from 'framer-motion';

const gridVariants = {
  initial: { opacity: 1 }, // Changed from hidden: { opacity: 0 }
  animate: { // Renamed from show and ensured opacity is 1
    opacity: 1,
    transition: {
      staggerChildren: 0.1, 
    },
  },
};

export default function TvShowGrid({ tvShows }) {
  if (!tvShows || tvShows.length === 0) {
    return <p className="text-center text-muted-foreground py-10 text-lg">No TV shows match your criteria.</p>;
  }

  return (
    <motion.div
      key={tvShows.map(s => s.id).join('-')} 
      variants={gridVariants}
      initial="initial" // Changed from hidden
      animate="animate" // Changed from show
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-6 gap-2 sm:gap-x-3 sm:gap-y-4 md:gap-x-4 md:gap-y-6"
    >
      <AnimatePresence>
        {tvShows.map((tvShow, index) => (
          <TvShowCard key={tvShow.id} tvShow={tvShow} index={index} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
