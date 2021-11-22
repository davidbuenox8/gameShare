export interface UserInterface {
  id: string;
  email: string;
  username: string;
  isAdmin: boolean;
}

export interface GameInterface {
  name: string;
  location: string;
  cover?: string;
  description?: string;
  price?: number;
  exchange?: string;
}
