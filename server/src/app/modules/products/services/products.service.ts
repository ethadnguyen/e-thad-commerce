import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductRepository } from '../repositories/products.repositories';
import { GetAllProductInput } from './types/get.all.product.input';
import { ErrorMessage } from 'src/common/enum/error.message.enum';
import { CreateProductInput } from './types/create-product.input';
import { Product } from '../entities/products.entity';
import { UpdateProductInput } from './types/update-product.input';
import { CategoryRepository } from '../../categories/repositories/categories.repositories';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepo: ProductRepository,
    private readonly categoryRepo: CategoryRepository,
  ) {}

  async getAllProducts(queryParams: GetAllProductInput) {
    const { page = 1, size = 10, category } = queryParams;

    const [products, total] = await this.productRepo.findAll(
      {
        skip: (page - 1) * size,
        take: size,
      },
      category,
    );

    const totalPages = Math.ceil(total / size);

    return {
      total,
      totalPages,
      currentPage: page,
      products,
    };
  }

  async getProductById(id: number) {
    const productDB = await this.productRepo.findById(id);
    if (!productDB) {
      throw new BadRequestException(ErrorMessage.USER_NOT_FOUND);
    }

    return productDB;
  }

  async createProduct(input: CreateProductInput) {
    let product = new Product();

    const categoryDB = await this.categoryRepo.findById(input.category);

    if (categoryDB) {
      product.category = categoryDB;
    }

    product.name = input.name;
    product.description = input.description;
    product.price = input.price;
    product.stock = input.stock;
    product.images = input.images;
    product.is_active = input.is_active;
    product.specifications = input.specifications;

    return await this.productRepo.create(product);
  }

  async updateProduct(input: UpdateProductInput) {
    const productDB = await this.getProductById(input.id);
    if (!productDB) {
      throw new NotFoundException(`Product with ID ${input.id} not found`);
    }

    if (input.category) {
      const categoryDB = await this.categoryRepo.findById(input.category);
      if (!categoryDB) {
        throw new NotFoundException(
          `Category with ID ${input.category} not found`,
        );
      }
      productDB.category = categoryDB;
    }

    productDB.name = input.name;
    productDB.description = input.description;
    productDB.price = input.price;
    productDB.stock = input.stock;
    productDB.images = input.images;
    productDB.is_active = input.is_active;
    productDB.specifications = input.specifications;

    return await this.productRepo.update(productDB);
  }

  async deleteProduct(id: number) {
    const product = await this.getProductById(id);

    if (product) {
      await this.productRepo.delete(product.id);
    }
  }
}
