export interface User {
  id: number;
  name: string;
  email: string;
  title: string;
  team: string;
  token: string;
  role?: string;
}