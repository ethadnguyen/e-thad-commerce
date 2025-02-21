import { ApiProperty } from '@nestjs/swagger';
import { CreateProductReq } from '../create-product.req';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateGpuReq extends CreateProductReq {
  @ApiProperty()
  @IsString()
  chipset: string;

  @ApiProperty()
  @IsNumber()
  memory_size: number;

  @ApiProperty()
  @IsString()
  memory_type: string;

  @ApiProperty()
  @IsNumber()
  min_psu_wattage: number;

  @ApiProperty()
  @IsString()
  power_connector: string;

  @ApiProperty()
  @IsNumber()
  core_clock: number;

  @ApiProperty()
  @IsNumber()
  boost_clock: number;

  @ApiProperty()
  @IsNumber()
  tdp: number;

  @ApiProperty()
  @IsString()
  pcie_version: string;

  @ApiProperty()
  @IsNumber()
  slot_size: number;

  @ApiProperty()
  @IsNumber()
  cuda_cores: number;

  @ApiProperty()
  @IsNumber()
  tensor_cores: number;

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  display_ports: string[];

  @ApiProperty()
  @IsNumber()
  length: number;
}
