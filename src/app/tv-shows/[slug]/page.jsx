import { getTvShowBySlug, getTvShows } from '@/lib/tvshow-service';
import AnimatedPage from '@/components/shared/AnimatedPage';
import { notFound } from 'next/navigation';
import TvShowDetailClientWrapper from './TvShowDetailClientWrapper';

export async function generateStaticParams() {
  const tvShows = await getTvShows();
  return tvShows.map((show) => ({
    slug: show.slug,
  }));
}

export async function generateMetadata({ params }) {
  const awaitedParams = await params;
  const tvShow = await getTvShowBySlug(awaitedParams.slug);
  if (!tvShow) {
    return {
      title: 'TV Show Not Found',
    };
  }
  return {
    title: `${tvShow.title} - Mp4Movies | ${tvShow.tagline || 'Popular TV Show'} | Latest TV Shows Download | mp4moviess.com`,
    description: tvShow.description.substring(0, 160) + '...',
    alternates: {
      canonical: `https://mp4moviess.com/tv-shows/${tvShow.slug}`,
    },
    openGraph: {
      title: `${tvShow.title} - Mp4Movies | Download TV Shows | Latest Episodes | mp4moviess.com`,
      description: tvShow.description.substring(0, 160) + '...',
    },
    twitter: {
      card: 'summary_large_image',
      title: tvShow.title,
      description: tvShow.description.substring(0, 160) + '...',
    },
  };
}

export default async function TvShowDetailPage({ params }) {
  const awaitedParams = await params;
  const tvShow = await getTvShowBySlug(awaitedParams.slug);
  if (!tvShow) {
    return notFound();
  }

  return (
    <AnimatedPage>
      <TvShowDetailClientWrapper tvShow={tvShow} />
    </AnimatedPage>
  );
}