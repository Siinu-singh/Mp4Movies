
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search as SearchIcon, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2, ease: 'easeIn' } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, type: 'spring', stiffness: 100, damping: 15 },
  }),
  exit: { opacity: 0, y: -10, transition: { duration: 0.15 } },
};

export default function SearchModal({ isOpen, onClose, allMovies = [] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [initialDelayCompletedThisSession, setInitialDelayCompletedThisSession] = useState(false);

  useEffect(() => {
    // Reset delay flag when modal is closed
    if (!isOpen) {
      setSearchTerm('');
      setSearchResults([]);
      setIsLoading(false);
      setInitialDelayCompletedThisSession(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const trimmedSearchTerm = searchTerm.trim();

    if (trimmedSearchTerm === '') {
      setSearchResults([]);
      setIsLoading(false);
      // If search term is cleared, reset the delay flag for the next actual search
      setInitialDelayCompletedThisSession(false); 
      return;
    }

    setIsLoading(true);
    const lowerSearchTerm = trimmedSearchTerm.toLowerCase();
    
    let delayDuration = 300; // Default short delay for subsequent searches

    if (!initialDelayCompletedThisSession) {
      delayDuration = 30000; // 30-second delay for the first search in the session
    }

    const timer = setTimeout(() => {
      const filteredMovies = allMovies.filter(movie =>
        movie.title.toLowerCase().includes(lowerSearchTerm) ||
        (movie.description && movie.description.toLowerCase().includes(lowerSearchTerm)) ||
        (movie.genre && movie.genre.some(g => g.toLowerCase().includes(lowerSearchTerm)))
      );
      setSearchResults(filteredMovies);
      setIsLoading(false);
      if (!initialDelayCompletedThisSession) {
        setInitialDelayCompletedThisSession(true); // Mark that the initial long delay has occurred
      }
    }, delayDuration);

    return () => clearTimeout(timer);

  }, [searchTerm, allMovies, isOpen, initialDelayCompletedThisSession]);

  const handleSearchFormSubmit = (e) => {
    e.preventDefault();
    // The actual search logic is handled by the useEffect above, triggered by searchTerm changes.
    // This function primarily prevents default form submission.
    // If searchTerm is empty and user hits enter, we might want to ensure the state reflects that.
    if (searchTerm.trim() === '' && searchResults.length > 0) {
      setSearchResults([]);
      setIsLoading(false);
      setInitialDelayCompletedThisSession(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="sm:max-w-2xl md:max-w-3xl lg:max-w-4xl p-0 overflow-hidden flex flex-col max-h-[90vh]"
        onOpenAutoFocus={(e) => e.preventDefault()} // Prevent auto-focus on first element
      >
        <motion.div 
            variants={modalVariants} 
            initial="hidden" 
            animate="visible" 
            exit="exit" 
            className="flex flex-col flex-1 min-h-0"
        >
          <DialogHeader className="p-6 pb-4 shrink-0">
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary via-orange-400 to-red-500 bg-clip-text text-transparent">
              Search Movies
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Find your favorite movies by title, description, or genre.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSearchFormSubmit} className="px-6 pb-6 bg-background z-10 border-b border-border shrink-0">
            <div className="flex w-full items-center space-x-2">
              <Input
                type="text"
                placeholder="e.g., Inception, Action, Space..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-12 text-lg focus-visible:ring-primary focus-visible:ring-offset-0"
                autoFocus
              />
              <Button type="submit" size="lg" className="h-12 bg-primary hover:bg-primary/90">
                <SearchIcon className="mr-2 h-5 w-5" /> Search
              </Button>
            </div>
          </form>

          <ScrollArea className="flex-1 min-h-0">
            <div className="p-6 pt-2 space-y-4">
              {isLoading && searchTerm.trim() !== '' && (
                <div className="flex justify-center items-center py-10">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                  <p className="ml-3 text-muted-foreground">Searching...</p>
                </div>
              )}
              {!isLoading && searchTerm.trim() !== '' && searchResults.length === 0 && (
                <p className="text-center text-muted-foreground py-10 text-lg">
                  No movies found for "{searchTerm}". Try a different search.
                </p>
              )}
              <AnimatePresence>
                {searchResults.map((movie, index) => (
                  <motion.div
                    key={movie.id}
                    custom={index}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    layout
                  >
                    <Link href={`/movies/${movie.slug}`} passHref onClick={onClose}>
                      <div className="flex items-start p-3 -mx-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group">
                        <div className="relative w-20 h-28 sm:w-24 sm:h-36 mr-4 rounded-md overflow-hidden shadow-md shrink-0">
                          <Image
                            src={movie.poster || "https://placehold.co/200x300.png?text=No+Poster"}
                            alt={movie.title}
                            fill
                            sizes="(max-width: 640px) 80px, 96px"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            data-ai-hint="movie poster search"
                          />
                        </div>
                        <div className="flex-grow">
                          <h3 className="text-lg sm:text-xl font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                            {movie.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">{movie.year}</p>
                          {movie.genre && movie.genre.length > 0 && (
                            <div className="mt-1.5 flex flex-wrap gap-1.5">
                              {movie.genre.slice(0, 3).map(g => (
                                <Badge key={g} variant="secondary" className="text-xs px-1.5 py-0.5">{g}</Badge>
                              ))}
                            </div>
                          )}
                           <p className="text-xs text-muted-foreground mt-2 line-clamp-2 sm:line-clamp-3 leading-relaxed">
                            {movie.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                    {index < searchResults.length - 1 && <Separator className="my-2" />}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </ScrollArea>
           {/* DialogClose is automatically handled by the X button in DialogContent */}
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
