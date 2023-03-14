import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../../users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { errors } from '../../utils/errors';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET-KEY'),
    });
  }

  async validate(data: { sub: number }) {
    const checkedUser = await this.userService.findUserById(data.sub);
    if (!checkedUser) throw new UnauthorizedException(errors.WRONG_DATA);
    return checkedUser;
  }
}
