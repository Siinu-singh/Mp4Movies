
'use client';

import { useState, useEffect } from 'react';
import TvCategorySection from '@/components/tvshows/TvCategorySection';
import TvShowGrid from '@/components/tvshows/TvShowGrid';
import TvShowSearch from '@/components/tvshows/TvShowSearch';
// Skeleton can be used if we add a client-side loading state, but for now,
// we rely on server-provided initial data.
// import { Skeleton } from "@/components/ui/skeleton";

export default function TvShowsClientContent({ initialShows, initialGenres }) {
  const [allTvShows, setAllTvShows] = useState(initialShows || []);
  const [filteredTvShows, setFilteredTvShows] = useState(initialShows || []);
  const [genres, setGenres] = useState(initialGenres || []);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    let showsToFilter = allTvShows;

    if (selectedGenre && selectedGenre !== "All Shows") {
      showsToFilter = showsToFilter.filter(show => show.genre && show.genre.includes(selectedGenre));
    }

    if (searchTerm) {
      showsToFilter = showsToFilter.filter(show =>
        show.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (show.description && show.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    setFilteredTvShows(showsToFilter);
  }, [selectedGenre, allTvShows, searchTerm]);

  const handleSelectGenre = (genre) => {
    setSelectedGenre(genre);
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };
  
  // If initialShows were not provided or empty (e.g., server-side fetch error)
  // This part will be rendered by the server if initialShows is empty.
  if (!initialShows || initialShows.length === 0) {
      return (
         <>
          <TvShowSearch
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
          />
          <TvCategorySection
            genres={[]} 
            selectedGenre={selectedGenre}
            onSelectGenre={handleSelectGenre}
          />
          <p className="text-center text-muted-foreground py-10 text-lg">
            No TV shows available at the moment. Please check back later.
          </p>
        </>
      );
  }

  return (
    <>
      <TvShowSearch
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
      />
      <TvCategorySection
        genres={genres}
        selectedGenre={selectedGenre}
        onSelectGenre={handleSelectGenre}
      />
      <TvShowGrid tvShows={filteredTvShows} />
    </>
  );
}
