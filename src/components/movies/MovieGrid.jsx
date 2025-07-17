
'use client';

import MovieCard from './MovieCard';
import { motion } from 'framer-motion';

const gridVariants = {
  initial: { opacity: 1 }, // Changed from hidden: { opacity: 0 }
  animate: { // Renamed from show and ensured opacity is 1
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function MovieGrid({ movies }) {
  if (!movies || movies.length === 0) {
    return <p className="text-center text-muted-foreground">No movies found.</p>;
  }

  return (
    <motion.div
      variants={gridVariants}
      initial="initial" // Changed from hidden
      animate="animate" // Changed from show
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 sm:gap-4 md:gap-6"
    >
      {movies.map((movie, index) => (
        <MovieCard key={index} movie={movie} index={index} />
      ))}
    </motion.div>
  );
}
