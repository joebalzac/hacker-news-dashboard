import { useState } from "react";
import useNews from "../hooks/useNews";
import type { StoryType } from "../types/types";
import FilterBar from "./FilterBar";
import NewsFeed from "./NewsFeed";
import SearchBar from "./SearchBar";

const Dashboard = () => {
  const { stories, error, isLoading, fetchNewsStories } = useNews();
  const [selectedStoryType, setSelectedStoryType] = useState<StoryType>("top");

  const handleFilterChange = (filterType: string) => {
    setSelectedStoryType(filterType as StoryType);
    fetchNewsStories(filterType);
  };

  return (
    <div>
      <header className="py-20 sm:py-10">
        <h1 className="text-4xl sm:text-6xl font-black text-center sm:text-left text-transparent bg-clip-text bg-gradient-to-r from-gray-850 via-gray-700 to-blue-200">
          HackerNews
        </h1>
      </header>
      <div className="flex justify-center">
        <FilterBar
          activeFilter={selectedStoryType}
          onStoryChange={handleFilterChange}
        />
        <SearchBar />
      </div>
      <div>
        <NewsFeed stories={stories} error={error} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Dashboard;
