import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from './entities/offers.entity';
import { Repository } from 'typeorm';
import { WishesService } from '../wishes/wishes.service';
import { NotFoundError } from 'rxjs';
import { errors } from '../utils/errors';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offersRepository: Repository<Offer>,
    private readonly wishesService: WishesService,
  ) {}

  async getOffers() {
    const offers = await this.offersRepository.find({
      relations: ['item', 'user'],
    });
    if (!offers) throw new NotFoundError(errors.NOT_FOUND);
    offers.map((offer) => delete offer.user.password);
    return offers;
  }

  async getOfferById(id) {
    const offer = await this.offersRepository.findOne({
      where: { id },
      relations: ['item', 'user'],
    });
    if (!offer) throw new NotFoundError(errors.NOT_FOUND);
    delete offer.user.password;
    return offer;
  }

  async createOffer(data, info) {
    const userWish = await this.wishesService.getById(data.id);
    if (!userWish) throw new NotFoundError(errors.NOT_FOUND);
    delete info.user.password;
    delete userWish.owner.password;
    const offer = this.offersRepository.create({
      ...data,
      user: info.user,
      item: userWish,
    });
    return await this.offersRepository.save(offer);
  }
}
