
'use client';

import { useState, useEffect, useRef } from 'react'; // Added useState, useEffect
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Film,
  Tv,
  Signal,
  LibraryBig,
  Search,
  UserCircle,
  Settings,
  ChevronDown,
  Pin,
  PinOff
} from 'lucide-react';
import { cn } from '@/lib/utils';
import SidebarLogo from './SidebarLogo';
import SidebarItem from './SidebarItem';
import ThemeToggle from './ThemeToggle';
import navigationData from '@/data/navigation.json';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';


const COLLAPSED_WIDTH = 72; // px
const EXPANDED_WIDTH = 256; // px

export default function Sidebar({
  isMobileOpen: isSidebarOpenOnMobile,
  onMobileToggle,
  openSearchModal,
  isDesktopPinned,
  onDesktopPinToggle
}) {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);
  const [isGenresSubMenuOpen, setIsGenresSubMenuOpen] = useState(false);
  const sidebarRef = useRef(null);
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isEffectivelyExpanded = isMobile ? isSidebarOpenOnMobile : (isHovered || isDesktopPinned);

  const navItems = [
    { href: '/', label: 'Home', icon: LayoutDashboard },
    { href: '/movies', label: 'Movies', icon: Film },
    { href: '/tv-shows', label: 'TV Shows', icon: Tv },
    { href: '/live-tv', label: 'Live TV', icon: Signal },
  ];

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsHovered(false);
    }
  };

  const toggleGenresSubMenu = (e) => {
    e.stopPropagation();
    if (!isEffectivelyExpanded) {
        if (!isMobile && typeof onDesktopPinToggle === 'function') onDesktopPinToggle();
        else if (isMobile && typeof onMobileToggle === 'function') onMobileToggle();
        setTimeout(() => setIsGenresSubMenuOpen(true), 150);
    } else {
        setIsGenresSubMenuOpen(!isGenresSubMenuOpen);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobile && isSidebarOpenOnMobile && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        const toggleButton = document.querySelector('[aria-label="Close sidebar"], [aria-label="Open sidebar"]');
        if (toggleButton && toggleButton.contains(event.target)) {
          return;
        }
        if (typeof onMobileToggle === 'function') onMobileToggle();
        setIsGenresSubMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobile, isSidebarOpenOnMobile, onMobileToggle]);

  return (
    <>
      <motion.aside
        ref={sidebarRef}
        className={cn(
          "fixed top-0 left-0 h-screen z-50 flex flex-col bg-card text-card-foreground shadow-lg border-r border-border/50",
          mounted && isMobile && !isSidebarOpenOnMobile && "-translate-x-full",
          mounted && isMobile && isSidebarOpenOnMobile && "translate-x-0"
        )}
        initial={(!mounted || !isMobile) ? { width: COLLAPSED_WIDTH, x:0 } : { width: EXPANDED_WIDTH, x: (isSidebarOpenOnMobile ? 0 : -EXPANDED_WIDTH) }}
        animate={{
          width: (!mounted || !isMobile) ? (isEffectivelyExpanded ? EXPANDED_WIDTH : COLLAPSED_WIDTH) : EXPANDED_WIDTH,
          x: (!mounted || !isMobile) ? 0 : (isSidebarOpenOnMobile ? 0 : -EXPANDED_WIDTH),
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={cn(
            "relative flex items-center h-16 shrink-0 px-2 border-b border-border/50",
            // If not mounted, default to 'justify-center' which matches SSR.
            // After mount, dynamically apply 'justify-between' or 'justify-center'.
            !mounted ? "justify-center" : 
            (isEffectivelyExpanded ? "justify-between" : "justify-center")
        )}>
            <SidebarLogo isExpanded={isEffectivelyExpanded} />
            {mounted && !isMobile && typeof onDesktopPinToggle === 'function' && (
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onDesktopPinToggle}
                    className={cn(
                        "transition-all duration-200 text-muted-foreground hover:text-primary",
                        isEffectivelyExpanded 
                            ? "opacity-100 static" 
                            : "absolute top-1/2 -translate-y-1/2 right-2", 
                        (!isEffectivelyExpanded && !isDesktopPinned && isHovered)
                            ? "opacity-100" 
                            : (!isEffectivelyExpanded ? "opacity-0 pointer-events-none" : "") 
                    )}
                    aria-label={isDesktopPinned ? "Unpin sidebar" : "Pin sidebar"}
                    title={isDesktopPinned ? "Unpin sidebar" : "Pin sidebar"}
                >
                    {isDesktopPinned ? <PinOff size={18} /> : <Pin size={18} />}
                </Button>
            )}
        </div>

        <nav className={cn("flex-1 px-2 space-y-1 overflow-y-auto mt-4 hide-native-scrollbar")}>
          {navItems.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              text={item.label}
              isActive={pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))}
              isExpanded={isEffectivelyExpanded}
            />
          ))}

          <div>
            <SidebarItem
              icon={LibraryBig}
              text="Genres"
              isExpanded={isEffectivelyExpanded}
              onClick={toggleGenresSubMenu}
              hasSubMenu
              isSubMenuOpen={isGenresSubMenuOpen}
              isActive={pathname.startsWith('/genre')}
              className={pathname.startsWith('/genre') && !isEffectivelyExpanded ? "bg-primary/10" : ""}
            />
            <AnimatePresence>
              {isEffectivelyExpanded && isGenresSubMenuOpen && (
                <motion.ul
                  className="pl-5 overflow-hidden"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {navigationData.genres.map((genre) => (
                    <li key={genre.slug} className="py-0.5">
                      <SidebarItem
                        href={`/genre/${genre.slug}`}
                        text={genre.name}
                        isActive={pathname === `/genre/${genre.slug}`}
                        isExpanded={isEffectivelyExpanded}
                        isSubItem
                      />
                    </li>
                  ))}
                   {navigationData.featuredCollections.length > 0 && (
                    <li className="pt-2">
                        <span className="pl-3 text-xs font-semibold text-muted-foreground/70 tracking-wider">Collections</span>
                    </li>
                   )}
                   {navigationData.featuredCollections.map((collection) => (
                    <li key={collection.slug} className="py-0.5">
                      <SidebarItem
                        href={`/genre/${collection.slug}`}
                        text={collection.name}
                        isActive={pathname === `/genre/${collection.slug}`}
                        isExpanded={isEffectivelyExpanded}
                        isSubItem
                      />
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
          <SidebarItem
            icon={Search}
            text="Search"
            isExpanded={isEffectivelyExpanded}
            onClick={openSearchModal}
          />
        </nav>

        <div className="mt-auto p-2 space-y-2 border-t border-border/50">
           {/* <SidebarItem
            icon={UserCircle}
            text="Profile"
            isExpanded={isEffectivelyExpanded}
            onClick={() => {
              if (!isEffectivelyExpanded && !isMobile && typeof onDesktopPinToggle === 'function') {
                onDesktopPinToggle();
                setTimeout(() => alert('Profile clicked!'), 150);
              } else {
                alert('Profile clicked!');
              }
            }}
          /> */}
          <div className={cn("flex items-center justify-center h-10 px-1")}>
             <ThemeToggle isExpanded={isEffectivelyExpanded} />
          </div>
        </div>
      </motion.aside>
    </>
  );
}
