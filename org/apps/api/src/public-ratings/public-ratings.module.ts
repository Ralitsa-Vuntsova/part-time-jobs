import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PublicRating, PublicRatingSchema } from '@shared/data-objects';
import { PublicRatingsController } from './public-ratings.controller';
import { PublicRatingsService } from './public-ratings.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PublicRating.name, schema: PublicRatingSchema },
    ]),
  ],
  controllers: [PublicRatingsController],
  providers: [PublicRatingsService],
  exports: [PublicRatingsService],
})
export class PublicRatingsModule {}
