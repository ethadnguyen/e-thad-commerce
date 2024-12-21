import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CustomersService } from '../../customers/services/customers.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CustomerPayload } from '../interfaces/customer-payload.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private customersService: CustomersService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  private async generateAccessToken(user: CustomerPayload): Promise<string> {
    return this.jwtService.signAsync({
      sub: user.id,
      username: user.name,
      roles: user.roles,
    });
  }

  private async generateRefreshToken(user: CustomerPayload): Promise<string> {
    return this.jwtService.signAsync({ sub: user.id }, { expiresIn: '7d' });
  }

  async signIn(email: string, password: string) {
    const user = await this.customersService.findOne(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException();
    }

    const accessToken = await this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user);

    return { access_token: accessToken, refresh_token: refreshToken };
  }

  async refreshAccessToken(refreshToken: string): Promise<string> {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get<string>('JWT.secret'),
      });

      return this.jwtService.signAsync({
        sub: payload.sub,
        username: payload.username,
        roles: payload.roles,
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }
}
