export interface Story {
  by: string;
  descendants?: number;
  id: number;
  kids?: number[];
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
}

export interface Comment {
  id: number;
  by: string;
  time: number;
  text?: string;
  kids?: number[];
  parent: number;
}

export type StoryType = "top" | "new" | "best" | "ask" | "show" | "job";
