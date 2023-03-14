import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { NotFoundError } from 'rxjs';
import { errors } from '../utils/errors';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}
  @UseGuards(JwtGuard)
  @Post()
  async create(@Req() data, @Body() createWishDto: CreateWishDto) {
    const wish = await this.wishesService.createWish(data.user, createWishDto);
    delete wish.owner.password;
    return wish;
  }

  @Get('last')
  async getUserLastWishes() {
    return await this.wishesService.findLast();
  }

  @Get('top')
  async getUserTopWishes() {
    return await this.wishesService.findTop();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async getById(@Param('id') id: string) {
    const wish = await this.wishesService.getById(+id);
    if (!wish) throw new NotFoundError(errors.NOT_FOUND);
    delete wish.owner.password;
    return wish;
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateWishDto: UpdateWishDto) {
    return await this.wishesService.updateWish(id, updateWishDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() data) {
    const wish = await this.wishesService.removeWish(+id, data);
    if (!wish) throw new NotFoundError(errors.NOT_FOUND);
    delete wish.owner.password;
    return wish;
  }

  @Post(':id/copy')
  async copyUserWishes(@Param('id') id, @Req() data) {
    return await this.wishesService.copyUserWishes();
  }
}
