import { Column, Entity, OneToMany } from 'typeorm';
import { IsEmail, IsUrl, Length } from 'class-validator';
import { General } from '../../utils/general.entity';
import { Wish } from '../../wishes/entities/wishes.entity';
import { Offer } from '../../offers/entities/offers.entity';
import { Wishlist } from '../../wishlists/entities/wishlists.entity';

@Entity()
export class User extends General {
  @Column({
    unique: true,
  })
  @Length(2, 30)
  username: string;

  @Column({
    default: 'Пока ничего не рассказал о себе',
  })
  @Length(2, 200)
  about: string;

  @Column({
    default: 'https://i.pravatar.cc/300',
  })
  @IsUrl()
  avatar: string;

  @Column({
    unique: true,
  })
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Wish, (wishes) => wishes.owner)
  wishes: Wish[];

  @OneToMany(() => Offer, (offers) => offers.user)
  offers: Offer[];

  @OneToMany(() => Wishlist, (wishlists) => wishlists.owner)
  wishlists: Wishlist;
}
