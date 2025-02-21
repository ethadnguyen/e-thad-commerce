import { ApiProperty } from '@nestjs/swagger';
import { ProductRes } from '../product.res';
import { SocketType } from '../../../enums/socket-type.enum';
import { MainboardFormFactor } from '../../../enums/mainboard-type.enum';

export class MainboardRes extends ProductRes {
  @ApiProperty()
  socket_type: SocketType;

  @ApiProperty()
  form_factor: MainboardFormFactor;

  @ApiProperty()
  chipset: string;

  @ApiProperty()
  ram_slots: number;

  @ApiProperty()
  max_ram_capacity: number;

  @ApiProperty()
  pcie_slots: number;

  @ApiProperty()
  pcie_version: string;

  @ApiProperty()
  m2_slots: number;

  @ApiProperty()
  sata_slots: number;

  @ApiProperty()
  usb_ports: number;

  @ApiProperty()
  lan: string;

  @ApiProperty()
  wireless: string;

  @ApiProperty()
  audio: string;

  @ApiProperty()
  graphics_integrated: string;

  @ApiProperty()
  bios_version: string;

  @ApiProperty()
  rgb: boolean;

  @ApiProperty()
  size: string;
}
