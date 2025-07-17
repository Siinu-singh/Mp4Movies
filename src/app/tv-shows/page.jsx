
import AnimatedPage from '@/components/shared/AnimatedPage';
import TvGradientHeading from '@/components/tvshows/TvGradientHeading';
import { getTvShows } from '@/lib/tvshow-service';
import TvShowsClientContent from './[slug]/TvShowsClientContent';


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

  return {
    title: 'Watch television shows online – full episodes at high quality | MP4Moviess',
    description: 'Download the latest movies in MP4 format on Mp4Movies. Enjoy HD Bollywood, Hollywood, South Indian, and more updated daily!',
    alternates: {
      canonical: 'https://mp4moviess.com/tv-shows',
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

