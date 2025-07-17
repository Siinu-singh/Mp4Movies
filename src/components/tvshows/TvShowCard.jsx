'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, CalendarDays, Tv2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const cardVariants = {
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

const hoverVariants = {
  rest: {
    boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
    scale: 1,
  },
  hover: {
    boxShadow: "0px 10px 30px hsl(var(--primary)/0.3)",
    scale: 1.05,
    zIndex: 10,
    transition: { type: "spring", stiffness: 300, damping: 20 }
  }
};

const detailsOverlayVariants = {
  rest: { opacity: 1, y: "0%", transition: { duration: 0.3, ease: "easeOut" } },
  hover: { opacity: 1, y: "0%", transition: { duration: 0.4, ease: "easeInOut", staggerChildren: 0.05, delayChildren: 0.1 } }
};

const detailItemVariants = {
  rest: { opacity: 1, y: 0 },
  hover: { opacity: 1, y: 0, transition: {type: "spring", stiffness: 200, damping: 15} }
};


export default function TvShowCard({ tvShow, index }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!tvShow) return null;

  return (
    <Link href={`/tv-shows/${tvShow.slug}`} prefetch={false} className="block group">
      <motion.div
        custom={index}
        variants={cardVariants}
        initial="initial"
        animate="animate"
        className="relative"
      >
        <motion.div
          variants={hoverVariants}
          initial="rest"
          whileHover="hover"
          className="bg-card rounded-lg sm:rounded-xl shadow-lg overflow-hidden group border border-border/20 cursor-pointer flex flex-col h-full"
        >
          <div className="relative aspect-[2/3] w-full">
            <Image
              src={tvShow.poster || "https://placehold.co/500x750.png?text=TV+Show"}
              alt={tvShow.title}
              fill
              sizes="(max-width: 639px) 45vw, (max-width: 768px) 30vw, (max-width: 1024px) 22vw, (max-width: 1280px) 18vw, 15vw"
              className="object-cover transition-transform duration-350 ease-in-out group-hover:scale-105"
              data-ai-hint="tv show poster"
              priority={index < 6}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <motion.div
              variants={detailsOverlayVariants}
              className="absolute bottom-0 left-0 right-0 p-1 sm:p-2 md:p-3 bg-gradient-to-t from-black/95 via-black/80 to-transparent text-primary-foreground flex flex-col justify-end h-full"
            >
              <motion.h3 variants={detailItemVariants} className="text-xs font-bold mb-0.5 line-clamp-2 sm:text-sm md:text-base">
                {tvShow.title}
              </motion.h3>

              <motion.div variants={detailItemVariants} className="flex items-center text-[0.7rem] md:text-xs text-muted-foreground/80 group-hover:text-primary-foreground/80 space-x-1 md:space-x-1.5 mb-0.5">
                {tvShow.year && (
                  <div className="flex items-center">
                    <CalendarDays size={10} className="mr-0.5" />
                    <span>{tvShow.year}</span>
                  </div>
                )}
                {tvShow.seasons && (
                  <div className="flex items-center">
                    <Tv2 size={10} className="mr-0.5" />
                    <span className="whitespace-nowrap">{tvShow.seasons} Season{tvShow.seasons > 1 ? 's' : ''}</span>
                  </div>
                )}
              </motion.div>

              {tvShow.rating && (
                <motion.div variants={detailItemVariants} className="flex items-center text-[0.7rem] md:text-xs text-yellow-400 mb-0.5 md:mb-1">
                  <Star size={10} className="mr-0.5 fill-current" />
                  <span>{tvShow.rating}/10</span>
                </motion.div>
              )}

              {tvShow.genre && tvShow.genre.length > 0 && (
                <motion.div variants={detailItemVariants} className="flex flex-wrap gap-1 mb-1">
                  {tvShow.genre.slice(0, 1).map((g) => (
                    <Badge key={g} variant="secondary" className="text-[0.65rem] px-1 py-0 bg-white/10 group-hover:bg-primary/20 text-primary-foreground/90 border border-white/20 rounded-sm">
                      {g}
                    </Badge>
                  ))}
                </motion.div>
              )}

              {!isMounted && tvShow.description && (
                <p
                  className="text-[0.7rem] leading-snug line-clamp-1 sm:text-xs sm:line-clamp-2 md:line-clamp-3 text-muted-foreground/70"
                >
                  {tvShow.description}
                </p>
              )}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </Link>
  );
}
