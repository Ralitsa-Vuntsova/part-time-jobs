import { CreateSearchAdDto } from '@shared/data-objects';
import { Body, Controller, Post } from '@nestjs/common';
import { SearchAdsService } from './search-ads.service';

@Controller('search-ads')
export class SearchAdsController {
  constructor(private adsService: SearchAdsService) {}

  @Post()
  async createAd(@Body() ad: CreateSearchAdDto) {
    return this.adsService.create(ad);
  }
}
