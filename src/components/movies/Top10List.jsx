
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const listItemVariants = {
  initial: { opacity: 0, x: 20 },
  animate: (index) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: index * 0.1,
      type: 'spring',
      stiffness: 100,
      damping: 12,
    },
  }),
  hover: {
    scale: 1.03,
    backgroundColor: "hsl(var(--card) / 0.8)", 
    boxShadow: "0px 5px 15px hsl(var(--primary) / 0.1)",
    transition: { duration: 0.2 }
  }
};

function Top10ListItem({ movie, index }) {
  return (
    <motion.li
      custom={index}
      variants={listItemVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="mb-1 last:mb-0"
    >
      <Link href={`/movies/${movie.slug}`} className="flex items-center p-2.5 rounded-lg transition-colors">
        <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center text-xl font-bold text-primary mr-3">
          {movie.rank}
        </div>
        <div className="relative w-12 h-[72px] rounded overflow-hidden mr-3 flex-shrink-0">
          <Image
            src={movie.poster || "https://placehold.co/80x120.png?text=Poster"}
            alt={movie.title}
            fill
            className="object-cover"
            sizes="50px"
            data-ai-hint="movie poster small"
          />
        </div>
        <div className="flex-grow overflow-hidden">
          <h4 className="text-sm font-semibold text-foreground truncate">{movie.title}</h4>
          <p className="text-xs text-muted-foreground">{movie.genre?.slice(0, 2).join(', ')}</p>
          {movie.rating && (
            <div className="flex items-center text-xs text-yellow-400 mt-0.5">
              <Star size={12} className="mr-1 fill-current" />
              {movie.rating}
            </div>
          )}
        </div>
      </Link>
    </motion.li>
  );
}

export default function Top10List({ movies }) {
  const top10Movies = movies
    .filter(movie => movie.rank && movie.rank >= 1 && movie.rank <= 10)
    .sort((a, b) => a.rank - b.rank);

  if (!top10Movies.length) {
    return <div className="p-4 text-muted-foreground">Top 10 movies not available.</div>;
  }

  return (
    <div className="bg-card/50 backdrop-blur-sm rounded-xl shadow-lg flex flex-col max-h-[calc(80vh-2rem)]">
      {/* The h3 title was removed and is now handled by SectionHeader in the parent page */}
      <ScrollArea className="flex-grow p-2 pr-1"> 
        <ul className="space-y-1">
          {top10Movies.map((movie, index) => (
            <Top10ListItem key={movie.id} movie={movie} index={index} />
          ))}
        </ul>
      </ScrollArea>
    </div>
  );
}
