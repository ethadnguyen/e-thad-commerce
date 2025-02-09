import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CPU } from '../entities/cpu.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CpuRepository {
  constructor(
    @InjectRepository(CPU)
    private readonly cpuRepo: Repository<CPU>,
  ) {}

  async create(cpu: CPU): Promise<CPU> {
    return await this.cpuRepo.save(cpu);
  }

  async findAll(): Promise<CPU[]> {
    return await this.cpuRepo.find({
      relations: ['product'],
    });
  }

  async findById(id: number): Promise<CPU> {
    return this.cpuRepo.findOne({
      where: { id },
      relations: ['product'],
    });
  }

  async update(id: number, cpu: Partial<CPU>): Promise<void> {
    await this.cpuRepo.update(id, cpu);
  }

  async delete(id: number): Promise<void> {
    await this.cpuRepo.delete(id);
  }
}
