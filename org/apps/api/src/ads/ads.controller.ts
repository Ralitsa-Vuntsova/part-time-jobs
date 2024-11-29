import { CreateAdDto } from '@shared/data-objects';
import { Body, Controller, Post } from '@nestjs/common';
import { AdsService } from './ads.service';

@Controller('ads')
export class AdsController {
  constructor(private adsService: AdsService) {}

  @Post()
  async create(@Body() ad: CreateAdDto) {
    return this.adsService.create(ad);
  }
}
