import { useState, useEffect } from "react";
import type { Story } from "../types/types";

const useNews = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const BASE_URL = import.meta.env.VITE_API_URL;

  const fetchNewsStories = async (type: string = "top") => {
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
      const limitedStories = data.slice(0, 20);
      const stories = await Promise.all(
        limitedStories.map(async (storyId: number) => {
          const story = await fetch(`${BASE_URL}/item/${storyId}.json`);
          return await story.json();
        })
      );

      setStories(stories);
    } catch (error) {
      if (error) {
        setError("an unknown error has occurred");
      }
    } finally {
      setIsLoading(false);
    }

    const searchStories = async (searchTerm: string) => {
      const res = await fetch(`$(BASE_URL)/search.json?query=${searchTerm}`);
      const data = await res.json();
      setStories(data);
    };

    searchStories(searchTerm);
    setIsLoading(false);
    setSearchTerm("");
  };

  useEffect(() => {
    fetchNewsStories("top");
  }, []);

  return { stories, error, isLoading, fetchNewsStories };
};

export default useNews;
