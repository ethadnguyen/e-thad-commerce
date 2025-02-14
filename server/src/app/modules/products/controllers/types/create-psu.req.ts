import { ApiProperty } from '@nestjs/swagger';
import { ATX12VType } from '../../enums/atx12-type.enum';
import { ProtectionType } from '../../enums/protection-type.enum';
import { CreateProductReq } from './create-product.req';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePsuReq extends CreateProductReq {
  @ApiProperty()
  @IsNumber()
  wattage: number;

  @ApiProperty()
  @IsNumber()
  efficiency_rating: number;

  @ApiProperty()
  @IsString()
  form_factor: string;

  @ApiProperty()
  @IsBoolean()
  modular: boolean;

  @ApiProperty()
  @IsEnum(ATX12VType)
  atx12vVersion: ATX12VType;

  @ApiProperty()
  @IsArray()
  @IsEnum(ProtectionType, { each: true })
  @IsOptional()
  protection_features?: ProtectionType[];

  @ApiProperty()
  @IsNumber()
  pcie_connectors: number;

  @ApiProperty()
  @IsNumber()
  sata_connectors: number;

  @ApiProperty()
  @IsNumber()
  eps_connectors: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  fan_size?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  fan_speed?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  noise_level?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  fan_bearing?: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  rgb?: boolean;
}
