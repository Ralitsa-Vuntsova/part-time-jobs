import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JobOffersService } from './job-offers.service';
import { JobOffersController } from './job-offers.controller';
import {
  Application,
  ApplicationResponse,
  ApplicationResponseSchema,
  ApplicationSchema,
  JobOffer,
  JobOfferSchema,
} from '@shared/data-objects';
import { ApplicationResponsesService } from '../application-reponses/application-responses.service';
import { ApplicationsService } from '../applications/applications.service';
import { ApplicationResponsesModule } from '../application-reponses/application-responses.module';
import { ApplicationsModule } from '../applications/applications.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobOffer.name, schema: JobOfferSchema },
      { name: ApplicationResponse.name, schema: ApplicationResponseSchema },
      { name: Application.name, schema: ApplicationSchema },
    ]),
    ApplicationResponsesModule,
    ApplicationsModule,
  ],
  controllers: [JobOffersController],
  providers: [
    JobOffersService,
    ApplicationResponsesService,
    ApplicationsService,
  ],
  exports: [JobOffersService],
})
export class JobOffersModule {}
