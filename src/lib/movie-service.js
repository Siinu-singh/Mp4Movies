
import fs from 'fs';
import path from 'path';
import { slugify } from './utils';

const moviesFilePath = path.join(process.cwd(), 'src', 'data', 'movies.json');

export async function getMovies() {
  try {
    const jsonData = await fs.promises.readFile(moviesFilePath, 'utf-8');
    const movies = JSON.parse(jsonData);
    return movies;
  } catch (error) {
    console.error("Failed to read or parse movies.json:", error);
    return []; // Return empty array on error
  }
}

export async function getMovieBySlug(slug) {
  const movies = await getMovies();
  const movie = movies.find((movie) => movie.slug === slug);
  return movie || null; // Return null if not found
}

export async function getMoviesByGenreSlug(genreSlug) {
  const movies = await getMovies();
  if (!genreSlug) return movies; // Or handle as an error/empty array

  // This is a simple implementation. For "Featured Collections" like "New Releases",
  // you might need more specific logic (e.g., checking isNew, releaseDate, or a dedicated "collections" field in movies.json)
  // For now, it tries to match the genreSlug against the movie's genres.
  
  // A more robust solution for collections would be to have a 'collections' array in movie objects or specific flags.
  // For simplicity, we'll check if the slug matches any slugified genre of the movie.
  // Or, if the collection slug matches a predefined logic (e.g. 'new-releases' checks movie.isNew)

  if (genreSlug === 'new-releases') {
    return movies.filter(movie => movie.isNew);
  }
  if (genreSlug === 'top-rated') {
    return movies.sort((a,b) => (b.rating || 0) - (a.rating || 0)).slice(0,20); // Example: top 20
  }
  // Add more custom logic for other 'Featured Collections' if needed.


  return movies.filter(movie => {
    if (movie.genre && Array.isArray(movie.genre)) {
      return movie.genre.some(g => slugify(g) === genreSlug);
    }
    return false;
  });
}
