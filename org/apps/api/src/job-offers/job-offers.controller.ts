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
  JobOfferDto,
} from '@shared/data-objects';
import { JobOffersService } from './job-offers.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../decorators/user-decorator';

@Controller('job-offers')
export class JobOffersController {
  constructor(private adsService: JobOffersService) {}

  @Get(':id')
  getById(@Param('id') id: string): Promise<JobOfferDto> {
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
  async editAd(
    @Param('id') id: string,
    @Body() ad: EditJobOfferDto,
    @User() user: AuthUser
  ) {
    const adToBeEdited = await this.getById(id);
    const editedAd = { ...adToBeEdited, ...ad };

    await this.adsService.edit(id, editedAd, user);

    return { status: 'OK' };
  }

  @Patch('unarchive/:id')
  @UseGuards(JwtAuthGuard)
  async unarchive(@Param('id') id: string, @User() user: AuthUser) {
    const adToBeEdited = await this.getById(id);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { archiveReason, ...rest } = adToBeEdited;

    await this.adsService.edit(id, rest, user);

    return { status: 'OK' };
  }
}
