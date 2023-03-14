import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { WishesModule } from '../wishes/wishes.module';
import { HashModule } from '../hash/hash.module';
import { Wish } from '../wishes/entities/wishes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Wish]), WishesModule, HashModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
