import { MainboardFormFactor } from '../../../enums/mainboard-type.enum';
import { SocketType } from '../../../enums/socket-type.enum';
import { CreateProductInput } from '../create-product.input';

export interface CreateMainboardInput extends CreateProductInput {
  socket_type: SocketType;
  form_factor: MainboardFormFactor;
  chipset: string;
  ram_slots: number;
  max_ram_capacity: number;
  pcie_slots: number;
  pcie_version: string;
  m2_slots: number;
  sata_slots: number;
  usb_ports: number;
  lan: string;
  wireless: string;
  audio: string;
  graphics_integrated: string;
  bios_version: string;
  rgb: boolean;
  size: string;
}
