
'use client';

import Image from 'next/image';
import { Star, CalendarDays, Users, Video, ChevronDown, ChevronUp, PlayCircle, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const AnimatedReadMore = ({ text, maxLength = 180 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!text) return null;

  const toggleReadMore = () => setIsExpanded(!isExpanded);

  const displayText = isExpanded ? text : `${text.substring(0, maxLength)}...`;

  return (
    <div>
      <motion.p
        className="text-foreground/80 leading-relaxed text-sm md:text-base mb-2 sm:mb-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {displayText}
      </motion.p>
      {text.length > maxLength && (
        <button
          onClick={toggleReadMore}
          className="text-primary hover:underline flex items-center text-sm md:text-base font-semibold"
        >
          {isExpanded ? 'Show Less' : 'Read More'}
          {isExpanded ? <ChevronUp size={18} className="ml-1" /> : <ChevronDown size={18} className="ml-1" />}
        </button>
      )}
    </div>
  );
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
};

export default function MovieDetails({ movie }) {
  if (!movie) {
    return <p className="text-center text-muted-foreground">Movie details not found.</p>;
  }

  const pgRating = movie.pgRating || 'PG-13';
  const likes = movie.likes !== undefined ? movie.likes : Math.floor(Math.random() * 500) + 50;
  const releaseYear = movie.year || (movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : 'N/A');

  return (
    <motion.div initial="hidden" animate="show" variants={staggerContainer}>
      {/* Backdrop Section */}
      <motion.div
        variants={staggerItem}
        className="relative w-full h-[40vh] sm:h-[50vh] md:h-[65vh] xl:h-[75vh] overflow-hidden"
      >
        <Image
          src={movie.backdrop_path || movie.poster || "https://placehold.co/1920x1080.png?text=Backdrop+Unavailable"}
          alt={`Backdrop for ${movie.title}`}
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
          data-ai-hint="movie backdrop cinematic"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-10 lg:p-12 text-primary-foreground z-10">
          <motion.h1
            variants={staggerItem}
            className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold font-headline mb-1 md:mb-2 drop-shadow-lg text-primary"
          >
            {movie.title}
          </motion.h1>
          {movie.tagline && (
            <motion.p variants={staggerItem} className="text-sm sm:text-md md:text-xl text-foreground/80 mb-2 md:mb-4 drop-shadow-md">
              {movie.tagline}
            </motion.p>
          )}
          <motion.div variants={staggerItem} className="flex flex-wrap items-center gap-x-2 sm:gap-x-3 md:gap-x-4 gap-y-1 sm:gap-y-2 text-xs sm:text-sm md:text-base">
            <Badge variant="outline" className="border-yellow-400 text-yellow-400 bg-transparent px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs md:text-sm">
              {pgRating}
            </Badge>
            <div className="flex items-center text-yellow-400">
              <Star size={18} className="mr-1 fill-current" />
              <span>{movie.rating}/10</span>
            </div>
            <div className="flex items-center text-red-400">
              <Heart size={18} className="mr-1 fill-current" />
              <span>{likes}</span>
            </div>
            <span className="text-foreground/70">{releaseYear}</span>
            {movie.duration && <span className="text-foreground/70">{movie.duration}</span>}
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content Card Section */}
      <motion.div
        variants={staggerItem}
        className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12 -mt-10 sm:-mt-12 md:-mt-20 relative z-20"
      >
        <div className="bg-card p-4 sm:p-6 md:p-8 rounded-lg sm:rounded-xl shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 md:gap-8">
            {/* Left Column: Poster */}
            <motion.div variants={staggerItem} className="md:col-span-4 lg:col-span-3">
              <div className="relative aspect-[2/3] w-full max-w-[200px] sm:max-w-xs mx-auto md:mx-0 rounded-md sm:rounded-lg shadow-xl overflow-hidden group">
                <Image
                  src={movie.poster || "https://placehold.co/500x750.png?text=No+Poster"}
                  alt={movie.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 40vw, (max-width: 1024px) 30vw, 20vw"
                  className="object-cover"
                  data-ai-hint="movie poster detail"
                />
                <div 
                  className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                  onClick={() => alert(`Play ${movie.title}`)} // Placeholder action
                >
                  <PlayCircle size={72} className="text-primary-foreground drop-shadow-lg" />
                </div>
              </div>
            </motion.div>

            {/* Right Column: Details, Synopsis, Cast */}
            <motion.div variants={staggerItem} className="md:col-span-8 lg:col-span-9">
              {movie.genre && movie.genre.length > 0 && (
                <div className="mb-3 sm:mb-4 md:mb-6">
                  <h3 className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 sm:mb-2">Genres</h3>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {movie.genre.map((g) => (
                      <Badge key={g} variant="secondary" className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-xs">{g}</Badge>
                    ))}
                  </div>
                </div>
              )}
              
              <div>
                <h3 className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 sm:mb-2">Synopsis</h3>
                <AnimatedReadMore text={movie.description} />
              </div>

              {movie.cast && movie.cast.length > 0 && (
                <div className="mt-3 sm:mt-4 md:mt-6">
                  <h3 className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2 sm:mb-3">Cast</h3>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {movie.cast.slice(0, 7).map((actor) => (
                      <div key={actor} className="flex flex-col items-center group cursor-pointer">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-muted overflow-hidden mb-1 shadow-md transition-transform group-hover:scale-105">
                          {/* Placeholder for actor image - replace with actual images if available */}
                          <Image src={`https://placehold.co/80x80.png?text=${actor.split(' ').map(n=>n[0]).join('')}`} alt={actor} width={80} height={80} className="object-cover w-full h-full" />
                        </div>
                        <p className="text-xs text-center text-foreground/80 w-14 sm:w-16 md:w-20 truncate transition-colors group-hover:text-primary">{actor}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

