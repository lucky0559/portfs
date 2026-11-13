export type CardType = {
  name: string;
  from: string;
  imageURL: string;
  summary?: string;
  isPrivate?: boolean;
  isSaas?: boolean;
  role?: "Full-Stack" | "Frontend" | "Backend";
};
