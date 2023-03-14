import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { WishesModule } from './wishes/wishes.module';
import { OffersModule } from './offers/offers.module';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from './config/config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HashModule } from './hash/hash.module';
import { WishlistsModule } from './wishlists/wishlists.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeOrmConfig,
    }),
    UsersModule,
    WishesModule,
    OffersModule,
    AuthModule,
    HashModule,
    WishlistsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
