export interface UserInterface {
  email: string;
  username: string;
  isAdmin: boolean;
  id: string;
}

export interface DatabaseUserInterface {
  email: string;
  username: string;
  password: string;
  isAdmin: boolean;
  _id: string;
}

export interface GameInterface {
  name: string;
  location: string;
  cover?: string;
  description?: string;
  price?: number;
  exchange?: string;
}
