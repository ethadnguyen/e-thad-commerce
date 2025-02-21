import { SocketType } from '../../../enums/socket-type.enum';
import { CreateProductInput } from '../create-product.input';

export interface CreateCpuInput extends CreateProductInput {
  socket_type: SocketType;
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
  max_memory_capacity?: number;
}
