import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OfferAd, OfferAdSchema } from '@shared/data-objects';
import { OfferAdsController } from './offer-ads.controller';
import { OfferAdsService } from './offer-ads.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: OfferAd.name, schema: OfferAdSchema }]),
  ],
  controllers: [OfferAdsController],
  providers: [OfferAdsService],
  exports: [OfferAdsService],
})
export class OfferAdsModule {}
