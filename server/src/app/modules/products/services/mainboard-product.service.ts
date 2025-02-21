import { Injectable, NotFoundException } from '@nestjs/common';
import { MainboardRepository } from '../repositories/mainboard.repositories';
import { CreateMainboardInput } from './types/mainboard_types/create-mainboard.input';
import { ProductService } from './products.service';
import { ProductType } from '../enums/product-type.enum';
import { Mainboard } from '../entities/mainboard.entity';
import { UpdateMainboardInput } from './types/mainboard_types/update-mainboard.input';
import { GetAllProductInput } from './types/get.all.product.input';

@Injectable()
export class MainboardService {
  constructor(
    private readonly mainboardRepo: MainboardRepository,
    private readonly productService: ProductService,
  ) {}

  async getAllMainboards(queryParams: GetAllProductInput) {
    const { page = 1, size = 10, category_id } = queryParams;

    const [mainboards, total] = await this.mainboardRepo.findAll(
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
      mainboards,
    };
  }

  async create(input: CreateMainboardInput) {
    const product = await this.productService.createProduct({
      type: ProductType.MAINBOARD,
      name: input.name,
      description: input.description,
      price: input.price,
      stock: input.stock,
      category_id: input.category_id,
      images: input.images,
      is_active: input.is_active,
    });

    const mainboard = new Mainboard();
    mainboard.id = product.id;
    mainboard.socket_type = input.socket_type;
    mainboard.form_factor = input.form_factor;
    mainboard.chipset = input.chipset;
    mainboard.ram_slots = input.ram_slots;
    mainboard.max_ram_capacity = input.max_ram_capacity;
    mainboard.pcie_slots = input.pcie_slots;
    mainboard.pcie_version = input.pcie_version;
    mainboard.m2_slots = input.m2_slots;
    mainboard.sata_slots = input.sata_slots;
    mainboard.usb_ports = input.usb_ports;
    mainboard.lan = input.lan;
    mainboard.wireless = input.wireless;
    mainboard.audio = input.audio;
    mainboard.graphics_integrated = input.graphics_integrated;
    mainboard.bios_version = input.bios_version;
    mainboard.rgb = input.rgb;
    mainboard.size = input.size;

    return await this.mainboardRepo.create(mainboard);
  }

  async update(input: UpdateMainboardInput) {
    const mainboard = await this.mainboardRepo.findById(input.id);
    if (!mainboard) {
      throw new NotFoundException(`Mainboard with id ${input.id} not found`);
    }

    Object.assign(mainboard, input);
    return await this.mainboardRepo.update(input.id, mainboard);
  }

  async findById(id: number) {
    const mainboard = await this.mainboardRepo.findById(id);
    if (!mainboard) {
      throw new NotFoundException(`Mainboard with id ${id} not found`);
    }
    return mainboard;
  }

  async delete(id: number) {
    const mainboard = await this.mainboardRepo.findById(id);
    if (!mainboard) {
      throw new NotFoundException(`Mainboard with id ${id} not found`);
    }
    return await this.mainboardRepo.delete(id);
  }
}
