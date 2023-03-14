import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { errors } from '../../utils/errors';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string) {
    const checkedUser = await this.authService.validatePassword(
      username,
      password,
    );
    if (!checkedUser) throw new UnauthorizedException(errors.WRONG_DATA);
    return checkedUser;
  }
}
