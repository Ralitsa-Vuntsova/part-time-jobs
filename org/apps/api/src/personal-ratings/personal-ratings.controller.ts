import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthUser, CreatePersonalRatingDto } from '@shared/data-objects';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../decorators/user-decorator';
import { PersonalRatingsService } from './personal-ratings.service';

@Controller('personal-ratings')
export class PersonalRatingsController {
  constructor(private personalRatingService: PersonalRatingsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  listForUser(@User() user: AuthUser) {
    return this.personalRatingService.listForUser(user.userId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() personalRatings: CreatePersonalRatingDto[],
    @User() user: AuthUser
  ) {
    return Promise.all(
      personalRatings.map((rating) =>
        this.personalRatingService.create(rating, user.userId)
      )
    );
  }
}
