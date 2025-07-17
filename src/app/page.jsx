
import { getMovies } from '@/lib/movie-service';
import MovieGrid from '@/components/movies/MovieGrid';
import SectionTitle from '@/components/shared/SectionTitle';
import AnimatedPage from '@/components/shared/AnimatedPage';
import HeroCarousel from '@/components/home/HeroCarousel';
import HomePageContent from '@/components/home/HomePageContent'; 

export const metadata = {
  title: 'Mp4Movies 2025 | Download Free Latest Mp4Movies | Daily Updates',
  description: 'Download the latest movies in MP4 format on Mp4Movies. Enjoy HD Bollywood, Hollywood, South Indian, and more updated daily!',
  keywords: ['Mp4Movies', 'Download Movies', 'HD Movies', 'Bollywood Movies', 'Hollywood Movies', 'South Indian Movies'],
  alternates: {
    canonical: 'https://mp4moviess.com',
  },
  openGraph: {  // optional hai ye
    title: 'Mp4Movies 2025 | Download Free Latest Mp4Movies | Daily Updates',
    description: 'Download the latest movies in MP4 format on Mp4Movies. Enjoy HD Bollywood, Hollywood, South Indian, and more updated daily!',
    type: 'website',
    locale: 'en_US',
    url: 'https://mp4moviess.com', 
    siteName: 'Mp4Movies',
  },
};


export default async function HomePage() {
  const allMovies = await getMovies();
  
  const featuredMovies = allMovies
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 6);

  const trendingMovies = allMovies
    .filter(movie => movie.isTrending)
    .sort((a,b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 6);

  const latestMovies = allMovies
    .filter(movie => movie.isNew)
    .sort((a,b) => new Date(b.releaseDate) - new Date(a.releaseDate))
    .slice(0, 6);
  
  const topRatedMovies = allMovies
    .filter(movie => movie.rating && movie.rating >= 8.5)
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 6);

  const heroSlides = [
    {
      id: 'hero-slide-1',
      title: allMovies[0]?.title || 'Inception',
      description: allMovies[0]?.description ? allMovies[0].description.substring(0, 120) + '...' : 'Explore mind-bending realities and thrilling heists.',
      backgroundImage: allMovies[0]?.backdrop_path || 'https://res.cloudinary.com/dquhsepae/image/upload/v1750229662/Inception_xolvcz.jpg',
      dataAiHint: 'diner retro crime',
      slug: allMovies[0]?.slug || 'inception'
    },
    {
      id: 'hero-slide-2',
      title: allMovies[1]?.title || 'The Dark Knight',
      description: allMovies[1]?.description ? allMovies[1].description.substring(0, 120) + '...' : 'Justice has a new face in a city plunged into chaos.',
      backgroundImage: allMovies[1]?.backdrop_path || 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxtb3ZpZXN8ZW58MHx8fHwxNzQ5NTU3MjY0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      dataAiHint: 'night city gotham',
      slug: allMovies[1]?.slug || 'the-dark-knight'
    },
    {
      id: 'hero-slide-3',
      title: allMovies[2]?.title || 'Pulp Fiction',
      description: allMovies[2]?.description ? allMovies[2].description.substring(0, 120) + '...' : 'Intertwining tales of crime, redemption, and iconic moments.',
      backgroundImage: allMovies[2]?.backdrop_path || 'https://res.cloudinary.com/dquhsepae/image/upload/v1750229134/TGF_xiu6mw.jpg',
      dataAiHint: 'diner retro crime',
      slug: allMovies[2]?.slug || 'pulp-fiction'
    }
  ];

  return (
    <AnimatedPage>
      <HeroCarousel slides={heroSlides} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-8 sm:space-y-12">
        {featuredMovies.length > 0 && (
          <section>
            <SectionTitle>Featured Movies</SectionTitle>
            <MovieGrid movies={featuredMovies} />
          </section>
        )}

        {trendingMovies.length > 0 && (
          <section>
            <SectionTitle>Trending Now</SectionTitle>
            <MovieGrid movies={trendingMovies} />
          </section>
        )}

        {latestMovies.length > 0 && (
          <section>
            <SectionTitle>Latest Releases</SectionTitle>
            <MovieGrid movies={latestMovies} />
          </section>
        )}

        {topRatedMovies.length > 0 && (
          <section>
            <SectionTitle>Top Rated</SectionTitle>
            <MovieGrid movies={topRatedMovies} />
          </section>
        )}
      </div>
      <HomePageContent />
    </AnimatedPage>
  );
}
