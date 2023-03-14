import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OffersService } from './offers.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { CreateOfferDto } from './dto/create-offer.dto';

@Controller('offers')
@UseGuards(JwtGuard)
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  async createOffer(@Body() createOfferDto: CreateOfferDto, @Req() info) {
    const offer = await this.offersService.createOffer(createOfferDto, info);
    return offer;
  }

  @Get()
  async getOffers() {
    return await this.offersService.getOffers();
  }

  @Get(':id')
  async getOfferById(@Param('id') id: string) {
    return await this.offersService.getOfferById(id);
  }
}
