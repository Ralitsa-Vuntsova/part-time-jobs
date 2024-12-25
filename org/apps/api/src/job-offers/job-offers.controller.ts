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
  CreateJobOfferDto,
  EditJobOfferDto,
} from '@shared/data-objects';
import { JobOffersService } from './job-offers.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../decorators/user-decorator';

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
  createAd(@Body() ad: CreateJobOfferDto, @User() user: AuthUser) {
    return this.adsService.create(ad, user.userId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async editAd(@Param('id') id: string, @Body() ad: EditJobOfferDto) {
    const adToBeEdited = await this.getById(id);
    const editedAd = { ...adToBeEdited, ...ad };

    await this.adsService.edit(id, editedAd);

    return { status: 'OK' };
  }
}
