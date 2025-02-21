import { ApiProperty } from '@nestjs/swagger';
import { ProductRes } from '../product.res';

export class GpuRes extends ProductRes {
  @ApiProperty()
  chipset: string;

  @ApiProperty()
  memory_size: number;

  @ApiProperty()
  memory_type: string;

  @ApiProperty()
  min_psu_wattage: number;

  @ApiProperty()
  power_connector: string;

  @ApiProperty()
  core_clock: number;

  @ApiProperty()
  boost_clock: number;

  @ApiProperty()
  tdp: number;

  @ApiProperty()
  pcie_version: string;

  @ApiProperty()
  slot_size: number;

  @ApiProperty()
  cuda_cores: number;

  @ApiProperty()
  tensor_cores: number;

  @ApiProperty()
  display_ports: string;

  @ApiProperty()
  length: string;
}
