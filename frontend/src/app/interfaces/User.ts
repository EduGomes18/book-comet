export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  created_at?: Date;
  updated_at?: Date;
  token?: string;
}
