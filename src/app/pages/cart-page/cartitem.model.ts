import { Product } from "../product/product.model";

export interface CartItem {
  cartItemId: number;
  productId: number;
  quantity: number;
  totalPrice: number;
  product: Product;
}
