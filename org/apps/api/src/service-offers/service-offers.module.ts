import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServiceOffer, ServiceOfferSchema } from '@shared/data-objects';
import { ServiceOffersController } from './service-offers.controller';
import { ServiceOffersService } from './service-offers.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ServiceOffer.name, schema: ServiceOfferSchema },
    ]),
  ],
  controllers: [ServiceOffersController],
  providers: [ServiceOffersService],
  exports: [ServiceOffersService],
})
export class ServiceOffersModule {}
