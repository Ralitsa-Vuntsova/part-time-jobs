import { CreateOfferAdDto } from '@shared/data-objects';
import { Body, Controller, Post } from '@nestjs/common';
import { OfferAdsService } from './offer-ads.service';

@Controller('offer-ads')
export class OfferAdsController {
  constructor(private adsService: OfferAdsService) {}

  @Post()
  async createAd(@Body() ad: CreateOfferAdDto) {
    return this.adsService.create(ad);
  }
}
