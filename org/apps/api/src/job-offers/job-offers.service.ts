import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { dbToInstance } from '../lib/utils';
import { ExtendedModel } from '../lib/db-utils/extended-model';
import {
  CreateJobOfferDto,
  EditJobOfferDto,
  JobOffer,
  JobOfferDocument,
  JobOfferDto,
} from '@shared/data-objects';

@Injectable()
export class JobOffersService {
  constructor(
    @InjectModel(JobOffer.name) private adModel: ExtendedModel<JobOfferDocument>
  ) {}

  findById(id: string) {
    return dbToInstance(JobOfferDto, this.adModel.findById(id));
  }

  async list() {
    return (await this.adModel.find()).filter((ad) => !ad.isArchieved);
  }

  create(ad: CreateJobOfferDto, userId: string) {
    return dbToInstance(
      JobOfferDto,
      this.adModel.createExtended({ ...ad, isArchieved: false }, userId)
    );
  }

  async edit(id: string, ad: EditJobOfferDto) {
    return dbToInstance(
      JobOfferDto,
      this.adModel.findOneAndReplace({ _id: id }, ad, {
        returnDocument: 'after',
      })
    );
  }
}
