export enum ProductType {
  CPU = 'CPU',
  GPU = 'GPU',
  RAM = 'RAM',
  MAINBOARD = 'MAINBOARD',
  STORAGE = 'STORAGE',
  POWER_SUPPLY = 'POWER_SUPPLY',
  COOLING = 'COOLING',
  CASE = 'CASE',
}

export interface ProductReq {
  name: string;
  description: string;
  price: number;
  category_id: number | number[];
  images: string[];
  stock: number;
  type: ProductType;
  is_active: boolean;
  specifications: Record<string, any>;
}

export interface CPUReq {
  socket: string;
  cores: number;
  threads: number;
  baseClock: number;
  boostClock: number;
  wattage: number;
  pCores?: number;
  eCores?: number;
  pCoreBaseClock?: number;
  pCoreBoostClock?: number;
  eCoreBaseClock?: number;
  eCoreBoostClock?: number;
  tdp: number;
  cache: string;
  pcie_version: string;
  pcie_slots?: number;
  max_memory_capacity: number;
}
