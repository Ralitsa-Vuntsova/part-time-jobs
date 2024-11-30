import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SearchAd, SearchAdSchema } from '@shared/data-objects';
import { SearchAdsController } from './search-ads.controller';
import { SearchAdsService } from './search-ads.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SearchAd.name, schema: SearchAdSchema },
    ]),
  ],
  controllers: [SearchAdsController],
  providers: [SearchAdsService],
  exports: [SearchAdsService],
})
export class SearchAdsModule {}
