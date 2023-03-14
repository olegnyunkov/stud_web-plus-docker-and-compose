import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { General } from '../../utils/general.entity';
import { IsUrl, Length } from 'class-validator';
import { Wish } from '../../wishes/entities/wishes.entity';
import { User } from '../../users/entities/users.entity';

@Entity()
export class Wishlist extends General {
  @Column()
  @Length(1, 250)
  name: string;

  @Column()
  @Length(0, 1500)
  description: string;

  @Column()
  @IsUrl()
  image: string;

  @ManyToMany(() => Wish)
  @JoinTable()
  items: Wish[];

  @ManyToOne(() => User, (users) => users.wishlists)
  owner: User;
}
