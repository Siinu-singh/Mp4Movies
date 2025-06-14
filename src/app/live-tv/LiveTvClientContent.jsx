
'use client';

import { useState, useEffect } from 'react';
import LiveTvCategoryFilter from '@/components/livetv/LiveTvCategoryFilter';
import LiveTvGrid from '@/components/livetv/LiveTvGrid';
import LiveTvSearch from '@/components/livetv/LiveTvSearch';

export default function LiveTvClientContent({ initialChannels, initialCategories }) {
  const [allChannels, setAllChannels] = useState(initialChannels || []);
  const [filteredChannels, setFilteredChannels] = useState(initialChannels || []);
  const [categories, setCategories] = useState(initialCategories || []);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    let channelsToFilter = allChannels;

    if (selectedCategory && selectedCategory !== "All Channels") {
      channelsToFilter = channelsToFilter.filter(channel => channel.category === selectedCategory);
    }

    if (searchTerm) {
      channelsToFilter = channelsToFilter.filter(channel =>
        channel.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (channel.description && channel.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    setFilteredChannels(channelsToFilter);
  }, [selectedCategory, allChannels, searchTerm]);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };
  
  if (!initialChannels || initialChannels.length === 0) {
      return (
         <>
          <LiveTvSearch
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
          />
          <LiveTvCategoryFilter
            categories={[]} 
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
          />
          <p className="text-center text-muted-foreground py-10 text-lg">
            No Live TV channels available at the moment. Please check back later.
          </p>
        </>
      );
  }

  return (
    <>
      <LiveTvSearch
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
      />
      <LiveTvCategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
      />
      <LiveTvGrid channels={filteredChannels} />
    </>
  );
}
