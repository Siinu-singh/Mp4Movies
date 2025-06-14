
import { getMovies } from '@/lib/movie-service';
import MovieGrid from '@/components/movies/MovieGrid';
import SectionTitle from '@/components/shared/SectionTitle';
import AnimatedPage from '@/components/shared/AnimatedPage';
import HeroCarousel from '@/components/home/HeroCarousel'; // New import

export const metadata = {
  title: 'Home',
  description: 'Welcome to Mp4movies - Your go-to source for the latest and greatest films. Explore our collection today!',
  alternates: {
    canonical: '/',
  },
};

export default async function HomePage() {
  const allMovies = await getMovies();
  const featuredMovies = allMovies.sort((a, b) => b.rating - a.rating).slice(0, 6);

  // Prepare data for the hero carousel slides
  // Using placeholder images but pulling titles/descriptions from movies.json
  const heroSlides = [
    {
      id: 'hero-slide-1',
      title: allMovies[0]?.title || 'Inception',
      description: allMovies[0]?.description ? allMovies[0].description.substring(0, 120) + '...' : 'Explore mind-bending realities and thrilling heists.',
      backgroundImage: 'https://images.unsplash.com/photo-1516373829531-29d21ac7f9d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxpbmNlcHRpb258ZW58MHx8fHwxNzQ5NTU3ODkxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      dataAiHint: 'diner retro crime', // Updated hint
    },
    {
      id: 'hero-slide-2',
      title: allMovies[1]?.title || 'The Dark Knight',
      description: allMovies[1]?.description ? allMovies[1].description.substring(0, 120) + '...' : 'Justice has a new face in a city plunged into chaos.',
      backgroundImage: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxtb3ZpZXN8ZW58MHx8fHwxNzQ5NTU3MjY0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      dataAiHint: 'night city gotham',
    },
    {
      id: 'hero-slide-3',
      title: allMovies[2]?.title || 'Pulp Fiction',
      description: allMovies[2]?.description ? allMovies[2].description.substring(0, 120) + '...' : 'Intertwining tales of crime, redemption, and iconic moments.',
      backgroundImage: 'https://placehold.co/1920x1080.png',
      dataAiHint: 'diner retro crime',
    }
  ];

  return (
    <AnimatedPage>
      {/* Full-width Hero Carousel */}
      <HeroCarousel slides={heroSlides} />

      {/* Container for the rest of the page content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        <section>
          <SectionTitle>Featured Movies</SectionTitle>
          <MovieGrid movies={featuredMovies} />
        </section>
      </div>
    </AnimatedPage>
  );
}

