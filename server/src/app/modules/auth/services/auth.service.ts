import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CustomersService } from '../../users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CustomerPayload } from '../interfaces/customer-payload.interface';
import { ConfigService } from '@nestjs/config';
import { SignInInput } from './types/sign-in.input';

@Injectable()
export class AuthService {
  constructor(
    private customersService: CustomersService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  // async validate(user: SignInInput) {
  //   const customer = await
  // }
  async signIn() {}
}
