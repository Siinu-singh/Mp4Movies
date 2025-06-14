
'use client';

import Link from 'next/link';
import { Clapperboard, Menu, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function MobileHeader({ isSidebarOpen, onToggleSidebar, onOpenSearchModal }) {
  return (
    <div className={cn(
      "md:hidden fixed top-0 left-0 right-0 h-16 bg-background text-card-foreground shadow-md z-[51] flex items-center justify-between px-4 border-b border-border/50"
    )}>
      {/* Left: Hamburger Menu */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggleSidebar}
        aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
        className="text-foreground hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary focus-visible:ring-primary"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </Button>

      {/* Center: Logo and App Name */}
      <Link href="/" className="flex items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Clapperboard size={28} className="text-primary mr-2" />
        <span className="font-bold text-lg text-primary font-headline">
          Mp4movies
        </span>
      </Link>

      {/* Right: Search Icon */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onOpenSearchModal}
        aria-label="Open search"
        className="text-foreground hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary focus-visible:ring-primary"
      >
        <Search size={22} />
      </Button>
    </div>
  );
}
