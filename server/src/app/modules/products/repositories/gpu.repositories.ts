import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GPU } from '../entities/gpu.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GpuRepository {
  constructor(
    @InjectRepository(GPU)
    private readonly gpuRepo: Repository<GPU>,
  ) {}

  async create(gpu: GPU): Promise<GPU> {
    return await this.gpuRepo.save(gpu);
  }

  async findAll(): Promise<GPU[]> {
    return await this.gpuRepo.find({
      relations: ['product'],
    });
  }

  async findById(id: number): Promise<GPU> {
    return this.gpuRepo.findOne({
      where: { id },
      relations: ['product'],
    });
  }

  async update(id: number, gpu: Partial<GPU>): Promise<void> {
    await this.gpuRepo.update(id, gpu);
  }

  async delete(id: number): Promise<void> {
    await this.gpuRepo.delete(id);
  }
}
