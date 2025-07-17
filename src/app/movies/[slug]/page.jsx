
import { getMovieBySlug, getMovies } from '@/lib/movie-service';
// MovieDetails is now rendered by MovieDetailClientWrapper
import AnimatedPage from '@/components/shared/AnimatedPage';
import { notFound } from 'next/navigation';
import MovieDetailClientWrapper from './MovieDetailClientWrapper'; // Import the new wrapper

export async function generateStaticParams() {
  const movies = await getMovies();
  return movies.map((movie) => ({
    slug: movie.slug,
  }));
}

export async function generateMetadata({ params }) {
  const param = await params;
  const movie = await getMovieBySlug(param.slug);
  if (!movie) {
    return {
      title: 'Movie Not Found',
    };
  }
  return {
    title: `${movie.title} - Mp4Movies | ${movie.tagline}| Latest Movies Download | mp4moviess.com `,
    description: movie.description.substring(0, 160) + '...',
    alternates: {
      canonical: `https://mp4moviess.com/movies/${movie.slug}`,
    },
    openGraph: {
      title: `${movie.title} - Mp4Movies | Download Mp4Movies | Latest Movies Download | mp4moviess.com `,
      description: movie.description.substring(0, 160) + '...',
    },
    twitter: {
      card: 'summary_large_image',
      title: movie.title,
      description: movie.description.substring(0, 160) + '...',

    },
  };
}

export default async function MovieDetailPage({ params }) {
  const param = await params;
  const movie = await getMovieBySlug(param.slug);
// dsfas
  if (!movie) {
    return notFound();
  }

  return (
    <AnimatedPage>
      {/* Use the client wrapper to handle the delay and then render MovieDetails */}
      <MovieDetailClientWrapper movie={movie} />
    </AnimatedPage>
  );
}
