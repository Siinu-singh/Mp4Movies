
import { getMoviesByGenreSlug } from '@/lib/movie-service';
import { slugify } from '@/lib/utils';
import AnimatedPage from '@/components/shared/AnimatedPage';
import SectionTitle from '@/components/shared/SectionTitle';
import MovieGrid from '@/components/movies/MovieGrid';
import { notFound } from 'next/navigation';
import navigationData from '@/data/navigation.json';

// Helper to find genre/collection name from slug for display
function getDisplayNameFromSlug(slug) {
  const allNavItems = [...navigationData.genres, ...navigationData.featuredCollections];
  const item = allNavItems.find(it => it.slug === slug);
  return item ? item.name : slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

export async function generateMetadata({ params }) {
  const { genreSlug } = params;
  const displayName = getDisplayNameFromSlug(genreSlug);
  
  return {
    title: `${displayName} Movies`,
    description: `Browse ${displayName} movies on Mp4movies. Discover action, comedy, drama, and more.`,
    alternates: {
      canonical: `/genre/${genreSlug}`,
    },
    openGraph: {
      title: `${displayName} Movies | Mp4movies`,
      description: `Explore a wide variety of ${displayName} movies.`,
    },
  };
}


export default async function GenrePage({ params }) {
  const { genreSlug } = params;
  const movies = await getMoviesByGenreSlug(genreSlug);
  const genreName = getDisplayNameFromSlug(genreSlug);

  if (!movies || movies.length === 0) {
    // Optionally, you could show a "No movies found for this genre" message
    // instead of a 404, if the genre slug itself is valid.
    // For now, if no movies, it implies either bad slug or empty category.
    // If you want to check if slug is valid even if no movies:
    // const isValidSlug = [...navigationData.genres, ...navigationData.featuredCollections].some(g => g.slug === genreSlug);
    // if (!isValidSlug) notFound(); 
  }

  return (
    <AnimatedPage>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SectionTitle>
          {genreName}
          {movies.length > 0 && <span className="text-base text-muted-foreground ml-2">({movies.length} movies)</span>}
        </SectionTitle>
        {movies.length > 0 ? (
          <MovieGrid movies={movies} />
        ) : (
          <p className="text-center text-muted-foreground text-lg mt-8">
            No movies found for "{genreName}". Check back later or explore other genres!
          </p>
        )}
      </div>
    </AnimatedPage>
  );
}

