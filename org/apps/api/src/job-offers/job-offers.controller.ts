import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateJobOfferDto } from '@shared/data-objects';
import { JobOffersService } from './job-offers.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('job-offers')
export class JobOffersController {
  constructor(private adsService: JobOffersService) {}

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.adsService.findById(id);
  }

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
