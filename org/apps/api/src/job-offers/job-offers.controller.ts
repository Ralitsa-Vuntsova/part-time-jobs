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
  CreateJobOfferDto,
  EditJobOfferDto,
} from '@shared/data-objects';
import { JobOffersService } from './job-offers.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../decorators/user-decorator';
import { ApplicationsService } from '../applications/applications.service';
import { ApplicationResponsesService } from '../application-reponses/application-responses.service';
import { union } from 'lodash';

@Controller('job-offers')
export class JobOffersController {
  constructor(
    private adsService: JobOffersService,
    private applicationResponsesService: ApplicationResponsesService,
    private applicationsService: ApplicationsService
  ) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getById(@Param('id') id: string, @User() user: AuthUser) {
    const ad = await this.adsService.findById(id);

    if (ad.createdBy === user.userId || !ad.archiveReason) {
      return ad;
    }

    const completedByUserAdIds = await this.getCompletedByUserAdIds(
      user.userId
    );

    // Handles user not having permission to ad
    if (!completedByUserAdIds.includes(id)) {
      throw new ForbiddenException(
        'Cannot fetch advertisement, no permissions'
      );
    }

    return ad;
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async list(@User() user: AuthUser) {
    const ads = await this.adsService.list();

    const completedByUserAdIds = await this.getCompletedByUserAdIds(
      user.userId
    );

    const createdByUserAds = ads.filter(
      ({ createdBy }) => createdBy === user.userId
    );
    const completedByUserAds = ads.filter(({ _id }) =>
      completedByUserAdIds.includes(_id.toString())
    );
    const activeAds = ads.filter(({ archiveReason }) => !archiveReason);

    return union(createdByUserAds, completedByUserAds, activeAds);
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

    if (adToBeEdited.createdBy !== user.userId) {
      throw new ForbiddenException('Cannot modify ad, no permissions');
    }

    const editedAd = { ...adToBeEdited, ...ad };

    await this.adsService.edit(id, editedAd, user);

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

    await this.adsService.edit(id, rest, user);

    return { status: 'OK' };
  }

  async getCompletedByUserAdIds(userId: string) {
    const acceptedApplicationIds = (
      await this.applicationResponsesService.listAccepted()
    ).map(({ applicationId }) => applicationId);

    return (
      await this.applicationsService.listByIds(acceptedApplicationIds, userId)
    ).map(({ adId }) => adId);
  }
}
