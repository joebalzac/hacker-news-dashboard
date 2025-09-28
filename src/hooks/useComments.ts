import { useEffect, useState } from "react";
import type { Comment } from "../types/types";

type Props = {
  storyId: number;
};
export const useComments = ({ storyId }: Props) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const BASE_URL = import.meta.env.VITE_API_URL;

  const fetchComments = async () => {
    try {
      const storyRes = await fetch(`${BASE_URL}/item/${storyId}.json`);
      const story = await storyRes.json();

      if (!story.kids) {
        setComments([]);
        return;
      }

      const comments = await Promise.all(
        story.kids.map(async (commentId: number) => {
          const commentRes = await fetch(`${BASE_URL}/item/${commentId}.json`);
          return await commentRes.json();
        })
      );

      setComments(comments.filter((comment) => comment && comment.text));
    } catch (error) {
      setError("Failed to fetch comments");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [storyId]);

  return { comments, error, isLoading };
};
