
// This is a temporary API route to serve tvshows.json for client-side fetching in TvShowsPage.
// In a real application, you might have more complex logic here or use a database.
// This route will be mapped by the rewrite in next.config.js.

import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function GET() {
  try {
    const tvShowsFilePath = path.join(process.cwd(), 'src', 'data', 'tvshows.json');
    const jsonData = await fs.readFile(tvShowsFilePath, 'utf-8');
    const tvShows = JSON.parse(jsonData);
    return NextResponse.json(tvShows);
  } catch (error) {
    console.error("API Error - Failed to read or parse tvshows.json:", error);
    return NextResponse.json({ message: 'Error fetching TV shows data', error: error.message }, { status: 500 });
  }
}
