import { ApiProperty } from '@nestjs/swagger';
import { ProductRes } from '../product.res';
import { SocketType } from '../../../enums/socket-type.enum';

export class CpuRes extends ProductRes {
  @ApiProperty()
  socket_type: SocketType;

  @ApiProperty()
  cores: number;

  @ApiProperty()
  threads: number;

  @ApiProperty()
  baseClock: number;

  @ApiProperty()
  boostClock: number;

  @ApiProperty()
  wattage: string;

  @ApiProperty()
  pCores: number;

  @ApiProperty()
  eCores: number;

  @ApiProperty()
  pCoreBaseClock: number;

  @ApiProperty()
  pCoreBoostClock: number;

  @ApiProperty()
  tdp: number;

  @ApiProperty()
  cache: string;

  @ApiProperty()
  pcie_version: string;

  @ApiProperty()
  pcie_slots: number;

  @ApiProperty()
  max_memory_capacity: number;
}
