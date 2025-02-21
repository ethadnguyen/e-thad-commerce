import { CreateProductInput } from '../create-product.input';

export interface CreateGpuInput extends CreateProductInput {
  chipset: string;
  memory_size: number;
  memory_type: string;
  core_clock: number;
  boost_clock: number;
  min_psu_wattage: number;
  power_connector: string;
  tdp: number;
  pcie_version: string;
  slot_size: number;
  cuda_cores: number;
  tensor_cores: number;
  display_ports: string[];
  length: number;
}
