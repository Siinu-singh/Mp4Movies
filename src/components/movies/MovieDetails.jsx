'use client';

import Image from 'next/image';
import { Star, CalendarDays, Users, Video, ChevronDown, ChevronUp, PlayCircle, Heart, Play, Download, Loader2, RotateCcw, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

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
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [showDownloadPopup, setShowDownloadPopup] = useState(false);
  const [isDownloadLoading, setIsDownloadLoading] = useState(false);

  // Prevent body scroll when popup is open - removed the useEffect since we're handling it manually now

  if (!movie) {
    return <p className="text-center text-muted-foreground">Movie details not found.</p>;
  }

  const pgRating = movie.pgRating || 'PG-13';
  const likes = movie.likes !== undefined ? movie.likes : Math.floor(Math.random() * 500) + 50;
  const releaseYear = movie.year || (movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : 'N/A');

  const handleWatchOnline = () => {
    setIsVideoLoading(true);
    setShowVideoPlayer(true);
    
    // Scroll to video section after a brief delay to allow the section to render
    setTimeout(() => {
      const videoSection = document.getElementById('video-player-section');
      if (videoSection) {
        videoSection.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start',
          inline: 'nearest'
        });
      }
    }, 100);
    
    // Simulate loading time (replace with actual video loading logic)
    setTimeout(() => {
      setIsVideoLoading(false);
      // Here you would typically load the actual video
    }, 60000); // 60 seconds loading simulation
  };

  const handleTryAgain = () => {
    setIsVideoLoading(true);
    
    // Simulate loading time again
    setTimeout(() => {
      setIsVideoLoading(false);
    }, 60000);
  };

  const handleDownload = () => {
    // Store current scroll position and lock scroll immediately
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    
    setShowDownloadPopup(true);
    setIsDownloadLoading(true);
    
    // Simulate download link generation time
    setTimeout(() => {
      setIsDownloadLoading(false);
    }, 30000); // 30 seconds loading simulation
  };

  const closeDownloadPopup = () => {
    // Restore scroll position
    const scrollY = document.body.style.top;
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
    
    setShowDownloadPopup(false);
    setIsDownloadLoading(false);
  };

  const handleTryAgainDownload = () => {
    setIsDownloadLoading(true);
    
    // Simulate loading time again
    setTimeout(() => {
      setIsDownloadLoading(false);
    }, 30000);
  };

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
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-10 lg:p-12 text-primary-foreground z-20">
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
          <motion.div variants={staggerItem} className="flex flex-wrap items-center gap-x-2 sm:gap-x-3 md:gap-x-4 gap-y-1 sm:gap-y-2 text-xs sm:text-sm md:text-base mb-4 md:mb-6">
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
          
          {/* Action Buttons */}
          <motion.div variants={staggerItem} className="flex flex-col sm:flex-row gap-2 sm:gap-4 relative z-30">
            <button
              onClick={handleWatchOnline}
              className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-base hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-lg relative z-30 cursor-pointer touch-manipulation"
              style={{ pointerEvents: 'auto' }}
            >
              <Play size={18} className="fill-current pointer-events-none" />
              <span className="pointer-events-none">Watch Online</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-base hover:bg-secondary/90 transition-all duration-300 transform hover:scale-105 shadow-lg border border-secondary-foreground/20 relative z-30 cursor-pointer touch-manipulation"
              style={{ pointerEvents: 'auto' }}
            >
              <Download size={18} className="pointer-events-none" />
              <span className="pointer-events-none">Download</span>
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content Card Section */}
      <motion.div
        variants={staggerItem}
        className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12 -mt-10 sm:-mt-12 md:-mt-20 relative z-10"
      >
        <div className="bg-card p-4 sm:p-6 md:p-8 rounded-lg sm:rounded-xl shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 md:gap-8">
            {/* Left Column: Poster */}
            <motion.div variants={staggerItem} className="md:col-span-4 lg:col-span-3">
              <div className="relative aspect-[2/3] w-full max-w-[200px] sm:max-w-xs mx-auto md:mx-0 rounded-md sm:rounded-lg shadow-xl overflow-hidden">
                <Image
                  src={movie.poster || "https://placehold.co/500x750.png?text=No+Poster"}
                  alt={movie.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 40vw, (max-width: 1024px) 30vw, 20vw"
                  className="object-cover"
                  data-ai-hint="movie poster detail"
                />
              </div>
              
              {/* Mobile Action Buttons (shown only on mobile when poster is centered) */}
              <div className="md:hidden mt-4 flex flex-col gap-2 relative z-10">
                <button
                  onClick={handleWatchOnline}
                  className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-primary/90 transition-all duration-300 shadow-lg relative z-10"
                >
                  <Play size={16} className="fill-current" />
                  Watch Online
                </button>
                <button
                  onClick={handleDownload}
                  className="flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-secondary/90 transition-all duration-300 shadow-lg border border-secondary-foreground/20 relative z-10"
                >
                  <Download size={16} />
                  Download
                </button>
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
                          {/* <Image src={`https://placehold.co/80x80.png?text=${actor.split(' ').map(n=>n[0]).join('')}`} alt={actor} width={80} height={80} className="object-cover w-full h-full" /> */}
                          <Image src={`https://static.vecteezy.com/system/resources/thumbnails/048/926/084/small_2x/silver-membership-icon-default-avatar-profile-icon-membership-icon-social-media-user-image-illustration-vector.jpg`} alt={actor} width={80} height={80} className="object-cover w-full h-full" />
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

      {/* Video Player Section */}
      <AnimatePresence>
        {showVideoPlayer && (
          <motion.div
            id="video-player-section"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8"
          >
            <div className="bg-card rounded-lg sm:rounded-xl shadow-2xl overflow-hidden">
              <div className="relative aspect-video bg-black">
                {isVideoLoading ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
                    {/* Beautiful Loading Animation */}
                    <div className="relative">
                      {/* Outer rotating ring */}
                      <div className="w-20 h-20 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                      
                      {/* Inner pulsing circle */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 bg-primary/20 rounded-full animate-pulse flex items-center justify-center">
                          <Play size={20} className="text-primary fill-current ml-1" />
                        </div>
                      </div>
                      
                      {/* Floating dots */}
                      <div className="absolute -top-2 -right-2 w-3 h-3 bg-primary rounded-full animate-bounce"></div>
                      <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-primary/70 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                      <div className="absolute top-1/2 -left-4 w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '0.6s' }}></div>
                    </div>
                    
                    {/* Loading text with typewriter effect */}
                    <div className="mt-8 text-center">
                      <motion.h3 
                        className="text-xl sm:text-2xl font-bold text-primary mb-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        Loading {movie.title}
                      </motion.h3>
                      <motion.div 
                        className="text-sm text-muted-foreground"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <Loader2 size={16} className="animate-spin" />
                          <span>Preparing your movie experience...</span>
                        </div>
                      </motion.div>
                      
                      {/* Progress bar */}
                      <motion.div 
                        className="mt-4 w-64 h-1 bg-gray-700 rounded-full overflow-hidden mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                      >
                        <motion.div 
                          className="h-full bg-primary rounded-full"
                          initial={{ width: '0%' }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 58, ease: 'easeInOut' }}
                        ></motion.div>
                      </motion.div>
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
                    <div className="text-center max-w-md mx-auto p-6">
                      {/* Error/Connection Issue Icon */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                        className="relative mb-6"
                      >
                        <div className="w-20 h-20 mx-auto border-3 border-red-500/30 rounded-full flex items-center justify-center bg-red-500/10">
                          <Play size={32} className="text-red-400 fill-current ml-1" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-black">!</span>
                        </div>
                      </motion.div>
                      
                      {/* Error Message */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                          Connection Issue
                        </h3>
                        <p className="text-gray-400 mb-6 text-sm sm:text-base">
                          Unable to load the video stream. Please check your connection and try again.
                        </p>
                      </motion.div>
                      
                      {/* Action Buttons */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-col sm:flex-row gap-3 justify-center"
                      >
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
                      </motion.div>
                      
                      {/* Additional Help Text */}
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="text-xs text-gray-500 mt-4"
                      >
                        If the problem persists, please contact support
                      </motion.p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Download Popup */}
      <AnimatePresence>
        {showDownloadPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 overflow-hidden"
            style={{ 
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem'
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                closeDownloadPopup();
              }
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-card rounded-xl shadow-2xl max-w-md w-full overflow-hidden"
              style={{
                position: 'relative',
                margin: 'auto'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 sm:p-6">
                {isDownloadLoading ? (
                  <div className="text-center">
                    {/* Loading Animation for Download */}
                    <div className="relative mb-4 sm:mb-6">
                      {/* Outer rotating ring */}
                      <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto border-4 border-green-500/30 border-t-green-500 rounded-full animate-spin"></div>
                      
                      {/* Inner pulsing circle */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-10 h-10 sm:w-14 sm:h-14 bg-green-500/20 rounded-full animate-pulse flex items-center justify-center">
                          <Download size={16} className="sm:w-5 sm:h-5 text-green-500" />
                        </div>
                      </div>
                      
                      {/* Floating dots */}
                      <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-green-500 rounded-full animate-bounce"></div>
                      <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500/70 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                      <div className="absolute top-1/2 -left-3 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-green-500/50 rounded-full animate-bounce" style={{ animationDelay: '0.6s' }}></div>
                    </div>
                    
                    {/* Loading text */}
                    <motion.h3 
                      className="text-lg sm:text-xl font-bold text-foreground mb-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      Generating Download Link
                    </motion.h3>
                    <motion.p 
                      className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 px-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      Preparing <span className="font-semibold text-foreground">{movie.title}</span> for download...
                    </motion.p>
                    
                    <motion.div 
                      className="flex items-center justify-center gap-2 text-xs text-muted-foreground mb-3 sm:mb-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                    >
                      <Loader2 size={12} className="sm:w-3.5 sm:h-3.5 animate-spin" />
                      <span>This may take up to 30 seconds...</span>
                    </motion.div>
                    
                    {/* Progress bar */}
                    <motion.div 
                      className="w-full h-1.5 sm:h-2 bg-muted rounded-full overflow-hidden mb-3 sm:mb-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9 }}
                    >
                      <motion.div 
                        className="h-full bg-green-500 rounded-full"
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 29, ease: 'easeInOut' }}
                      ></motion.div>
                    </motion.div>
                    
                    {/* Cancel button */}
                    <button 
                      onClick={closeDownloadPopup}
                      className="text-muted-foreground hover:text-foreground transition-colors text-xs sm:text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    {/* Error/Failure Icon */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                      className="relative mb-4 sm:mb-6"
                    >
                      <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto border-3 border-red-500/30 rounded-full flex items-center justify-center bg-red-500/10">
                        <Download size={18} className="sm:w-6 sm:h-6 text-red-400" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-black">!</span>
                      </div>
                    </motion.div>
                    
                    {/* Error Message */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
                        Download Failed
                      </h3>
                      <p className="text-muted-foreground mb-4 sm:mb-6 text-xs sm:text-sm px-2">
                        Unable to generate download link for <span className="font-semibold text-foreground">{movie.title}</span>. Please try again.
                      </p>
                    </motion.div>
                    
                    {/* Action Buttons */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="flex flex-col gap-2 sm:gap-3"
                    >
                      <button 
                        onClick={handleTryAgainDownload}
                        className="flex items-center justify-center gap-2 w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 font-semibold text-sm"
                      >
                        <RotateCcw size={14} className="sm:w-4 sm:h-4" />
                        Try Again
                      </button>
                      <button 
                        onClick={closeDownloadPopup}
                        className="w-full px-3 py-2 sm:px-4 sm:py-2 text-muted-foreground hover:text-foreground transition-colors text-xs sm:text-sm"
                      >
                        Cancel
                      </button>
                    </motion.div>
                    
                    {/* Additional Help Text */}
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="text-xs text-muted-foreground mt-3 sm:mt-4 px-2"
                    >
                      Check your internet connection and try again
                    </motion.p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}