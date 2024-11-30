import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { dbToInstance } from '../lib/utils';
import { ExtendedModel } from '../lib/db-utils/extended-model';
import {
  CreateOfferAdDto,
  OfferAd,
  OfferAdDocument,
  OfferAdDto,
} from '@shared/data-objects';

@Injectable()
export class OfferAdsService {
  constructor(
    @InjectModel(OfferAd.name) private adModel: ExtendedModel<OfferAdDocument>
  ) {}

  async create(ad: CreateOfferAdDto) {
    return dbToInstance(OfferAdDto, this.adModel.create(ad));
  }
}
