'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayCircle, Loader2, RotateCcw, X, Radio } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useState, useEffect, useRef } from 'react';

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
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [loadingTime, setLoadingTime] = useState(60);
  const [loadFailed, setLoadFailed] = useState(false);
  const timerRef = useRef();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!channel) return null;

  const handleWatchOnline = () => {
    setIsVideoLoading(true);
    setShowVideoPlayer(true);
    setLoadFailed(false);
    setLoadingTime(60);

    timerRef.current = setInterval(() => {
      setLoadingTime((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setLoadFailed(true);
          setIsVideoLoading(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    setTimeout(() => {
      clearInterval(timerRef.current);
      setLoadFailed(true);
      setIsVideoLoading(false);
    }, 60000);
  };

  const handleTryAgain = () => {
    setIsVideoLoading(true);
    setLoadFailed(false);
    setLoadingTime(60);

    timerRef.current = setInterval(() => {
      setLoadingTime((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setLoadFailed(true);
          setIsVideoLoading(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    setTimeout(() => {
      clearInterval(timerRef.current);
      setLoadFailed(true);
      setIsVideoLoading(false);
    }, 60000);
  };

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <>
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
                <button
                  size="sm"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground text-[0.7rem] sm:text-xs md:text-sm lg:text-base px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 lg:px-5 lg:py-2.5 rounded-md shadow-md hover:shadow-lg transition-all w-full sm:w-auto"
                  onClick={handleWatchOnline}
                >
                  <PlayCircle size={16} className="mr-1 sm:mr-1.5" />
                  Watch Now
                </button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Video Player Section */}
      <AnimatePresence>
        {showVideoPlayer && (
          <>
            {/* Fullscreen Loading Popup */}
            {(isVideoLoading || loadFailed) && (
              <motion.div
                key="livetv-loading-popup"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
              >
                {/* Close Button */}
                <button
                  onClick={() => {
                    setIsVideoLoading(false);
                    setShowVideoPlayer(false);
                    setLoadFailed(false);
                    setLoadingTime(60);
                    clearInterval(timerRef.current);
                  }}
                  className="absolute top-4 right-4 text-white bg-black/40 hover:bg-black/70 rounded-full p-2 z-50 transition"
                  aria-label="Close"
                  type="button"
                >
                  <X size={28} />
                </button>
                <div className="flex flex-col items-center justify-center">
                  {!loadFailed ? (
                    <>
                      <div className="relative mb-6">
                        <div className="w-20 h-20 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-14 h-14 bg-primary/20 rounded-full animate-pulse flex items-center justify-center">
                            <PlayCircle size={32} className="text-primary fill-current ml-1" />
                          </div>
                        </div>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-primary mb-2">
                        Loading {channel.title}
                      </h3>
                      <div className="text-sm text-muted-foreground mb-2">
                        <Loader2 size={18} className="animate-spin inline-block mr-2" />
                        Preparing your live stream...
                      </div>
                      <div className="mt-4 w-64 h-1 bg-gray-700 rounded-full overflow-hidden mx-auto">
                        <div className="h-full bg-primary rounded-full animate-pulse" style={{ width: '100%' }}></div>
                      </div>
                      <div className="mt-4 text-xs text-muted-foreground">
                        Loading... {loadingTime}s left
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="relative mb-6">
                        <div className="w-20 h-20 mx-auto border-3 border-red-500/30 rounded-full flex items-center justify-center bg-red-500/10">
                          <PlayCircle size={32} className="text-red-400 fill-current ml-1" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-black">!</span>
                        </div>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-red-400 mb-2">
                        Failed to load stream
                      </h3>
                      <p className="text-gray-400 mb-4 text-sm sm:text-base">
                        Unable to load the live stream. Please check your connection and try again.
                      </p>
                      <button
                        onClick={handleTryAgain}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 font-semibold"
                      >
                        <RotateCcw size={18} />
                        Try Again
                      </button>
                    </>
                  )}
                </div>
              </motion.div>
            )}

            {/* Video Player Section (shows after loading) */}
            {!isVideoLoading && !loadFailed && (
              <motion.div
                id="video-player-section"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.5 }}
                className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8"
              >
                <div className="bg-card rounded-lg shadow-2xl overflow-hidden">
                  <div className="relative aspect-video bg-black">
                    {isVideoLoading ? (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
                        <div className="relative">
                          <div className="w-20 h-20 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-14 h-14 bg-primary/20 rounded-full animate-pulse flex items-center justify-center">
                              <PlayCircle size={20} className="text-primary fill-current ml-1" />
                            </div>
                          </div>
                        </div>
                        <div className="mt-8 text-center">
                          <h3 className="text-xl sm:text-2xl font-bold text-primary mb-2">
                            Loading {channel.title}
                          </h3>
                          <div className="text-sm text-muted-foreground">
                            <div className="flex items-center justify-center gap-2">
                              <Loader2 size={16} className="animate-spin" />
                              <span>Preparing your live stream...</span>
                            </div>
                          </div>
                          <div className="mt-4 w-64 h-1 bg-gray-700 rounded-full overflow-hidden mx-auto">
                            <div className="h-full bg-primary rounded-full animate-pulse" style={{ width: '100%' }}></div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
                        <div className="text-center max-w-md mx-auto p-6">
                          <div className="relative mb-6">
                            <div className="w-20 h-20 mx-auto border-3 border-red-500/30 rounded-full flex items-center justify-center bg-red-500/10">
                              <PlayCircle size={32} className="text-red-400 fill-current ml-1" />
                            </div>
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                              <span className="text-xs font-bold text-black">!</span>
                            </div>
                          </div>
                          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                            Connection Issue
                          </h3>
                          <p className="text-gray-400 mb-6 text-sm sm:text-base">
                            Unable to load the live stream. Please check your connection and try again.
                          </p>
                          <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <button
                              onClick={handleTryAgain}
                              className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 font-semibold"
                            >
                              <RotateCcw size={18} />
                              Try Again
                            </button>
                            <button
                              onClick={() => setShowVideoPlayer(false)}
                              className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 font-semibold"
                            >
                              <X size={18} />
                              Close
                            </button>
                          </div>
                          <p className="text-xs text-gray-500 mt-4">
                            If the problem persists, please contact support
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>
    </>
  );
}
