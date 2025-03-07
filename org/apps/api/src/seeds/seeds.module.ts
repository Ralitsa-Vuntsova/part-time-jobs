import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SeedsService } from './seeds.service';
import {
  JobOffer,
  JobOfferSchema,
  ServiceOffer,
  ServiceOfferSchema,
  User,
  UserSchema,
} from '@shared/data-objects';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: JobOffer.name, schema: JobOfferSchema },
    ]),
    MongooseModule.forFeature([
      { name: ServiceOffer.name, schema: ServiceOfferSchema },
    ]),
  ],
  providers: [SeedsService],
  exports: [SeedsService],
})
export class SeedsModule {}
