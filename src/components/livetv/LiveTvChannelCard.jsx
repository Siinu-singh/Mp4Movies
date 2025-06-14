
'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { PlayCircle, Info, Radio } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

const cardVariants = {
  initial: { opacity: 1, y: 0, scale: 1 },
  animate: (index) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: index * 0.08,
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
    boxShadow: "0px 12px 35px hsl(var(--primary)/0.35)",
    scale: 1.05,
    zIndex: 10,
    transition: { type: "spring", stiffness: 300, damping: 20 }
  }
};

const overlayVariants = {
  rest: { opacity: 1, y: "0%", transition: { duration: 0.4, ease: "easeOut" } },
  hover: { opacity: 1, y: "0%", transition: { duration: 0.3, ease: "circOut", staggerChildren: 0.07, delayChildren: 0.1 } }
};

const itemVariants = {
  rest: { opacity: 1, y: 0 },
  hover: { opacity: 1, y: 0, transition: {type: "spring", stiffness: 180, damping: 15} }
};

export default function LiveTvChannelCard({ channel, index }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!channel) return null;

  return (
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
        className="bg-card rounded-2xl shadow-lg overflow-hidden group border border-border/20 cursor-pointer aspect-video"
      >
        <div className="relative w-full h-full">
          <Image
            src={channel.thumbnail || "https://placehold.co/600x400.png?text=Live+Channel"}
            alt={channel.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-350 ease-in-out group-hover:scale-105"
            data-ai-hint={channel.dataAiHint || "live tv thumbnail"}
            priority={index < 4}
          />

          {channel.isLive && (
            <Badge
              variant="destructive"
              className="absolute top-2 right-2 px-1.5 py-0.5 sm:px-2 text-xs bg-red-600/80 backdrop-blur-sm text-white border-none shadow-md animate-pulse"
            >
              <Radio size={12} className="mr-1" /> LIVE
            </Badge>
          )}

          <motion.div
            variants={overlayVariants}
            className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4 bg-gradient-to-t from-black/90 via-black/70 to-transparent text-primary-foreground flex flex-col justify-end h-full"
          >
            <motion.h3 variants={itemVariants} className="text-sm sm:text-base md:text-lg lg:text-xl font-bold truncate mb-0.5 sm:mb-1">
              {channel.title}
            </motion.h3>

            {!isMounted && channel.description && (
              <p
                className="text-xs sm:text-sm md:text-sm lg:text-base text-muted-foreground/80 leading-snug line-clamp-2 mb-1 sm:mb-2 md:mb-3"
              >
                {channel.description}
              </p>
            )}

            <motion.div variants={itemVariants} className="mt-auto"> {/* Added mt-auto to push button down if description is not present */}
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-[0.7rem] sm:text-xs md:text-sm lg:text-base px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 lg:px-5 lg:py-2.5 rounded-md shadow-md hover:shadow-lg transition-all w-full sm:w-auto"
                onClick={() => window.open(channel.streamUrl, '_blank')}
              >
                <PlayCircle size={16} className="mr-1 sm:mr-1.5" />
                Watch Now
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
