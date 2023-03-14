import { Column, Entity, ManyToOne } from 'typeorm';
import { General } from '../../utils/general.entity';
import { User } from '../../users/entities/users.entity';
import { Wish } from '../../wishes/entities/wishes.entity';

@Entity()
export class Offer extends General {
  @ManyToOne(() => User, (users) => users.offers)
  user: User;

  @ManyToOne(() => Wish, (wishes) => wishes.offers, {
    onDelete: 'CASCADE',
  })
  item: Wish;

  @Column()
  amount: number;

  @Column({
    default: false,
  })
  hidden: boolean;
}
