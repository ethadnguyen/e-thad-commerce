import { Injectable } from '@nestjs/common';
import { GetAllCategoriesReqDto } from '@/app/modules/categories/dto/request/get-all-categories.req';
import { PaginationResponseDto } from '@/app/common/dto/pagination-response.dto';
import { CategoryResponseDto } from '@/app/modules/categories/dto/response/category.response.dto';

@Injectable()
export class CategoriesService {
  async findAll(query: GetAllCategoriesReqDto): Promise<PaginationResponseDto<CategoryResponseDto>> {
    const { page = 1, limit = 10, rootOnly } = query;
    const skip = (page - 1) * limit;

    const [categories, total] = await this.categoryRepository.findAndCount({
      where: rootOnly ? { parentCategory: null } : {},
      relations: ['parentCategory', 'childCategories'],
      skip,
      take: limit,
    });

    const data = categories.map(category => new CategoryResponseDto(category));
    return new PaginationResponseDto(data, total, page, limit);
  }
} 