import { Body, Controller, Get, HttpCode, Post, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { PsuProductService } from '../services/psu-product.service';
import { CreatePsuReq } from './types/create-psu.req';
import { PsuRes } from './types/psu.res';
import { UpdatePsuReq } from './types/update-psu.req';

@Public()
@ApiTags('PSU')
@Controller('psu')
export class PsuController {
  constructor(private readonly psuService: PsuProductService) {}

  @Post()
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    type: PsuRes,
  })
  create(@Body() body: CreatePsuReq) {
    return this.psuService.create(body);
  }

  @Get('all')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: [PsuRes],
  })
  findAll() {
    return this.psuService.findAll();
  }

  @Put('/update')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: PsuRes,
  })
  update(@Body() body: UpdatePsuReq) {
    return this.psuService.update(body);
  }
}
