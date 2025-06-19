
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
  const movie = await getMovieBySlug(params.slug);
  if (!movie) {
    return {
      title: 'Movie Not Found',
    };
  }
  return {
    title: movie.title,
    description: movie.description.substring(0, 160) + '...',
    alternates: {
      canonical: `/movies/${movie.slug}`,
    },
    openGraph: {
      title: movie.title,
      description: movie.description.substring(0, 160) + '...',
      images: [
        {
          url: movie.poster || 'https://placehold.co/1200x630.png?text=Mp4movies',
          width: 1200, // Adjust if poster size is different
          height: 630, // Adjust if poster size is different
          alt: movie.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: movie.title,
      description: movie.description.substring(0, 160) + '...',
      // images: [movie.poster || 'https://placehold.co/1200x630.png?text=Mp4movies'],
    },
  };
}

export default async function MovieDetailPage({ params }) {
  const movie = await getMovieBySlug(params.slug);

  if (!movie) {
    notFound();
  }

  return (
    <AnimatedPage>
      {/* Use the client wrapper to handle the delay and then render MovieDetails */}
      <MovieDetailClientWrapper movie={movie} />
    </AnimatedPage>
  );
}
