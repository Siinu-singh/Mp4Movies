import Link from 'next/link';
import { Clapperboard } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-card shadow-inner py-8 mt-12 border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
          <Link href="/" className="flex items-center text-primary hover:opacity-80 transition-opacity">
            <Clapperboard size={32} className="mr-2" />
            <span className="text-2xl font-bold font-headline">
              Mp4movies
            </span>
          </Link>
          
          <nav className="flex flex-wrap justify-center items-center gap-x-5 sm:gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link>
          </nav>
        </div>
        
        <div className="text-center text-sm text-muted-foreground mt-8 pt-8 border-t border-border/20">
          <p>&copy; {currentYear} Mp4movies.com. All rights reserved.</p>
          <p className="text-xs mt-2">Your portal to an endless world of cinema.</p>
        </div>
      </div>
    </footer>
  );
}
