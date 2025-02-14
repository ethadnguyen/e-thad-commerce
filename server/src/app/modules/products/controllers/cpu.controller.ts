import { Body, Controller, Get, HttpCode, Post, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { CpuProductService } from '../services/cpu-product.service';
import { CreateCpuReq } from './types/create-cpu.req';
import { CpuRes } from './types/cpu.res';
import { UpdateCpuReq } from './types/update-cpu.req';

@Public()
@ApiTags('CPU')
@Controller('cpu')
export class CpuController {
  constructor(private readonly cpuService: CpuProductService) {}

  @Post()
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    type: CpuRes,
  })
  create(@Body() body: CreateCpuReq) {
    return this.cpuService.create(body);
  }

  @Get('all')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: CpuRes,
  })
  findAll() {
    return this.cpuService.findAllCPU();
  }

  @Put('/update')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: CpuRes,
  })
  update(@Body() body: UpdateCpuReq) {
    return this.cpuService.update(body);
  }
}
