import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PSU } from '../entities/psu.entity';

@Injectable()
export class PsuRepository {
  constructor(
    @InjectRepository(PSU)
    private readonly psuRepo: Repository<PSU>,
  ) {}

  async create(psu: PSU): Promise<PSU> {
    return await this.psuRepo.save(psu);
  }

  async findAll(): Promise<PSU[]> {
    return await this.psuRepo
      .createQueryBuilder('psu')
      .leftJoinAndSelect('psu.product', 'product')
      .leftJoinAndSelect('product.category', 'category')
      .getMany();
  }

  async findById(id: number): Promise<PSU> {
    return await this.psuRepo
      .createQueryBuilder('psu')
      .leftJoinAndSelect('psu.product', 'product')
      .leftJoinAndSelect('product.category', 'category')
      .where('psu.id = :id', { id })
      .getOne();
  }

  async update(id: number, psu: Partial<PSU>): Promise<void> {
    await this.psuRepo.update(id, psu);
  }

  async delete(id: number): Promise<void> {
    await this.psuRepo.delete(id);
  }
}
