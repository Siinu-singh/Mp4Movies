
'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayCircle, PlusCircle, ThumbsUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
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
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: 0.4, // Delay content animation after slide transition
      staggerChildren: 0.15,
      when: "beforeChildren"
    },
  },
};

const contentItemVariants = {
  hidden: { opacity: 0, y: 25, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 100, damping: 15, duration: 0.5 },
  },
};

const iconButtonVariants = {
  hover: { scale: 1.15, color: 'hsl(var(--primary))' },
  tap: { scale: 0.9 },
  initial: {scale: 1, color: 'hsl(var(--primary-foreground))'}
};

export default function HeroCarousel({ slides }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false); // State to track dragging

  const handleNext = useCallback(() => {
    if (!slides || slides.length === 0) return;
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  }, [slides]);

  const handlePrev = useCallback(() => {
    if (!slides || slides.length === 0) return;
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  }, [slides]);


  const goToSlide = (slideIndex) => {
    if (!slides || slides.length === 0) return;
    setDirection(slideIndex > currentIndex ? 1 : (slideIndex < currentIndex ? -1 : direction));
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    // Pause autoplay if hovering or dragging, or if no slides/only one slide
    if (isHovering || isDragging || !slides || slides.length <= 1) return;

    const timer = setTimeout(handleNext, 5000); // Autoplay every 5 seconds

    return () => clearTimeout(timer);
  }, [currentIndex, isHovering, isDragging, handleNext, slides]); // Added isDragging to dependencies

  if (!slides || slides.length === 0) {
    return (
        <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] bg-muted flex items-center justify-center">
            <p className="text-muted-foreground">No hero slides available.</p>
        </div>
    );
  }

  const currentSlide = slides[currentIndex];

  return (
    <div
      className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] overflow-hidden bg-background shadow-2xl"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured Movies"
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide.id || currentIndex} // Use a unique key for each slide
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
            const swipeThreshold = typeof window !== 'undefined' ? window.innerWidth / 4 : 100; // Swipe threshold
            if (offset.x < -swipeThreshold) {
              handleNext();
            } else if (offset.x > swipeThreshold) {
              handlePrev();
            }
          }}
          aria-roledescription="slide"
          aria-label={`${currentSlide.title} - Slide ${currentIndex + 1} of ${slides.length}`}
        >
          <Image
            src={currentSlide.backgroundImage}
            alt={`Background for ${currentSlide.title}`}
            fill
            className="object-cover pointer-events-none" // Prevent image from interfering with drag
            quality={80}
            priority={currentIndex === 0}
            data-ai-hint={currentSlide.dataAiHint || 'movie background'}
            unoptimized={currentSlide.backgroundImage.startsWith('https://placehold.co')} 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/20 md:from-black/70 md:via-black/40 md:to-transparent"></div>

          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 sm:p-6 md:items-start md:text-left md:pl-[5vw] lg:pl-[8vw] xl:pl-[10vw]"
            variants={contentContainerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.h1
              variants={contentItemVariants}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-foreground mb-3 sm:mb-4 md:mb-6 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl leading-tight drop-shadow-lg"
            >
              {currentSlide.title}
            </motion.h1>
            <motion.p
              variants={contentItemVariants}
              className="text-sm sm:text-base md:text-lg lg:text-xl text-primary-foreground/80 mb-4 sm:mb-6 md:mb-8 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl drop-shadow-md"
            >
              {currentSlide.description}
            </motion.p>
            <motion.div variants={contentItemVariants}>
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm sm:text-md md:text-lg px-6 py-2.5 sm:px-8 sm:py-3 rounded-md shadow-lg hover:shadow-xl transition-shadow">
                <Link href={`/movies/${currentSlide.title?.toLowerCase().replace(/\s+/g, '-') || 'featured'}`}>Join Now</Link>
              </Button>
            </motion.div>
            <motion.div
              variants={contentItemVariants}
              className="mt-4 sm:mt-6 md:mt-10 flex space-x-4 sm:space-x-5 md:space-x-6 text-primary-foreground/70"
            >
              <motion.button variants={iconButtonVariants} initial="initial" whileHover="hover" whileTap="tap" aria-label="Play Trailer">
                <PlayCircle size={30} strokeWidth={1.5} />
              </motion.button>
              <motion.button variants={iconButtonVariants} initial="initial" whileHover="hover" whileTap="tap" aria-label="Add to Watchlist">
                <PlusCircle size={30} strokeWidth={1.5} />
              </motion.button>
              <motion.button variants={iconButtonVariants} initial="initial" whileHover="hover" whileTap="tap" aria-label="Like this movie">
                <ThumbsUp size={30} strokeWidth={1.5} />
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
      
      {slides.length > 1 && (
        <>
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
          <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 flex space-x-2 sm:space-x-2.5 z-20" aria-label="Slide indicators">
            {slides.map((_, index) => (
              <motion.button
                key={`dot-${index}`}
                onClick={() => goToSlide(index)}
                className={cn(`w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background
                            ${currentIndex === index ? 'bg-primary' : 'bg-muted-foreground/50 hover:bg-muted-foreground/70'}`)}
                animate={{ scale: currentIndex === index ? 1.6 : 1, opacity: currentIndex === index ? 1 : 0.7 }}
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

