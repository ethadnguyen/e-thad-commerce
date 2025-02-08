import { Category } from '../../../categories/entities/categories.entity';

export interface CreateProductInput {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: number;
  images?: string[];
  specifications?: object;
  is_active?: boolean;
}
