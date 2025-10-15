
// FIX: Removed a circular import of `Page` from this file. A file cannot import from itself.

export enum Page {
  Home = 'HOME',
  Stickers = 'STICKERS',
  PhotoPrints = 'PHOTO_PRINTS',
  Login = 'LOGIN',
  SignUp = 'SIGN_UP',
}

export interface Product {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
  category: 'sticker' | 'photo';
  description: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password?: string; // Password should not be stored in client-side state long-term
}
