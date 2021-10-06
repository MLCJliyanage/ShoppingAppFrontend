import { Product } from "./product";

export interface CartItem {
    quentity: number;
    productId: number;
    product: Product;
}