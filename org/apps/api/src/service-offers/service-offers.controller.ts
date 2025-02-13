import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  AuthUser,
  CreateServiceOfferDto,
  EditServiceOfferDto,
  ServiceOfferDto,
} from '@shared/data-objects';
import { ServiceOffersService } from './service-offers.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../decorators/user-decorator';

@Controller('service-offers')
export class ServiceOffersController {
  constructor(private adsService: ServiceOffersService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getById(
    @Param('id') id: string,
    @User() user: AuthUser
  ): Promise<ServiceOfferDto> {
    const ad = await this.adsService.findById(id);

    if (ad.createdBy === user.userId || !ad.archiveReason) {
      return ad;
    }

    // Handles user not having permission to ad
    throw new NotFoundException(`Advertisement with ID ${id} not found!`);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
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
    const adToBeEdited = await this.adsService.findById(id);
    const editedAd = { ...adToBeEdited, ...ad };

    await this.adsService.edit(id, editedAd, user);

    return { status: 'OK' };
  }

  @Patch('unarchive/:id')
  @UseGuards(JwtAuthGuard)
  async unarchive(@Param('id') id: string, @User() user: AuthUser) {
    const adToBeEdited = await this.adsService.findById(id);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { archiveReason, ...rest } = adToBeEdited;

    await this.adsService.edit(id, rest, user);

    return { status: 'OK' };
  }
}
