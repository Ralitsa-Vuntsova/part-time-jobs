import { Body, Controller, Post } from '@nestjs/common';
import { CreateServiceOfferDto } from '@shared/data-objects';
import { ServiceOffersService } from './service-offers.service';

@Controller('service-offers')
export class ServiceOffersController {
  constructor(private adsService: ServiceOffersService) {}

  @Post()
  async createAd(@Body() ad: CreateServiceOfferDto) {
    return this.adsService.create(ad);
  }
}
