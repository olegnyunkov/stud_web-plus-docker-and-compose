import { ConfigService } from '@nestjs/config';
import { User } from '../users/entities/users.entity';
import { Wish } from '../wishes/entities/wishes.entity';
import { Wishlist } from '../wishlists/entities/wishlists.entity';
import { Offer } from '../offers/entities/offers.entity';

export const typeOrmConfig = (configService: ConfigService) => ({
  type: configService.get('DB_TYPE') || 'localhost',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT') || 5432,
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_DATABASE'),
  schema: configService.get('DB_SCHEMA'),
  entities: [User, Wish, Wishlist, Offer],
  synchronize: configService.get<boolean>('DB_SYNCHRONIZE') || false,
});

export const jwtConfig = (configService: ConfigService) => ({
  secret: configService.get('JWT_SECRET-KEY'),
  signOptions: {
    expiresIn: configService.get('JWT_LIFETIME'),
  },
});
