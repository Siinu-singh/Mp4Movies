import tvshows from '@/data/tvshows.json';

export async function getTvShows() {
  return tvshows;
}

export async function getTvShowBySlug(slug) {
  return tvshows.find(show => show.slug === slug);
}
