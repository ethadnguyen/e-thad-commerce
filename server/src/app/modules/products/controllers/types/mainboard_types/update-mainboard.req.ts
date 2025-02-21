import { ApiProperty } from '@nestjs/swagger';
import { UpdateProductReq } from '../update-product.req';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { MainboardFormFactor } from '../../../enums/mainboard-type.enum';
import { SocketType } from '../../../enums/socket-type.enum';

export class UpdateMainboardReq extends UpdateProductReq {
  @ApiProperty()
  @IsEnum(SocketType)
  @IsOptional()
  socket_type?: SocketType;

  @ApiProperty()
  @IsEnum(MainboardFormFactor)
  @IsOptional()
  form_factor?: MainboardFormFactor;

  @ApiProperty()
  @IsString()
  @IsOptional()
  chipset?: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  ram_slots?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  max_ram_capacity?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  pcie_slots?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  pcie_version?: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  m2_slots?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  sata_slots?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  usb_ports?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  lan?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  wireless?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  audio?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  graphics_integrated?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  bios_version?: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  rgb?: boolean;

  @ApiProperty()
  @IsString()
  @IsOptional()
  size?: string;
}
