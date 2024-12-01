import { Body, Controller, Post } from '@nestjs/common';
import { CreateJobOfferDto } from '@shared/data-objects';
import { JobOffersService } from './job-offers.service';

@Controller('offer-ads')
export class JobOffersController {
  constructor(private adsService: JobOffersService) {}

  @Post()
  async createAd(@Body() ad: CreateJobOfferDto) {
    return this.adsService.create(ad);
  }
}
