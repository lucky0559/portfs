export type CardType = {
  name: string;
  from: string;
  imageURL: string;
  isPrivate?: boolean;
  isSaas?: boolean;
  role?: "Full-Stack" | "Frontend" | "Backend";
};
