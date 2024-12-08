import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateServiceOfferDto } from '@shared/data-objects';
import { ServiceOffersService } from './service-offers.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('service-offers')
export class ServiceOffersController {
  constructor(private adsService: ServiceOffersService) {}

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
  createAd(@Body() ad: CreateServiceOfferDto) {
    return this.adsService.create(ad);
  }
}
