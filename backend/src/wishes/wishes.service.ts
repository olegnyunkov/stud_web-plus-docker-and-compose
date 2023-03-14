import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Wish } from './entities/wishes.entity';
import { errors } from '../utils/errors';
import { NotFoundError } from "rxjs";

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private readonly wishesRepository: Repository<Wish>,
  ) {}

  async createWish(user, data) {
    return await this.wishesRepository.save({ ...data, owner: user });
  }

  async getById(id) {
    return await this.wishesRepository.findOne({
      where: { id },
      relations: {
        owner: true,
        offers: true,
      },
    });
  }

  async updateWish(id, data) {
    return await this.wishesRepository.update(id, data);
  }

  async removeWish(id, data) {
    const wish = await this.getById(id);
    if (!wish) throw new NotFoundException(errors.NOT_FOUND);
    if (wish.owner.id !== data.user.id)
      throw new BadRequestException(errors.NOT_ALLOWED);
    await this.wishesRepository.delete({ id });
    return wish;
  }

  async findUserWishes(id) {
    const userWishes = await this.wishesRepository.find({
      where: { owner: { id } },
      relations: ['offers', 'owner'],
    });
    userWishes.map((userWish) => delete userWish.owner.password);
    return userWishes;
  }

  async findLast() {
    return await this.wishesRepository.find({
      take: 40,
      order: { createdAt: 'DESC' },
    });
  }

  async findTop() {
    return await this.wishesRepository.find({
      take: 10,
      order: { copied: 'DESC' },
    });
  }

  async copyUserWishes() {
    return;
  }

  async updateWishCount(id, count) {
    return await this.wishesRepository.update(id, { raised: count });
  }

  async searchWishesById(data) {
    return await this.wishesRepository.find({
      where: { id: In(data.itemsId) },
    });
  }
}
