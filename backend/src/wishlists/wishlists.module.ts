import { Module } from '@nestjs/common';
import { WishlistsController } from './wishlists.controller';
import { WishlistsService } from './wishlists.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wishlist } from './entities/wishlists.entity';
import { WishesModule } from '../wishes/wishes.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Wishlist]), WishesModule, UsersModule],
  controllers: [WishlistsController],
  providers: [WishlistsService],
})
export class WishlistsModule {}
