
'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: -20,
  },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
};

export default function AnimatedPage({ children }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Render a plain div on the server and during initial client hydration
    // This ensures content is visible even if JS is disabled.
    return <div>{children}</div>;
  }

  // Render with motion once mounted on the client
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out" // Note: exit animations might behave differently with this pattern
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
}
