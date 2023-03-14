import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { errors } from '../utils/errors';
import { HashService } from '../hash/hash.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
  ) {}
  authUser(data) {
    return { access_token: this.jwtService.sign({ sub: data.id }) };
  }

  async validatePassword(username: string, password: string) {
    const checkedUser = await this.usersService.findUserByUsername(username);
    if (!checkedUser) throw new UnauthorizedException(errors.WRONG_DATA);
    const checkPassword = await this.hashService.comparePasswords(
      password,
      checkedUser.password,
    );
    if (!checkPassword) throw new UnauthorizedException(errors.WRONG_DATA);
    return checkedUser;
  }

  async registerUser(data) {
    const userExists = await this.usersService.findUserByEmail(data.email);
    if (userExists) throw new BadRequestException(errors.USER_EXISTS);
    const createdUser = await this.usersService.createUser(data);
    return this.authUser(createdUser);
  }
}
