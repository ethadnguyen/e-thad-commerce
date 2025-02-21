import { ApiProperty } from '@nestjs/swagger';
import { CreateProductReq } from '../create-product.req';
import { MainboardFormFactor } from '../../../enums/mainboard-type.enum';
import { IsBoolean, IsEnum, IsNumber, IsString } from 'class-validator';
import { SocketType } from '../../../enums/socket-type.enum';

export class CreateMainboardReq extends CreateProductReq {
  @ApiProperty()
  @IsEnum(SocketType)
  socket_type: SocketType;

  @ApiProperty()
  @IsEnum(MainboardFormFactor)
  form_factor: MainboardFormFactor;

  @ApiProperty()
  @IsString()
  chipset: string;

  @ApiProperty()
  @IsNumber()
  ram_slots: number;

  @ApiProperty()
  @IsNumber()
  max_ram_capacity: number;

  @ApiProperty()
  @IsNumber()
  pcie_slots: number;

  @ApiProperty()
  @IsString()
  pcie_version: string;

  @ApiProperty()
  @IsNumber()
  m2_slots: number;

  @ApiProperty()
  @IsNumber()
  sata_slots: number;

  @ApiProperty()
  @IsNumber()
  usb_ports: number;

  @ApiProperty()
  @IsString()
  lan: string;

  @ApiProperty()
  @IsString()
  wireless: string;

  @ApiProperty()
  @IsString()
  audio: string;

  @ApiProperty()
  @IsString()
  graphics_integrated: string;

  @ApiProperty()
  @IsString()
  bios_version: string;

  @ApiProperty()
  @IsBoolean()
  rgb: boolean;

  @ApiProperty()
  @IsString()
  size: string;
}
