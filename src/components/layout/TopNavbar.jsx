
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Search, UserCircle, Sun, Moon, Settings, LogOut, LayoutGrid } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';
import SearchBar from './SearchBar.jsx'; // Explicitly add .jsx
import MobileSidebarToggle from './MobileSidebarToggle'; // Assuming this is used or will be

const COLLAPSED_SIDEBAR_WIDTH = 72; // px
const EXPANDED_SIDEBAR_WIDTH = 256; // px

export default function TopNavbar({ 
  isMobile, 
  isSidebarOpenOnMobile, 
  toggleMobileSidebar,
  isDesktopSidebarPinned 
}) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate left margin for top navbar based on desktop sidebar state
  const topNavLeftMargin = isMobile ? '0px' : (isDesktopSidebarPinned ? `${EXPANDED_SIDEBAR_WIDTH}px` : `${COLLAPSED_SIDEBAR_WIDTH}px`);
  const topNavWidth = isMobile ? '100%' : `calc(100% - ${topNavLeftMargin})`;


  return (
    <motion.header
      className={cn(
        "fixed top-0 h-16 flex items-center justify-between px-4 lg:px-6 shadow-md z-40",
        "bg-background text-foreground border-b border-border" 
      )}
      style={{
        left: isMobile ? '0px' : topNavLeftMargin,
        width: isMobile ? '100%' : topNavWidth,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="flex items-center gap-2">
        {isMobile && (
          <MobileSidebarToggle isOpen={isSidebarOpenOnMobile} onToggle={toggleMobileSidebar} />
        )}
        {!isMobile && (
           <Link href="/" className="text-xl font-bold font-headline text-primary">
            Mp4movies
          </Link>
        )}
      </div>

      <div className={cn("flex-grow flex justify-center items-center", isMobile ? "px-2" : "px-8")}>
        <SearchBar />
      </div>

      <div className="flex items-center gap-3">
        {mounted && (
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-full hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        )}
        <UserCircle size={24} className="text-muted-foreground hover:text-primary cursor-pointer" />
      </div>
    </motion.header>
  );
}
