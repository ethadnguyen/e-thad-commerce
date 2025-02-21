import type { Product } from './product';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface PaymentMethod {
  type: 'credit_card' | 'bank_transfer' | 'cod';
  details?: Record<string, string>;
}

export interface Order {
  items: CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  subtotal: number;
  shippingFee: number;
  total: number;
}
