export type ViewingDeckProject = {
  name: string;
  from: string;
  imageURLs: string[];
  projectUrl: string;
  isPrivate?: boolean;
  isSaas?: boolean;
  description?: string;
  role?: "Full-Stack" | "Frontend" | "Backend";
};
