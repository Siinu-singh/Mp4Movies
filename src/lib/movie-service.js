
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
    const newReleases =  movies.slice(0, 30);
     for (let i = newReleases.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newReleases[i], newReleases[j]] = [newReleases[j], newReleases[i]];
  }
  return newReleases
  }


  if (genreSlug === 'critically-acclaimed') {
    const newReleases =  movies.slice(0, 40);
     for (let i = newReleases.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newReleases[i], newReleases[j]] = [newReleases[j], newReleases[i]];
  }
  return newReleases
  }


  if (genreSlug === 'home-premiere') {
    const newReleases =  movies.slice(0, 40);
     for (let i = newReleases.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newReleases[i], newReleases[j]] = [newReleases[j], newReleases[i]];
  }
  return newReleases
  }

  if (genreSlug === 'action-adventure') {
    const newReleases =  movies.slice(0, 33);
     for (let i = newReleases.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newReleases[i], newReleases[j]] = [newReleases[j], newReleases[i]];
  }
  return newReleases
  }
  if (genreSlug === 'comedy') {
    const newReleases =  movies.slice(0, 37);
     for (let i = newReleases.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newReleases[i], newReleases[j]] = [newReleases[j], newReleases[i]];
  }
  return newReleases
  }
  if (genreSlug === 'documentary') {
    const newReleases =  movies.slice(0, 43);
     for (let i = newReleases.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newReleases[i], newReleases[j]] = [newReleases[j], newReleases[i]];
  }
  return newReleases
  }
  if (genreSlug === 'drama') {
    const newReleases =  movies.slice(0, 45);
     for (let i = newReleases.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newReleases[i], newReleases[j]] = [newReleases[j], newReleases[i]];
  }
  return newReleases
  }
  if (genreSlug === 'fantasy') {
    const newReleases =  movies.slice(0, 39);
     for (let i = newReleases.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newReleases[i], newReleases[j]] = [newReleases[j], newReleases[i]];
  }
  return newReleases
  }
  if (genreSlug === 'horror') {
    const newReleases =  movies.slice(0, 19);
     for (let i = newReleases.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newReleases[i], newReleases[j]] = [newReleases[j], newReleases[i]];
  }
  return newReleases
  }
  if (genreSlug === 'kids-family') {
    const newReleases =  movies.slice(0, 26);
     for (let i = newReleases.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newReleases[i], newReleases[j]] = [newReleases[j], newReleases[i]];
  }
  return newReleases
  }
  if (genreSlug === 'mystery-thrillers') {
    const newReleases =  movies.slice(0, 31);
     for (let i = newReleases.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newReleases[i], newReleases[j]] = [newReleases[j], newReleases[i]];
  }
  return newReleases
  }
  if (genreSlug === 'romance') {
    const newReleases =  movies.slice(0, 29);
     for (let i = newReleases.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newReleases[i], newReleases[j]] = [newReleases[j], newReleases[i]];
  }
  return newReleases
  }
  if (genreSlug === 'sci-fi') {
    const newReleases =  movies.slice(0, 36);
     for (let i = newReleases.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newReleases[i], newReleases[j]] = [newReleases[j], newReleases[i]];
  }
  return newReleases
  }


 if (genreSlug === 'top-rated') {
  const topRated = movies
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 35);

  // Deep shuffle using Fisher-Yates algorithm
  for (let i = topRated.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [topRated[i], topRated[j]] = [topRated[j], topRated[i]];
  }

  return topRated;
}


  return movies.filter(movie => {
    if (movie.genre && Array.isArray(movie.genre)) {
      return movie.genre.some(g => slugify(g) === slugify(genreSlug));
    }
    return false;
  });
}
