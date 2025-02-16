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
  CreateJobOfferDto,
  EditJobOfferDto,
  JobOfferDto,
} from '@shared/data-objects';
import { JobOffersService } from './job-offers.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../decorators/user-decorator';
import { ApplicationsService } from '../applications/applications.service';
import { ApplicationResponsesService } from '../application-reponses/application-responses.service';

@Controller('job-offers')
export class JobOffersController {
  constructor(
    private adsService: JobOffersService,
    private applicationResponsesService: ApplicationResponsesService,
    private applicationsService: ApplicationsService
  ) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getById(
    @Param('id') id: string,
    @User() user: AuthUser
  ): Promise<JobOfferDto> {
    const ad = await this.adsService.findById(id);

    if (ad.createdBy === user.userId || !ad.archiveReason) {
      return ad;
    }

    const applications = (
      await this.applicationResponsesService.listAccepted()
    ).map(({ applicationId }) => applicationId);
    const ads = (
      await this.applicationsService.listByIds(applications, user.userId)
    ).map(({ adId }) => adId);

    // Handles user not having permission to ad
    if (!ads.includes(id)) {
      throw new NotFoundException(`Advertisement with ID ${id} not found!`);
    }

    return ad;
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getByUser(@Body() user: { userId: string }): Promise<JobOfferDto[]> {
    return this.adsService.findByUser(user.userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
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
