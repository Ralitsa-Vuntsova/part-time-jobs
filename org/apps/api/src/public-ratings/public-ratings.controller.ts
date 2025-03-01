import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthUser, CreatePublicRatingDto } from '@shared/data-objects';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../decorators/user-decorator';
import { PublicRatingsService } from './public-ratings.service';

@Controller('public-ratings')
export class PublicRatingsController {
  constructor(private publicRatingService: PublicRatingsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  list() {
    return this.publicRatingService.list();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() publicRatings: CreatePublicRatingDto[],
    @User() user: AuthUser
  ) {
    return Promise.all(
      publicRatings.map((rating) =>
        this.publicRatingService.create(rating, user.userId)
      )
    );
  }
}
