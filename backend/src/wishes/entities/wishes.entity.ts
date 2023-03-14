import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { General } from '../../utils/general.entity';
import { IsUrl, Length } from 'class-validator';
import { User } from '../../users/entities/users.entity';
import { Offer } from '../../offers/entities/offers.entity';
import { Wishlist } from '../../wishlists/entities/wishlists.entity';

@Entity()
export class Wish extends General {
  @Column()
  @Length(1, 250)
  name: string;

  @Column()
  @IsUrl()
  link: string;

  @Column()
  @IsUrl()
  image: string;

  @Column()
  price: number;

  @Column({
    default: 0,
  })
  raised: number;

  @Column()
  @Length(1, 1024)
  description: string;

  @Column({
    default: 0,
  })
  copied: number;

  @ManyToOne(() => User, (owner) => owner.wishes)
  owner: User;

  @OneToMany(() => Offer, (offers) => offers.item, {
    cascade: true,
  })
  offers: Offer[];

  @ManyToOne(() => Wishlist, (wishlists) => wishlists.items)
  wishlist: Wishlist;
}
