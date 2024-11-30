import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { dbToInstance } from '../lib/utils';
import { ExtendedModel } from '../lib/db-utils/extended-model';
import {
  CreateSearchAdDto,
  SearchAd,
  SearchAdDocument,
  SearchAdDto,
} from '@shared/data-objects';

@Injectable()
export class SearchAdsService {
  constructor(
    @InjectModel(SearchAd.name) private adModel: ExtendedModel<SearchAdDocument>
  ) {}

  async create(ad: CreateSearchAdDto) {
    return dbToInstance(SearchAdDto, this.adModel.create(ad));
  }
}
