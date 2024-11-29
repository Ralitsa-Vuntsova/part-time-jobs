import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Ad, AdDocument, CreateAdDto, AdDto } from '@shared/data-objects';
import { dbToInstance } from '../lib/utils';
import { ExtendedModel } from '../lib/db-utils/extended-model';

@Injectable()
export class AdsService {
  constructor(
    @InjectModel(Ad.name) private adModel: ExtendedModel<AdDocument>
  ) {}

  async create(ad: CreateAdDto) {
    return dbToInstance(AdDto, this.adModel.create(ad));
  }
}
