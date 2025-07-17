
'use client';

import LiveTvChannelCard from './LiveTvChannelCard';
import { motion, AnimatePresence } from 'framer-motion';

const gridVariants = {
  initial: { opacity: 1 }, // Changed from hidden: { opacity: 0 }
  animate: { // Renamed from show and ensured opacity is 1
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function LiveTvGrid({ channels }) {
  if (!channels || channels.length === 0) {
    return <p className="text-center text-muted-foreground py-10 text-lg">No live channels match your criteria.</p>;
  }

  return (
    <motion.div
      key={channels.map(c => c.id).join('-')} 
      variants={gridVariants}
      initial="initial" // Changed from hidden
      animate="animate" // Changed from show
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-5 md:gap-6 lg:gap-8 pb-8"
    >
      <AnimatePresence>
        {channels.map((channel, index) => (
          <LiveTvChannelCard key={channel.id} channel={channel} index={index} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
