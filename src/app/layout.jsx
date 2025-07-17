
import './globals.css';
import { Inter } from 'next/font/google';
import { AppClientLayoutWrapper } from './app-client-layout-wrapper';
import { getMovies } from '@/lib/movie-service'; // Added import

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});



export default async function RootLayout({ children }) { // Made RootLayout async
  const allMovies = await getMovies(); // Fetched movies

  return (
    <html lang="en" className={`${inter.variable} suppress-hydration-warning`}>
      <head>
      <meta name="robots" content="index, follow, noodp" />
        <meta name="googlebot" content="index, follow, noodp" />
      </head>
      <body className="font-body antialiased bg-background text-foreground overflow-x-hidden">
        <AppClientLayoutWrapper allMovies={allMovies}> {/* Passed movies to wrapper */}
            {children}
        </AppClientLayoutWrapper>
      </body>
    </html>
  );
}