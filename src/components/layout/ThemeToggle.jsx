'use client';

import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ThemeToggle({ isExpanded }) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="icon"
        className="w-full h-9 justify-start px-2 md:px-0 md:w-9 md:justify-center border-primary text-primary bg-background"
        disabled
      >
        <Sun className="h-[1.2rem] w-[1.2rem] text-primary" />
        {isExpanded && <span className="ml-3">Toggle Theme</span>}
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size={isExpanded ? "default" : "icon"}
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="w-full h-10 justify-start px-0 md:w-auto md:justify-center border-primary text-primary bg-background hover:bg-primary/80 transition-colors"
    >
      <div className="flex items-center w-full px-1">
        {theme === 'dark' ? (
          <Sun className="h-[1.2rem] w-[1.2rem] shrink-0" />
        ) : (
          <Moon className="h-[1.2rem] w-[1.2rem] shrink-0" />
        )}
        {isExpanded && (
          <span className="ml-3 whitespace-nowrap overflow-hidden">
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </span>
        )}
      </div>
    </Button>
  );
}
