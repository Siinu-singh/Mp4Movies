import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-card shadow-inner py-8 mt-12">
      <div className="container mx-auto px-4 text-center text-muted-foreground">
        <div className="flex justify-center space-x-6 mb-4">
          <Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <Link href="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link>
          <Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link>
        </div>
        <p>&copy; {currentYear} Mp4movies.com. All rights reserved.</p>
        <p className="text-sm mt-2">Discover and enjoy your favorite movies anytime, anywhere.</p>
      </div>
    </footer>
  );
}
