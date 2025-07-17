'use client';

import { useState, useEffect } from 'react';
import TvShowDetails from '@/components/tvshows/TvShowDetails'; // You need this component!
import { motion } from 'framer-motion';

const Loader = () => (
  <div className="flex flex-col justify-center items-center min-h-[calc(100vh-160px)] text-center py-10">
    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary mb-6"></div>
    <p className="text-xl font-semibold text-foreground/90 mb-2">Loading TV Show...</p>
    <p className="text-md text-muted-foreground">Just a moment while we fetch the details...</p>
  </div>
);

export default function TvShowDetailClientWrapper({ tvShow }) {
  const [isLoading, setIsLoading] = useState(true);
  const [canShowContent, setCanShowContent] = useState(false);

  useEffect(() => {
    const delay = Math.floor(Math.random() * (7000 - 5000 + 1)) + 5000;
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setCanShowContent(true), 50);
    }, delay);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: canShowContent ? 1 : 0 }}>
      <TvShowDetails tvShow={tvShow} />
    </motion.div>
  );
}