import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Version,
} from '@nestjs/common';
import { CustomersService } from '../services/users.service';
import { SkipAuth } from 'src/core/decorators/auth.decorator';
import { CreateCustomerDto } from '../types/create-user.input';
import { UpdateCustomerDto } from '../types/update-user.input';
import { Roles } from '../../../../core/decorators/role.decorators';
import { Role } from '../../../../core/utils/roles';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Version('1')
  @SkipAuth()
  @Post()
  async create(@Body() createCustomersDto: CreateCustomerDto) {
    return await this.customersService.create(createCustomersDto);
  }

  @Get()
  async findAll() {
    return await this.customersService.findAll();
  }

  @Get(':email')
  async findOne(@Param('email') email: string) {
    return await this.customersService.findOne(email);
  }

  @Get(':id')
  async findOneById(@Param('id') id: string) {
    return await this.customersService.findOneById(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return await this.customersService.update(+id, updateCustomerDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  async remove(@Param('id') id: string) {
    return await this.customersService.remove(+id);
  }

  @Delete('soft/:id')
  @Roles(Role.Admin)
  async softDelete(@Param('id') id: string) {
    return await this.customersService.softDelete(+id);
  }

  @Delete('soft/many')
  @Roles(Role.Admin)
  async softDeleteMany(@Body('ids') ids: number[]) {
    if (!Array.isArray(ids) || ids.length === 0) {
      throw new BadRequestException('IDs array is required.');
    }
    return await this.customersService.softDeleteMany(ids);
  }
}
