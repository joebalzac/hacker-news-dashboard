import type { Story } from "../types/types";
import { NewsPost } from "./NewsPost";
import StorySkeleton from "./StorySkeleton";

interface NewsFeedProps {
  stories: Story[];
  error: string;
  isLoading: boolean;
}

const NewsFeed = ({ stories, error, isLoading }: NewsFeedProps) => {
  if (isLoading) {
    return (
      <div>
        {Array.from({ length: 10 }).map((_, index) => (
          <StorySkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) return <div>An unknown error has occurred</div>;

  return (
    <div>
      {stories.map((story) => (
        <NewsPost key={story.id} stories={story} />
      ))}
    </div>
  );
};

export default NewsFeed;
