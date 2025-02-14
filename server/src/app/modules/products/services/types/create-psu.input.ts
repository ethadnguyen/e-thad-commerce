import { ATX12VType } from '../../enums/atx12-type.enum';
import { ProtectionType } from '../../enums/protection-type.enum';
import { CreateProductInput } from './create-product.input';

export interface CreatePsuInput extends CreateProductInput {
  wattage: number;
  efficiency_rating: number;
  form_factor: string;
  modular: boolean;
  atx12vVersion: ATX12VType;
  protection_features: ProtectionType[];
  pcie_connectors: number;
  sata_connectors: number;
  eps_connectors: number;
}
