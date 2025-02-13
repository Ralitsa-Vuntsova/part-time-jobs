import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PersonalRating, PersonalRatingSchema } from '@shared/data-objects';
import { PersonalRatingsController } from './personal-ratings.controller';
import { PersonalRatingsService } from './personal-ratings.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PersonalRating.name, schema: PersonalRatingSchema },
    ]),
  ],
  controllers: [PersonalRatingsController],
  providers: [PersonalRatingsService],
  exports: [PersonalRatingsService],
})
export class PersonalRatingsModule {}
