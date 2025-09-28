import { useState } from "react";
import { useComments } from "../hooks/useComments";
import type { Story } from "../types/types";
import { formatTimeAgo } from "../utils/formatTime";
import { FaHeart, FaComment, FaClock, FaUser } from "react-icons/fa";

type NewsProps = {
  stories: Story;
};

export const NewsPost = ({ stories }: NewsProps) => {
  const { comments, error, isLoading } = useComments({ storyId: stories.id });
  const [showComments, setShowComments] = useState(false);
  const [expandedComments, setExpandedComments] = useState<Set<number>>(
    new Set()
  );

  if (isLoading) return <div>Loading....</div>;

  if (error)
    return (
      <div>
        <p className="text-red-600 text-sm">Failed to load comments</p>
      </div>
    );

  const handleShowComments = () => {
    setShowComments(!showComments);
  };

  const handleToggleComment = (commentId: number) => {
    setExpandedComments((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(commentId)) {
        newSet.delete(commentId);
      } else {
        newSet.add(commentId);
      }
      return newSet;
    });
  };

  return (
    <article className="bg-gray-950 rounded-lg hover:shadow-sm transition-all duration-200 p-6 mb-4">
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-100 leading-tight">
          <a
            href={stories.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-100 hover:text-gray-300 transition-colors duration-200"
          >
            {stories.title}
          </a>
        </h2>

        {/* Meta information */}
        <div className="flex items-center space-x-4 text-sm text-gray-400">
          <div className="flex items-center space-x-1">
            <FaHeart className="w-4 h-4" />
            <span className="font-medium">{stories.score}</span>
            <span>points</span>
          </div>

          <div className="cursor-pointer flex items-center space-x-1">
            <FaComment className="w-4 h-4" />
            <button
              onClick={handleShowComments}
              className="cursor-pointer hover:text-gray-100 transition-colors duration-200"
            >
              {comments.length} comments
            </button>
          </div>

          <div className="flex items-center space-x-1">
            <FaClock className="w-4 h-4" />
            <span>{formatTimeAgo(stories.time)}</span>
          </div>

          <div className="flex items-center space-x-1">
            <FaUser className="w-4 h-4" />
            <span>by {stories.by}</span>
          </div>
        </div>

        {showComments && (
          <div className="mt-6 pt-4">
            <div className="space-y-4">
              {comments.length === 0 ? (
                <p className="text-gray-500 text-sm italic">No comments yet</p>
              ) : (
                comments.map((comment) => {
                  const isExpanded = expandedComments.has(comment.id);
                  const text = comment.text || "";
                  const isLong = text.length > 160;

                  return (
                    <div
                      key={comment.id}
                      className="bg-gray-900 rounded-lg p-4"
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm font-medium text-gray-100">
                          {comment.by}
                        </span>
                        <span className="text-xs text-gray-100">•</span>
                        <span className="text-xs text-gray-100">
                          {formatTimeAgo(comment.time)}
                        </span>
                      </div>

                      <div className="text-sm text-gray-100 leading-relaxed">
                        {isExpanded
                          ? text
                          : isLong
                          ? text.slice(0, 160) + "..."
                          : text}
                      </div>

                      {isLong && (
                        <button
                          onClick={() => handleToggleComment(comment.id)}
                          className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200 mt-2"
                        >
                          {isExpanded ? "Show less" : "Show more"}
                        </button>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>
    </article>
  );
};
