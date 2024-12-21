import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from '../entities/customers.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { CreateCustomerDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateCustomerDto } from '../dto/update-user.dto';
import { Role } from '../../../../core/utils/roles';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    private configService: ConfigService,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    if (!createCustomerDto.roles) {
      createCustomerDto.roles = [Role.User];
    }

    createCustomerDto['password'] = await bcrypt.hash(
      createCustomerDto['password'],
      this.configService.get('GENERAL.salt_or_round'),
    );
    const newUser = this.customerRepository.create(createCustomerDto);
    return await this.customerRepository.save(newUser);
  }

  async findAll() {
    return await this.customerRepository.find();
  }

  async findOne(email: string) {
    return await this.customerRepository.findOne({ where: { email } });
  }

  async findOneById(id: number) {
    return await this.customerRepository.findOne({ where: { id } });
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return await this.customerRepository.update({ id }, updateCustomerDto);
  }

  async remove(id: number) {
    return await this.customerRepository.delete({ id });
  }

  async softDelete(id: number) {
    return await this.customerRepository.softDelete({ id });
  }

  async softDeleteMany(ids: number[]) {
    return await this.customerRepository.softDelete(ids);
  }

  async restore(id: number) {
    return await this.customerRepository.restore({ id });
  }

  async restoreMany(ids: number[]) {
    return await this.customerRepository.restore(ids);
  }
}
