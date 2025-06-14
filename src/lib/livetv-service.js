
import fs from 'fs/promises';
import path from 'path';

const liveTvFilePath = path.join(process.cwd(), 'src', 'data', 'liveTv.json');

export async function getLiveTvChannels() {
  try {
    const jsonData = await fs.readFile(liveTvFilePath, 'utf-8');
    const channels = JSON.parse(jsonData);
    return channels;
  } catch (error) {
    console.error("Failed to read or parse liveTv.json:", error);
    return []; 
  }
}

export function extractLiveTvCategories(channels) {
  if (!channels || channels.length === 0) {
    return [];
  }
  const allCategoriesSet = new Set();
  channels.forEach(channel => {
    if (channel.category) { // Assuming category is a string, not an array like in movies
      allCategoriesSet.add(channel.category);
    }
  });
  return Array.from(allCategoriesSet).sort();
}
