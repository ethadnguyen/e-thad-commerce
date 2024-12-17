import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    // private customersService: CustomersService,
    private jwtService: JwtService,
  ) {}
}
