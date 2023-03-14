import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { WishesService } from '../wishes/wishes.service';
import { NotFoundError } from 'rxjs';
import { errors } from '../utils/errors';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly wishesService: WishesService,
  ) {}

  @Get('me')
  async getUser(@Req() data) {
    const user = await this.userService.findUserById(data.user.id);
    if (!user) throw new NotFoundError(errors.NOT_FOUND);
    delete user.password;
    return user;
  }

  @Patch('me')
  async updateUser(@Req() data, @Body() updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userService.updateUser(
      data.user.id,
      updateUserDto,
    );
    if (!updatedUser) throw new NotFoundError(errors.NOT_FOUND);
    delete updatedUser.password;
    return updatedUser;
  }

  @Get('me/wishes')
  async getUserWishes(@Req() data) {
    const userWishes = await this.wishesService.findUserWishes(data.user.id);
    if (!userWishes) throw new NotFoundError(errors.NOT_FOUND);
    userWishes.map((userWish) => delete userWish.owner.password);
    return userWishes;
  }

  @Get(':username')
  async getUserByUsername(@Param('username') data: string) {
    const user = await this.userService.findUserByUsername(data);
    delete user.password;
    return user;
  }

  @Get(':username/wishes')
  async getUserWishesByUsername(@Param('username') data) {
    const user = await this.userService.findUserByUsername(data);
    if (!user) throw new NotFoundError(errors.NOT_FOUND);
    return await this.wishesService.findUserWishes(user.id);
  }

  @Post('find')
  async findMany(@Body('query') data) {
    const users = await this.userService.searchUsers(data);
    if (!users) throw new NotFoundError(errors.NOT_FOUND);
    users.map((user) => delete user.password);
    return users;
  }
}
