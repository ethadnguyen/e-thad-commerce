import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CPU } from '../entities/cpu.entity';
import { CreateCpuInput } from './types/create-cpu.input';
import { CpuRepository } from '../repositories/cpu.repositories';
import { UpdateCpuInput } from './types/update-cpu.input';
import { ProductService } from './products.service';
import { ProductType } from '../enums/product-type.enum';

@Injectable()
export class CpuProductService {
  constructor(
    private readonly cpuRepo: CpuRepository,
    private readonly productService: ProductService,
  ) {}

  async findAllCPU() {
    return await this.cpuRepo.findAll();
  }

  async create(input: CreateCpuInput) {
    // Tạo product trước
    const product = await this.productService.createProduct({
      name: input.name,
      description: input.description,
      price: input.price,
      stock: input.stock,
      category: input.category,
      images: input.images,
      is_active: input.is_active,
      type: ProductType.CPU,
    });

    // Sau đó tạo CPU với id từ product
    const cpu = new CPU();
    cpu.id = product.id;
    cpu.socketType = input.socketType;
    cpu.cores = input.cores;
    cpu.threads = input.threads;
    cpu.baseClock = input.baseClock;
    cpu.boostClock = input.boostClock;
    cpu.cache = input.cache;
    cpu.tdp = input.tdp;
    cpu.product = product;

    return await this.cpuRepo.create(cpu);
  }

  async update(input: UpdateCpuInput) {
    const cpu = await this.cpuRepo.findById(input.id);
    if (!cpu) {
      throw new NotFoundException(`CPU with id ${input.id} not found`);
    }

    // Update product info
    await this.productService.updateProduct({
      id: input.id,
      name: input.name,
      description: input.description,
      price: input.price,
      stock: input.stock,
      category: input.category,
      images: input.images,
      is_active: input.is_active,
    });

    // Update CPU info
    if (input.socketType) cpu.socketType = input.socketType;
    if (input.cores) cpu.cores = input.cores;
    if (input.threads) cpu.threads = input.threads;
    if (input.baseClock) cpu.baseClock = input.baseClock;
    if (input.boostClock) cpu.boostClock = input.boostClock;
    if (input.cache) cpu.cache = input.cache;
    if (input.tdp) cpu.tdp = input.tdp;

    return await this.cpuRepo.update(input.id, cpu);
  }

  async findById(id: number) {
    const cpu = await this.cpuRepo.findById(id);
    if (!cpu) {
      throw new NotFoundException(`CPU with id ${id} not found`);
    }
    return cpu;
  }
}
