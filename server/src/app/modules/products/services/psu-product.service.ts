import { Injectable, NotFoundException } from '@nestjs/common';
import { PsuRepository } from '../repositories/psu.repositories';
import { ProductService } from './products.service';
import { CreatePsuInput } from './types/create-psu.input';
import { UpdatePsuInput } from './types/update-psu.input';
import { ProductType } from '../enums/product-type.enum';
import { PSU } from '../entities/psu.entity';

@Injectable()
export class PsuProductService {
  constructor(
    private readonly psuRepo: PsuRepository,
    private readonly productService: ProductService,
  ) {}

  async create(input: CreatePsuInput) {
    const product = await this.productService.createProduct({
      name: input.name,
      description: input.description,
      price: input.price,
      stock: input.stock,
      category: input.category,
      images: input.images,
      is_active: input.is_active,
      type: ProductType.POWER_SUPPLY,
    });

    const psu = new PSU();
    psu.id = product.id;
    psu.wattage = input.wattage;
    psu.efficiency_rating = input.efficiency_rating;
    psu.form_factor = input.form_factor;
    psu.modular = input.modular;
    psu.atx12vVersion = input.atx12vVersion;
    psu.protection_features = input.protection_features;
    psu.pcie_connectors = input.pcie_connectors;
    psu.sata_connectors = input.sata_connectors;
    psu.eps_connectors = input.eps_connectors;
    psu.product = product;

    return await this.psuRepo.create(psu);
  }

  async update(input: UpdatePsuInput) {
    const psu = await this.psuRepo.findById(input.id);
    if (!psu) {
      throw new NotFoundException(`PSU with id ${input.id} not found`);
    }

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

    Object.assign(psu, input);
    return await this.psuRepo.update(input.id, psu);
  }

  async findById(id: number) {
    const psu = await this.psuRepo.findById(id);
    if (!psu) {
      throw new NotFoundException(`PSU with id ${id} not found`);
    }
    return psu;
  }

  async findAll() {
    return await this.psuRepo.findAll();
  }
}
