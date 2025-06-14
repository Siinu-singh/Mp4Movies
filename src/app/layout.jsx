
import './globals.css';
import { Inter } from 'next/font/google';
import { AppClientLayoutWrapper } from './app-client-layout-wrapper';
import { getMovies } from '@/lib/movie-service'; // Added import

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

// Metadata is exported from a Server Component
export const metadata = {
  title: {
    default: 'Mp4movies - Watch Movies Online',
    template: '%s | Mp4movies',
  },
  description: 'Your ultimate destination for streaming movies online. Discover a vast collection of films across genres.',
  openGraph: {
    title: 'Mp4movies - Watch Movies Online',
    description: 'Your ultimate destination for streaming movies online. Discover a vast collection of films across genres.',
    type: 'website',
    locale: 'en_US',
    url: 'https://mp4moviess.com', 
    siteName: 'Mp4movies',
     images: [
      {
        url: 'https://placehold.co/1200x630.png?text=Mp4movies', 
        width: 1200,
        height: 630,
        alt: 'Mp4movies',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mp4movies - Watch Movies Online',
    description: 'Your ultimate destination for streaming movies online. Discover a vast collection of films across genres.',
    // images: ['https://placehold.co/1200x630.png?text=Mp4movies'], // twitter:image is singular, image:alt is not a valid twitter property
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default async function RootLayout({ children }) { // Made RootLayout async
  const allMovies = await getMovies(); // Fetched movies

  return (
    <html lang="en" className={`${inter.variable} suppress-hydration-warning`}>
      <head>
        {/* Specific head tags managed by Next.js metadata API or can be added here if static and global */}
      </head>
      <body className="font-body antialiased bg-background text-foreground overflow-x-hidden">
        <AppClientLayoutWrapper allMovies={allMovies}> {/* Passed movies to wrapper */}
            {children}
        </AppClientLayoutWrapper>
      </body>
    </html>
  );
}

