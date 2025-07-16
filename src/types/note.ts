

export type TPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export type TCategory = {
  id: string;
  authorId: string;
  name: string;
  color: string;
  createdAt: string; // or Date
  updatedAt: string; // or Date
};

export type TNote = {
  id: string;
  authorId: string;
  categoryId: string;
  title: string;
  content: string;
  priority: TPriority; // adjust if you use an enum
  isPinned: boolean;
  isArchived: boolean;
  isDeleted: boolean;
  images : []
  createdAt: string; // or Date
  updatedAt: string; // or Date
  category: TCategory;
};
