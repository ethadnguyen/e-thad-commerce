import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Role } from '../../../../core/utils/roles';
import { UserRepository } from './../repositories/users.repository';
import { CreateUserInput } from '../types/create-user.input';
import { User } from '../entities/users.entity';
import { PaginationInput } from 'src/common/types/pagination.input';
import { UpdateUserInput } from '../types/update-user.input';

@Injectable()
export class UsersService {
  constructor(private readonly repo: UserRepository) {}

  async createUser(input: CreateUserInput) {
    let user = new User();

    let userDb = await this.repo.findByEmail(input.email);
    if (userDb) {
      throw new Error('User already exists');
    }

    user.username = input.username;
    user.email = input.email;
    user.phone = input.phone;
    user.roles = input.roles || [Role.User];
    user.status = 'active';
    user.password = await bcrypt.hash(input.password, 10);

    return await this.repo.create(user);
  }

  async getUserById(id: number) {
    let userDb = await this.repo.findById(id);
    if (!userDb) {
      throw new Error('User not found');
    }

    return userDb;
  }

  async getAllUsers(queryParams: PaginationInput) {
    const { page = 1, size = 10 } = queryParams;

    const [users, total] = await this.repo.findAll({
      skip: (page - 1) * size,
      take: size,
    });

    const totalPages = Math.ceil(total / size);

    return {
      total,
      totalPages,
      currentPage: page,
      users,
    };
  }

  async updateUser(input: UpdateUserInput) {
    const user = await this.repo.findById(input.user_id);

    if (!user) {
      throw new Error('User not found');
    }

    if (input.email && input.email !== user.email) {
      let userDb = await this.repo.findByEmail(input.email);
      if (userDb) {
        throw new Error('User already exists');
      }
      user.email = input.email;
    }

    user.username = input.username || user.username;

    if (input.password) {
      user.password = await bcrypt.hash(input.password, 10);
    }

    user.phone = input.phone || user.phone;

    user.status = input.status || user.status;
  }
}
