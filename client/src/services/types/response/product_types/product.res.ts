export type ProductCategory =
  | 'CPU'
  | 'MOTHERBOARD'
  | 'RAM'
  | 'GPU'
  | 'STORAGE'
  | 'PSU'
  | 'CASE'
  | 'COOLING';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: ProductCategory;
  image: string;
  specs: Record<string, any>;
}

export interface BuilderItem {
  product: Product;
  quantity: number;
}

export interface Compatibility {
  isCompatible: boolean;
  messages: string[];
}
