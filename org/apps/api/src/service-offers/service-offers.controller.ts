import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  AuthUser,
  CreateServiceOfferDto,
  EditServiceOfferDto,
} from '@shared/data-objects';
import { ServiceOffersService } from './service-offers.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../decorators/user-decorator';

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
  createAd(@Body() ad: CreateServiceOfferDto, @User() user: AuthUser) {
    return this.adsService.create(ad, user.userId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async editAd(
    @Param('id') id: string,
    @Body() ad: EditServiceOfferDto,
    @User() user: AuthUser
  ) {
    const adToBeEdited = await this.getById(id);
    const editedAd = { ...adToBeEdited, ...ad };

    await this.adsService.edit(id, editedAd, user);

    return { status: 'OK' };
  }
}
