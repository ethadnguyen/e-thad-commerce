import { Injectable, NotFoundException } from '@nestjs/common';
import { GpuRepository } from '../repositories/gpu.repositories';
import { ProductService } from './products.service';
import { CreateGpuInput } from './types/gpu_types/create-gpu.input';
import { UpdateGpuInput } from './types/gpu_types/update-gpu.input';
import { ProductType } from '../enums/product-type.enum';
import { GPU } from '../entities/gpu.entity';
import { GetAllProductInput } from './types/get.all.product.input';
@Injectable()
export class GpuService {
  constructor(
    private readonly gpuRepo: GpuRepository,
    private readonly productService: ProductService,
  ) {}

  async getAllGPUs(queryParams: GetAllProductInput) {
    const { page = 1, size = 10, category_id } = queryParams;

    const [gpus, total] = await this.gpuRepo.findAll(
      {
        skip: (page - 1) * size,
        take: size,
      },
      category_id,
    );

    const totalPages = Math.ceil(total / size);

    return {
      total,
      totalPages,
      currentPage: page,
      gpus,
    };
  }

  async create(input: CreateGpuInput) {
    const product = await this.productService.createProduct({
      name: input.name,
      description: input.description,
      price: input.price,
      stock: input.stock,
      category_id: input.category_id,
      type: ProductType.GPU,
    });

    const gpu = new GPU();
    gpu.id = product.id;
    gpu.chipset = input.chipset;
    gpu.memory_size = input.memory_size;
    gpu.memory_type = input.memory_type;
    gpu.core_clock = input.core_clock;
    gpu.boost_clock = input.boost_clock;
    gpu.min_psu_wattage = input.min_psu_wattage;
    gpu.power_connector = input.power_connector;
    gpu.tdp = input.tdp;
    gpu.pcie_version = input.pcie_version;
    gpu.slot_size = input.slot_size;
    gpu.cuda_cores = input.cuda_cores;
    gpu.tensor_cores = input.tensor_cores;
    gpu.display_ports = input.display_ports.join(',');
    gpu.length = input.length;

    return await this.gpuRepo.create(gpu);
  }

  async update(input: UpdateGpuInput) {
    const gpu = await this.gpuRepo.findById(input.id);
    if (!gpu) {
      throw new NotFoundException(`GPU with id ${input.id} not found`);
    }

    if (input.chipset) gpu.chipset = input.chipset;
    if (input.memory_size) gpu.memory_size = input.memory_size;
    if (input.memory_type) gpu.memory_type = input.memory_type;
    if (input.core_clock) gpu.core_clock = input.core_clock;
    if (input.boost_clock) gpu.boost_clock = input.boost_clock;
    if (input.min_psu_wattage) gpu.min_psu_wattage = input.min_psu_wattage;
    if (input.power_connector) gpu.power_connector = input.power_connector;
    if (input.tdp) gpu.tdp = input.tdp;
    if (input.pcie_version) gpu.pcie_version = input.pcie_version;
    if (input.slot_size) gpu.slot_size = input.slot_size;
    if (input.cuda_cores) gpu.cuda_cores = input.cuda_cores;
    if (input.tensor_cores) gpu.tensor_cores = input.tensor_cores;
    if (input.display_ports) gpu.display_ports = input.display_ports.join(',');
    if (input.length) gpu.length = input.length;

    return await this.gpuRepo.update(input.id, gpu);
  }

  async findById(id: number) {
    const gpu = await this.gpuRepo.findById(id);
    if (!gpu) {
      throw new NotFoundException(`GPU with id ${id} not found`);
    }
    return gpu;
  }

  async delete(id: number) {
    const gpu = await this.gpuRepo.findById(id);
    if (!gpu) {
      throw new NotFoundException(`GPU with id ${id} not found`);
    }
    return await this.gpuRepo.delete(id);
  }
}
