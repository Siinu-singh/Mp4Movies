
import AnimatedPage from '@/components/shared/AnimatedPage';
import TvGradientHeading from '@/components/tvshows/TvGradientHeading';
import { getTvShows } from '@/lib/tvshow-service';
import TvShowsClientContent from './TvShowsClientContent';

// Helper function to extract genres on the server
function extractAllGenres(tvShows) {
  if (!tvShows || tvShows.length === 0) {
    return [];
  }
  const allGenresSet = new Set();
  tvShows.forEach(show => {
    if (show.genre && Array.isArray(show.genre)) {
      show.genre.forEach(g => allGenresSet.add(g));
    }
  });
  return Array.from(allGenresSet).sort();
}

export async function generateMetadata({ searchParams }) {
  // Basic metadata, can be expanded later if needed
  return {
    title: 'TV Shows | Mp4movies',
    description: 'Discover and watch a wide variety of TV shows on Mp4movies. Browse by genre or search for your favorites.',
    alternates: {
      canonical: '/tv-shows',
    },
    openGraph: {
      title: 'TV Shows | Mp4movies',
      description: 'Explore our extensive library of TV series.',
    },
  };
}

export default async function TvShowsPage() {
  const allTvShowsInitial = await getTvShows();
  const genresInitial = extractAllGenres(allTvShowsInitial);

  return (
    <AnimatedPage>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <TvGradientHeading text="Discover TV Shows" />
        <TvShowsClientContent
          initialShows={allTvShowsInitial}
          initialGenres={genresInitial}
        />
      </div>
    </AnimatedPage>
  );
}

