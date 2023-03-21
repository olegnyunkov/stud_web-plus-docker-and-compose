import { ConfigService } from '@nestjs/config';
import { User } from '../users/entities/users.entity';
import { Wish } from '../wishes/entities/wishes.entity';
import { Wishlist } from '../wishlists/entities/wishlists.entity';
import { Offer } from '../offers/entities/offers.entity';

export const typeOrmConfig = (configService: ConfigService) => ({
  type: configService.get('DB_TYPE') || 'localhost',
  host: configService.get('POSTGRES_HOST'),
  port: configService.get('POSTGRES_PORT') || 5432,
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DB'),
  schema: configService.get('POSTGRES_SCHEMA'),
  entities: [User, Wish, Wishlist, Offer],
  synchronize: configService.get<boolean>('POSTGRES_POSTGRES_SYNCHRONIZE') || false,
});

export const jwtConfig = (configService: ConfigService) => ({
  secret: configService.get('JWT_SECRET'),
  signOptions: {
    expiresIn: configService.get('JWT_LIFETIME'),
  },
});
