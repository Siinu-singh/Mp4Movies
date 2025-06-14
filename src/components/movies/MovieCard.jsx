
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, CalendarDays, Film } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

const cardEntryVariants = {
  initial: { opacity: 1, y: 0, scale: 1 },
  animate: (index) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: index * 0.07,
      type: 'spring',
      stiffness: 100,
      damping: 12,
    },
  }),
};

const cardHoverVariants = {
  rest: {
    boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
    scale: 1,
  },
  hover: {
    boxShadow: "0px 12px 35px hsl(var(--primary)/0.35)",
    scale: 1.05,
    zIndex: 10,
    transition: { type: "spring", stiffness: 300, damping: 20 }
  }
};

const detailsOverlayVariants = {
  rest: { opacity: 1, y: "0%", transition: { duration: 0.3, ease: "easeOut" } },
  hover: {
    opacity: 1,
    y: "0%",
    transition: {
      duration: 0.4,
      ease: "easeInOut",
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};

const detailItemVariants = {
  rest: { opacity: 1, y: 0 },
  hover: { opacity: 1, y: 0, transition: {type: "spring", stiffness: 200, damping: 15} }
};


export default function MovieCard({ movie, index }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!movie) return null;

  return (
    <motion.div
      custom={index}
      variants={cardEntryVariants}
      initial="initial"
      animate="animate"
      className="relative"
    >
      <motion.div
        variants={cardHoverVariants}
        initial="rest"
        whileHover="hover"
        className="bg-card rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg overflow-hidden group border border-border/20 cursor-pointer"
      >
        <Link href={`/movies/${movie.slug}`} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-lg sm:rounded-xl md:rounded-2xl" aria-label={`View details for ${movie.title}`}>
          <div className="relative aspect-[2/3] w-full">
            <Image
              src={movie.poster || "https://placehold.co/500x750.png?text=No+Poster"}
              alt={movie.title}
              fill
              sizes="(max-width: 640px) 90vw, (max-width: 768px) 45vw, (max-width: 1024px) 30vw, (max-width: 1280px) 22vw, 18vw"
              className="object-cover transition-transform duration-350 ease-in-out group-hover:scale-105"
              data-ai-hint="movie poster"
              priority={index < 4}
            />

            <motion.div
              variants={detailsOverlayVariants}
              className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4 bg-gradient-to-t from-black/95 via-black/80 to-transparent text-primary-foreground"
            >
              <motion.h3 variants={detailItemVariants} className="text-sm sm:text-md md:text-lg font-bold truncate mb-0.5">
                {movie.title}
              </motion.h3>

              <motion.div variants={detailItemVariants} className="flex items-center text-[0.7rem] sm:text-xs md:text-sm text-muted-foreground/80 group-hover:text-primary-foreground/80 space-x-1.5 sm:space-x-2 mb-0.5 sm:mb-1">
                {movie.year && (
                  <div className="flex items-center">
                    <CalendarDays size={12} className="mr-0.5 sm:mr-1" />
                    <span>{movie.year}</span>
                  </div>
                )}
                {movie.duration && (
                  <div className="flex items-center">
                    <Film size={12} className="mr-0.5 sm:mr-1" />
                    <span>{movie.duration}</span>
                  </div>
                )}
              </motion.div>

              {movie.rating ? (
                <motion.div variants={detailItemVariants} className="flex items-center text-[0.7rem] sm:text-xs md:text-sm text-yellow-400 mb-1 sm:mb-1.5 md:mb-2">
                  <Star size={14} className="mr-0.5 sm:mr-1 fill-current" />
                  <span>{movie.rating}/10</span>
                </motion.div>
              ): <motion.div variants={detailItemVariants} className="h-[1.125rem] sm:h-[1.25rem] md:h-[1.5rem] mb-1 sm:mb-1.5 md:mb-2" /> }


              {movie.genre && movie.genre.length > 0 && (
                <motion.div variants={detailItemVariants} className="flex flex-wrap gap-1 mb-1 sm:mb-2">
                  {movie.genre.slice(0, 2).map((g) => (
                    <Badge
                      key={g}
                      variant="secondary"
                      className="text-[0.65rem] sm:text-xs px-1 sm:px-1.5 py-0 sm:py-0.5 bg-primary/20 backdrop-blur-sm text-primary-foreground border border-primary/40 rounded-sm shadow-sm"
                    >
                      {g}
                    </Badge>
                  ))}
                </motion.div>
              )}

              {!isMounted && movie.description && (
                <p
                  className="text-[0.7rem] sm:text-xs text-muted-foreground/70 leading-snug line-clamp-2 md:line-clamp-3"
                >
                  {movie.description}
                </p>
              )}
            </motion.div>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}
