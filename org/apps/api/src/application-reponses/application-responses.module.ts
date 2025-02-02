import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ApplicationResponse,
  ApplicationResponseSchema,
} from '@shared/data-objects';
import { ApplicationResponsesController } from './application-responses.controller';
import { ApplicationResponsesService } from './application-responses.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ApplicationResponse.name, schema: ApplicationResponseSchema },
    ]),
  ],
  controllers: [ApplicationResponsesController],
  providers: [ApplicationResponsesService],
  exports: [ApplicationResponsesService],
})
export class ApplicationResponsesModule {}
