import { useState, useEffect } from "react";
import type { Story } from "../types/types";

const useNews = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [currentStoryType, setCurrentStoryType] = useState("top");

  const BASE_URL = import.meta.env.VITE_API_URL;

  const fetchNewsStories = async (type: string = "top", page: number = 0) => {
    setCurrentStoryType(type);
    const endpoints = {
      top: `${BASE_URL}/topstories.json`,
      new: `${BASE_URL}/newstories.json`,
      best: `${BASE_URL}/beststories.json`,
      ask: `${BASE_URL}/askstories.json`,
      show: `${BASE_URL}/showstories.json`,
      job: `${BASE_URL}/jobstories.json`,
    };

    try {
      setIsLoading(true);
      const res = await fetch(endpoints[type as keyof typeof endpoints]);
      const data = await res.json();
      const totalStories = data.length;
      const currentBatch = (page + 1) * 20;
      setHasMore(currentBatch < totalStories);
      console.log(
        "hasMore:",
        currentBatch < totalStories,
        "currentBatch:",
        currentBatch,
        "totalStories:",
        totalStories
      );
      const startIndex = page * 20;
      const endIndex = startIndex + 20;
      const limitedStories = data.slice(startIndex, endIndex);
      const stories = await Promise.all(
        limitedStories.map(async (storyId: number) => {
          const story = await fetch(`${BASE_URL}/item/${storyId}.json`);
          return await story.json();
        })
      );

      if (page === 0) {
        setStories(stories);
        setPage(0);
      } else {
        setStories((prevStories) => [...prevStories, ...stories]);
        console.log("stories.length after setStories:", stories.length);
      }

      return stories;
    } catch (error) { 
      if (error) {
        setError("an unknown error has occurred");
      }
    } finally {
      setIsLoading(false);
    }

    console.log("fetchNewsStories called, type:", type, "page:", page);
  };

  const loadMoreStories = async () => {
    setIsLoading(true);
    await fetchNewsStories(currentStoryType, page + 1);
    setPage((prev) => prev + 1);
    setIsLoading(false);
    console.log(
      "loadMoreStories called, currentStoryType:",
      currentStoryType,
      "page:",
      page
    );
  };

  useEffect(() => {
    fetchNewsStories("top");
  }, []);

  return {
    stories,
    searchTerm,
    setSearchTerm,
    error,
    isLoading,
    fetchNewsStories,
    loadMoreStories,
    hasMore,
  };
};

export default useNews;
