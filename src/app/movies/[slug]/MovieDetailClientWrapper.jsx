
'use client';

import { useState, useEffect } from 'react';
import MovieDetails from '@/components/movies/MovieDetails';
import { motion } from 'framer-motion';

const Loader = () => (
  <div className="flex flex-col justify-center items-center min-h-[calc(100vh-160px)] text-center py-10"> {/* Adjusted min-height for typical header/footer */}
    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary mb-6"></div>
    <p className="text-xl font-semibold text-foreground/90 mb-2">Loading Movie...</p>
    <p className="text-md text-muted-foreground">Just a moment while we fetch the details...</p>
  </div>
);

export default function MovieDetailClientWrapper({ movie }) {
  const [isLoading, setIsLoading] = useState(true);
  const [canShowContent, setCanShowContent] = useState(false);

  useEffect(() => {
    // Random delay between 5000ms (5 seconds) and 7000ms (7 seconds)
    const delay = Math.floor(Math.random() * (7000 - 5000 + 1)) + 5000;
    
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Short delay for the content to fade in smoothly after loader disappears
      // This helps avoid a jarring transition if MovieDetails itself has complex entry animations
      setTimeout(() => setCanShowContent(true), 50);
    }, delay);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []); // Empty dependency array ensures this effect runs only once on mount

  if (isLoading) {
    return <Loader />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: canShowContent ? 1 : 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {/* MovieDetails component handles its own internal animations once rendered */}
      <MovieDetails movie={movie} />
    </motion.div>
  );
}
