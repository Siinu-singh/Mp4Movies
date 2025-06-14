
import { getMovieBySlug, getMovies } from '@/lib/movie-service';
import MovieDetails from '@/components/movies/MovieDetails';
import AnimatedPage from '@/components/shared/AnimatedPage';
import { notFound } from 'next/navigation';

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
      {/* MovieDetails now manages its own full-width backdrop and contained content below it */}
      <MovieDetails movie={movie} />
    </AnimatedPage>
  );
}
