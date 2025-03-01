import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { dbToInstance } from '../lib/utils';
import { ExtendedModel } from '../lib/db-utils/extended-model';
import {
  AuthUser,
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

  findById(id: string): Promise<JobOfferDto> {
    return dbToInstance(JobOfferDto, this.adModel.findById(id));
  }

  findByUser(userId: string): Promise<JobOfferDto[]> {
    return this.adModel.find({ createdBy: userId });
  }

  list(): Promise<JobOfferDto[]> {
    return this.adModel.find();
  }

  create(ad: CreateJobOfferDto, userId: string): Promise<JobOfferDto> {
    return dbToInstance(JobOfferDto, this.adModel.createExtended(ad, userId));
  }

  edit(id: string, ad: JobOfferDto, user: AuthUser): Promise<JobOfferDto> {
    return dbToInstance(
      JobOfferDto,
      this.adModel.findOneAndReplace({ _id: id }, ad, {
        returnDocument: 'after',
        user: user.userId,
      })
    );
  }
}
