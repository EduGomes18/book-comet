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
  inventory: {
    id?: number;
    quantity: number;
    created_at?: Date;
    updated_at?: Date;
  };
  publisher: string;
  type: string;
  extension: string;
  publishedYear: number;
  summary: string;
  created_at: Date;
}
