
import { getMovies } from '@/lib/movie-service';
import AnimatedPage from '@/components/shared/AnimatedPage';
import MoviePageHero from '@/components/movies/MoviePageHero';
import SectionHeader from '@/components/movies/SectionHeader';
import MovieCard from '@/components/movies/MovieCard';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export const metadata = {
  title: 'Mp4Movies | Top Quality Movies At One Place |  Download Latest Movies At Single Place  | mp4moviess.com',
  description: ' Check out the latest movie releases from various genres. MP4Moviess provides the HD movies in MP4 format for immediate download.',
  alternates: {
    canonical: 'https://mp4moviess.com/movies',
  },
};


export default async function MoviesPage() {
  const allMovies = await getMovies();

  const heroCarouselMovies = allMovies
    .filter(movie => movie.isFeaturedHero || movie.rating >= 8.0) 
    .sort((a, b) => { 
        if (a.isFeaturedHero && !b.isFeaturedHero) return -1;
        if (!a.isFeaturedHero && b.isFeaturedHero) return 1;
        return (b.rating || 0) - (a.rating || 0);
    })
    .slice(0, 8); 

  const trendingMovies = allMovies.filter(movie => movie.isTrending).sort((a,b) => (b.rating || 0) - (a.rating || 0)).slice(0, 10);
  const latestMovies = allMovies.filter(movie => movie.isNew).sort((a,b) => new Date(b.releaseDate) - new Date(a.releaseDate)).slice(0, 10);
  const upcomingMovies = allMovies.filter(movie => movie.isUpcoming).sort((a,b) => new Date(a.releaseDate) - new Date(b.releaseDate)).slice(0, 10);
  
  const topRatedMovies = allMovies
    .filter(movie => movie.rating >= 8.5) // Define your criteria for "top rated"
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 10);

  const actionMovies = allMovies
    .filter(movie => movie.genre && movie.genre.map(g => g.toLowerCase()).includes("action"))
    .slice(0, 10);

  const scifiMovies = allMovies
    .filter(movie => movie.genre && movie.genre.map(g => g.toLowerCase()).includes("sci-fi"))
    .slice(0, 10);


  return (
    <AnimatedPage>
      {/* Full-width Hero Section */}
      {heroCarouselMovies.length > 0 && (
        <section className="mb-8 md:mb-12">
          <MoviePageHero movies={heroCarouselMovies} />
        </section>
      )}

      {/* Container for the rest of the page content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-8 md:space-y-12">
        {trendingMovies.length > 0 && (
          <section>
            <SectionHeader title="Trending Movies" viewAllLink="/genre/trending" /> {/* Assuming 'trending' can be a collection slug */}
            <ScrollArea className="w-full whitespace-nowrap rounded-md">
              <div className="flex space-x-4 pb-4">
                {trendingMovies.map((movie, index) => (
                  <div key={movie.id} className="w-[calc(50%-0.5rem)] md:w-[calc(33.33%-0.66rem)] lg:w-[calc(33.33%-0.66rem)] xl:w-[calc(25%-0.75rem)] flex-shrink-0">
                      <MovieCard movie={movie} index={index} />
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </section>
        )}

        {topRatedMovies.length > 0 && (
          <section>
            <SectionHeader title="Top Rated Movies" viewAllLink="/genre/top-rated" />
            <ScrollArea className="w-full whitespace-nowrap rounded-md">
              <div className="flex space-x-4 pb-4">
                {topRatedMovies.map((movie, index) => (
                  <div key={movie.id} className="w-[calc(50%-0.5rem)] md:w-[calc(33.33%-0.66rem)] lg:w-[calc(33.33%-0.66rem)] xl:w-[calc(25%-0.75rem)] flex-shrink-0">
                      <MovieCard movie={movie} index={index} />
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </section>
        )}

        {latestMovies.length > 0 && (
          <section>
            <SectionHeader title="Latest Movies" viewAllLink="/genre/new-releases" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 sm:gap-4 md:gap-6">
              {latestMovies.map((movie, index) => (
                <MovieCard key={movie.id} movie={movie} index={index} />
              ))}
            </div>
          </section>
        )}
        
        {actionMovies.length > 0 && (
          <section>
            <SectionHeader title="Action Packed" viewAllLink="/genre/action" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 sm:gap-4 md:gap-6">
              {actionMovies.map((movie, index) => (
                <MovieCard key={movie.id} movie={movie} index={index} />
              ))}
            </div>
          </section>
        )}

        {scifiMovies.length > 0 && (
          <section>
            <SectionHeader title="Sci-Fi Universe" viewAllLink="/genre/sci-fi" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 sm:gap-4 md:gap-6">
              {scifiMovies.map((movie, index) => (
                <MovieCard key={movie.id} movie={movie} index={index} />
              ))}
            </div>
          </section>
        )}

        {upcomingMovies.length > 0 && (
          <section>
            <SectionHeader title="Upcoming Movies" viewAllLink="/genre/upcoming" /> {/* Assuming 'upcoming' can be a collection slug */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 sm:gap-4 md:gap-6">
              {upcomingMovies.map((movie, index) => (
                <MovieCard key={movie.id} movie={movie} index={index} />
              ))}
            </div>
          </section>
        )}
        
        {/* Fallback if no specific sections have movies */}
        {heroCarouselMovies.length === 0 && trendingMovies.length === 0 && topRatedMovies.length === 0 && latestMovies.length === 0 && actionMovies.length === 0 && scifiMovies.length === 0 && upcomingMovies.length === 0 && (
            <section>
            <SectionHeader title="All Movies" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 sm:gap-4 md:gap-6">
              {allMovies.slice(0,18).map((movie, index) => ( // Increased fallback display count
                <MovieCard key={movie.id} movie={movie} index={index} />
              ))}
            </div>
          </section>
        )}
      </div>
    </AnimatedPage>
  );
}
