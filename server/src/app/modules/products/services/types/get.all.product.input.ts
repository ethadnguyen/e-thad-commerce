import { PaginationInput } from 'src/common/types/pagination_types/pagination.input';

export interface GetAllProductInput extends PaginationInput {
  category?: number;
}
