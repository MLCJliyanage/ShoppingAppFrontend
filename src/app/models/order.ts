import { CartItem } from "./cartitem";

export interface Order {
    total: number;
    cartItems: CartItem [];
}