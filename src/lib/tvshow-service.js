
import fs from 'fs';
import path from 'path';

const tvShowsFilePath = path.join(process.cwd(), 'src', 'data', 'tvshows.json');

export async function getTvShows() {
  try {
    const jsonData = await fs.promises.readFile(tvShowsFilePath, 'utf-8');
    const tvShows = JSON.parse(jsonData);
    return tvShows;
  } catch (error) {
    console.error("Failed to read or parse tvshows.json:", error);
    return [];
  }
}

export async function getTvShowById(id) {
  const tvShows = await getTvShows();
  const tvShow = tvShows.find((show) => show.id === id);
  return tvShow || null;
}
