import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { dbToInstance } from '../lib/utils';
import { ExtendedModel } from '../lib/db-utils/extended-model';
import {
  CreateJobOfferDto,
  JobOffer,
  JobOfferDocument,
  JobOfferDto,
} from '@shared/data-objects';

@Injectable()
export class JobOffersService {
  constructor(
    @InjectModel(JobOffer.name) private adModel: ExtendedModel<JobOfferDocument>
  ) {}

  list() {
    return this.adModel.find();
  }

  create(ad: CreateJobOfferDto) {
    return dbToInstance(JobOfferDto, this.adModel.create(ad));
  }
}
