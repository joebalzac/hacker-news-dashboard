import type { Story } from "../types/types";
import { NewsPost } from "./NewsPost";
import StorySkeleton from "./StorySkeleton";

interface NewsFeedProps {
  stories: Story[];
  error: string;
  isLoading: boolean;
  loadMoreStories: () => void;
  hasMore: boolean;
}

const NewsFeed = ({
  stories,
  error,
  isLoading,
  loadMoreStories,
  hasMore,
}: NewsFeedProps) => {
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
    <div className="space-y-4">
      {stories.map((story) => (
        <NewsPost key={story.id} stories={story} />
      ))}

      {hasMore && (
        <button
          className="bg-gray-800 py-2 px-4 rounded-md text-gray-50 cursor-pointer hover:bg-gray-700 transition-all duration-200"
          onClick={loadMoreStories}
        >
          More...
        </button>
      )}
    </div>
  );
};

export default NewsFeed;
