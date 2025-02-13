import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../../app/modules/auth/services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
    console.log('LocalStrategy constructor');
  }

  async validate(username: string, password: string): Promise<any> {
    console.log('strategy');
    const user = await this.authService.validate({ email: username, password });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
