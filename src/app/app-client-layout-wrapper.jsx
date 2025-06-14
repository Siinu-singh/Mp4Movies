
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ThemeProvider } from '@/context/ThemeContext';
import Sidebar from '@/components/layout/Sidebar';
import MobileHeader from '@/components/layout/MobileHeader';
import Footer from '@/components/layout/Footer';
import { Toaster } from "@/components/ui/toaster";
import ScrollToTop from '@/components/shared/ScrollToTop';
import SearchModal from '@/components/search/SearchModal';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';


const COLLAPSED_WIDTH = 72; // px
const EXPANDED_WIDTH = 256; // px
const MOBILE_HEADER_HEIGHT = '4rem'; // h-16 (16 * 0.25rem = 4rem)

export function AppClientLayoutWrapper({ children, allMovies }) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isDesktopSidebarPinned, setIsDesktopSidebarPinned] = useState(false); // Default to unpinned
  const isMobile = useIsMobile();
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const toggleDesktopSidebarPin = () => {
    setIsDesktopSidebarPinned(!isDesktopSidebarPinned);
  };

  const openSearchModal = () => setIsSearchModalOpen(true);
  const closeSearchModal = () => setIsSearchModalOpen(false);

  const mainPaddingLeft = (mounted && isMobile)
    ? '0px' // Mobile: Sidebar overlays, so no padding for main content
    : isDesktopSidebarPinned
      ? `${EXPANDED_WIDTH}px` // Desktop: Sidebar pinned, main content shifts by expanded width
      : `${COLLAPSED_WIDTH}px`; // Desktop: Sidebar collapsed (or unpinned and hovered), main content shifts by collapsed width

  const mainStyle = {
    paddingLeft: mainPaddingLeft,
    paddingTop: (mounted && isMobile) ? MOBILE_HEADER_HEIGHT : '0px',
  };


  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <div className="flex min-h-screen relative">
        {mounted && isMobile && (
            <MobileHeader 
              isSidebarOpen={isMobileSidebarOpen} 
              onToggleSidebar={toggleMobileSidebar}
              onOpenSearchModal={openSearchModal} 
            />
        )}
        <Sidebar
          isMobileOpen={isMobileSidebarOpen}
          onMobileToggle={toggleMobileSidebar}
          openSearchModal={openSearchModal}
          isDesktopPinned={isDesktopSidebarPinned}
          onDesktopPinToggle={toggleDesktopSidebarPin}
        />

        <motion.main
          className={cn(
            "flex-grow flex flex-col overflow-x-hidden"
          )}
          style={mainStyle}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <div className="flex-grow">
            {children}
          </div>
          <Footer />
        </motion.main>
      </div>
      <Toaster />
      <ScrollToTop />
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={closeSearchModal}
        allMovies={allMovies}
      />
    </ThemeProvider>
  );
}
