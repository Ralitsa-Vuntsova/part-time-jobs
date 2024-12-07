import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateJobOfferDto } from '@shared/data-objects';
import { JobOffersService } from './job-offers.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('job-offers')
export class JobOffersController {
  constructor(private adsService: JobOffersService) {}

  @Get()
  list() {
    return this.adsService.list();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createAd(@Body() ad: CreateJobOfferDto) {
    return this.adsService.create(ad);
  }
}
