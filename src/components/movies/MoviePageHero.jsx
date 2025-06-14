
'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { PlayCircle, Info, PlusCircle, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const slideVariants = {
  initial: (direction) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.98,
  }),
  animate: {
    x: '0%',
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 120, damping: 20, duration: 0.6 },
  },
  exit: (direction) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.98,
    transition: { type: 'spring', stiffness: 120, damping: 20, duration: 0.6 },
  }),
};

const contentContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.4, // Delay content animation after slide transition
    },
  },
};

const contentItemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 100, damping: 15, duration: 0.5 },
  },
};


export default function MoviePageHero({ movies }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for next, -1 for prev
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false); // State to track dragging

  const handleNext = useCallback(() => {
    if (!movies || movies.length === 0) return;
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
  }, [movies]);

  const handlePrev = useCallback(() => {
    if (!movies || movies.length === 0) return;
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + movies.length) % movies.length);
  }, [movies]);

  const goToSlide = (slideIndex) => {
    if (!movies || movies.length === 0) return;
    setDirection(slideIndex > currentIndex ? 1 : (slideIndex < currentIndex ? -1 : direction));
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    if (isHovering || isDragging || !movies || movies.length <= 1) return;
    const timer = setTimeout(handleNext, 7000); // Autoplay every 7 seconds
    return () => clearTimeout(timer);
  }, [currentIndex, isHovering, isDragging, handleNext, movies]);

  if (!movies || movies.length === 0) {
    return (
      <div className="w-full h-[50vh] sm:h-[60vh] md:h-[calc(80vh-2rem)] bg-card flex items-center justify-center text-muted-foreground">
        No featured movies available for carousel.
      </div>
    );
  }

  const currentMovie = movies[currentIndex];

  return (
    <div
      className="relative w-full h-[50vh] sm:h-[60vh] md:h-[calc(80vh-2rem)] overflow-hidden shadow-2xl"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured Movies"
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentMovie.id} // Unique key for each slide
          custom={direction}
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={(event, { offset, velocity }) => {
            setIsDragging(false);
            const swipeThreshold = typeof window !== 'undefined' ? window.innerWidth / 4 : 100;
            if (offset.x < -swipeThreshold) {
              handleNext();
            } else if (offset.x > swipeThreshold) {
              handlePrev();
            }
          }}
          aria-roledescription="slide"
          aria-label={`${currentMovie.title} - Slide ${currentIndex + 1} of ${movies.length}`}
        >
          <Image
            src={currentMovie.backdrop_path || currentMovie.poster || "https://placehold.co/1280x720.png?text=Featured+Movie"}
            alt={`Backdrop for ${currentMovie.title}`}
            fill
            className="object-cover pointer-events-none"
            quality={80}
            priority={currentIndex === 0} // Prioritize loading the first image
            data-ai-hint="movie hero background cinematic"
            unoptimized={(currentMovie.backdrop_path || currentMovie.poster || "").startsWith('https://placehold.co')}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent md:bg-gradient-to-r md:from-background/90 md:via-background/60 md:to-transparent"></div>
          
          <motion.div 
            className="absolute inset-0 flex flex-col justify-end md:justify-center md:items-start p-4 sm:p-6 md:py-12 md:pl-12 lg:pl-20 xl:pl-28 md:pr-12 text-primary-foreground"
            variants={contentContainerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden" // Ensure content also exits
          >
            <div className="md:max-w-md lg:max-w-xl xl:max-w-2xl space-y-2 sm:space-y-3 md:space-y-4">
              <motion.h1 
                variants={contentItemVariants} 
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-headline text-primary drop-shadow-lg"
              >
                {currentMovie.title}
              </motion.h1>

              {currentMovie.tagline && (
                <motion.p variants={contentItemVariants} className="text-xs sm:text-sm md:text-md text-foreground/80 italic drop-shadow-sm">
                  {currentMovie.tagline}
                </motion.p>
              )}

              <motion.div variants={contentItemVariants} className="flex flex-wrap items-center gap-x-2 sm:gap-x-3 gap-y-1 sm:gap-y-2 text-xs sm:text-sm text-foreground/80">
                {currentMovie.year && <span>{currentMovie.year}</span>}
                {currentMovie.duration && <span>{currentMovie.duration}</span>}
                {currentMovie.rating && (
                  <span className="flex items-center">
                    <Star size={14} className="mr-1 text-yellow-400 fill-current" /> {currentMovie.rating}/10
                  </span>
                )}
                {currentMovie.quality && <Badge variant="outline" className="border-primary-foreground/30 text-primary-foreground/70 bg-black/20 backdrop-blur-sm text-[0.65rem] sm:text-xs px-1 sm:px-1.5 py-0 sm:py-0.5">{currentMovie.quality}</Badge>}
              </motion.div>
              
              {currentMovie.genre && currentMovie.genre.length > 0 && (
                <motion.div variants={contentItemVariants} className="flex flex-wrap gap-1 sm:gap-1.5">
                  {currentMovie.genre.slice(0, 3).map((g) => (
                    <Badge 
                      key={g} 
                      variant="secondary" 
                      className="bg-primary/20 backdrop-blur-md text-primary-foreground px-2 sm:px-2.5 py-0.5 sm:py-1 text-[0.65rem] sm:text-xs rounded-full border border-primary/40 shadow-sm"
                    >
                      {g}
                    </Badge>
                  ))}
                </motion.div>
              )}

              <motion.p variants={contentItemVariants} className="text-xs sm:text-sm text-foreground/70 leading-relaxed line-clamp-2 md:line-clamp-3">
                {currentMovie.description}
              </motion.p>
              
              <motion.div variants={contentItemVariants} className="flex flex-wrap gap-2 sm:gap-3 items-center pt-1 sm:pt-2">
                <Button 
                  asChild 
                  size="default" 
                  className="bg-gradient-to-r from-primary to-orange-600 hover:from-primary/90 hover:to-orange-700 text-primary-foreground shadow-lg px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm md:text-base rounded-md sm:rounded-lg"
                >
                  <Link href={`/movies/${currentMovie.slug}`}>
                    <PlayCircle size={18} className="mr-1 sm:mr-1.5" />
                    Watch Now
                  </Link>
                </Button>
                <Button 
                  asChild
                  variant="outline" 
                  size="default" 
                  className="bg-black/20 hover:bg-black/30 backdrop-blur-lg text-primary-foreground/80 border-white/20 hover:text-primary-foreground shadow-lg px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm md:text-base rounded-md sm:rounded-lg"
                >
                   <Link href={`/movies/${currentMovie.slug}`}>
                    <Info size={18} className="mr-1 sm:mr-1.5" />
                    More Info
                  </Link>
                </Button>
                 <Button variant="ghost" size="icon" className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-white/10 rounded-full w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 backdrop-blur-sm border border-transparent hover:border-white/20">
                    <PlusCircle size={20} />
                 </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {movies.length > 1 && (
        <>
          {/* Navigation Arrows */}
          <button 
            onClick={handlePrev} 
            className="absolute left-1 sm:left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 p-1 sm:p-2 bg-black/30 hover:bg-black/50 text-white rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary hidden md:block"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={handleNext} 
            className="absolute right-1 sm:right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 p-1 sm:p-2 bg-black/30 hover:bg-black/50 text-white rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary hidden md:block"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>

          {/* Navigation Dots */}
          <div className="absolute bottom-2 sm:bottom-4 md:bottom-5 left-1/2 -translate-x-1/2 flex space-x-1.5 sm:space-x-2 z-20" aria-label="Slide indicators">
            {movies.map((_, index) => (
              <motion.button
                key={`dot-${index}`}
                onClick={() => goToSlide(index)}
                className={cn(
                  "w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 rounded-full focus:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:ring-offset-black/50",
                  currentIndex === index ? 'bg-primary' : 'bg-white/40 hover:bg-white/70 backdrop-blur-sm'
                )}
                animate={{ scale: currentIndex === index ? 1.5 : 1, opacity: currentIndex === index ? 1 : 0.6 }}
                transition={{ type:'spring', stiffness: 300, damping: 20 }}
                aria-current={currentIndex === index ? "true" : "false"}
                aria-label={`Go to slide ${index + 1}`}
                role="tab"
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

