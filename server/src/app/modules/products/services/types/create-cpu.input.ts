import { CreateProductInput } from './create-product.input';

export interface CreateCpuInput extends CreateProductInput {
  socketType: string;
  cores: number;
  threads: number;
  baseClock: number;
  boostClock: number;
  tdp: number;
  cache: string;
}
