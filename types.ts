// FIX: Removed a circular import of `Page` from this file. A file cannot import from itself.

export enum Page {
  Home = 'HOME',
  Stickers = 'STICKERS',
  PhotoPrints = 'PHOTO_PRINTS',
  Login = 'LOGIN',
  SignUp = 'SIGN_UP',
  Checkout = 'CHECKOUT',
  Cart = 'CART',
  UserProfile = 'USER_PROFILE',
  Orders = 'ORDERS',
  Addresses = 'ADDRESSES',
  OrderConfirmation = 'ORDER_CONFIRMATION',
  Search = 'SEARCH',
  Admin = 'ADMIN',
  ProductDetail = 'PRODUCT_DETAIL',
}

export interface Product {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
  category: 'sticker' | 'photo';
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password?: string; // Password should not be stored in client-side state long-term
}

export interface ShippingDetails {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
}

export type OrderStatus = 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';


export interface Order {
    id: string;
    products: Product[];
    shippingDetails: ShippingDetails;
    orderDate: string;
    totalPrice: string;
    paymentMethod: string;
    status: OrderStatus;
}