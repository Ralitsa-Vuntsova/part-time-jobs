import {
  Body,
  Controller,
  ForbiddenException,
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
import { union } from 'lodash';

@Controller('service-offers')
export class ServiceOffersController {
  constructor(private adsService: ServiceOffersService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getById(@Param('id') id: string, @User() user: AuthUser) {
    const ad = await this.adsService.findById(id);

    if (ad.createdBy === user.userId || !ad.archiveReason) {
      return ad;
    }

    throw new ForbiddenException('Cannot fetch advertisement, no permissions');
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async list(@User() user: AuthUser) {
    const ads = await this.adsService.list();

    const createdByUserAds = ads.filter(
      ({ createdBy }) => createdBy === user.userId
    );
    const activeAds = ads.filter(({ archiveReason }) => !archiveReason);

    return union(createdByUserAds, activeAds);
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
    const adToBeEdited = await this.adsService.findById(id);

    if (adToBeEdited.createdBy !== user.userId) {
      throw new ForbiddenException('Cannot modify ad, no permissions');
    }

    const editedAd = { ...adToBeEdited, ...ad };

    await this.adsService.edit(id, editedAd, user.userId);

    return { status: 'OK' };
  }

  @Patch('unarchive/:id')
  @UseGuards(JwtAuthGuard)
  async unarchive(@Param('id') id: string, @User() user: AuthUser) {
    const adToBeEdited = await this.adsService.findById(id);

    if (adToBeEdited.createdBy !== user.userId) {
      throw new ForbiddenException('Cannot unarchive ad, no permissions');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { archiveReason, ...rest } = adToBeEdited;

    await this.adsService.edit(id, rest, user.userId);

    return { status: 'OK' };
  }
}
