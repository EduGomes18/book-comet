export interface Books {
  id: number;
  title: string;
  description: string;
  keywords: [string];
  author: {
    id: number;
    name: string;
    surname: string;
  };
  publisher: string;
  type: string;
  extension: string;
  publishedYear: number;
  summary: string;
  created_at: Date;
}
