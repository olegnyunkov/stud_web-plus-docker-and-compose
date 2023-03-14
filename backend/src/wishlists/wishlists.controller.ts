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
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { NotFoundError } from 'rxjs';
import { errors } from '../utils/errors';

@UseGuards(JwtGuard)
@Controller('wishlistlists')
export class WishlistsController {
  constructor(private readonly wishlistService: WishlistsService) {}
  @Get()
  async getWishlists() {
    const wishlists = await this.wishlistService.getWishlists();
    if (!wishlists) throw new NotFoundError(errors.NOT_FOUND);
    wishlists.map((wishlist) => delete wishlist.owner.password);
    return wishlists;
  }

  @Post()
  async createWishlist(
    @Req() data,
    @Body() createWishlistDto: CreateWishlistDto,
  ) {
    const wishlist = await this.wishlistService.createWishlist(
      data.user,
      createWishlistDto,
    );
    delete wishlist.owner.password;
    return wishlist;
  }

  @Get(':id')
  async getWishlistsById(@Param('id') id) {
    const wishlist = await this.wishlistService.getWishlistsById(id);
    if (!wishlist) throw new NotFoundError(errors.NOT_FOUND);
    delete wishlist.owner.password;
    return wishlist;
  }

  @Patch(':id')
  async updateWishlist(
    @Req() data,
    @Body() updateWishlistDto: UpdateWishlistDto,
    @Param('id') id: string,
  ) {
    const wishlist = await this.wishlistService.updateWishlist(id, updateWishlistDto, data);
    delete wishlist.owner.password;
    return wishlist;
  }

  @Delete(':id')
  async removeWishlist(@Param('id') id: string, @Req() data) {
    const wishlist = await this.wishlistService.removeWishlist(id, data);
    if (!wishlist) throw new NotFoundError(errors.NOT_FOUND);
    delete wishlist.owner.password;
    return wishlist;
  }
}
