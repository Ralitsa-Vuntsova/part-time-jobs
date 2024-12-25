import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { dbToInstance } from '../lib/utils';
import { ExtendedModel } from '../lib/db-utils/extended-model';
import {
  AuthUser,
  CreateServiceOfferDto,
  ServiceOffer,
  ServiceOfferDocument,
  ServiceOfferDto,
} from '@shared/data-objects';

@Injectable()
export class ServiceOffersService {
  constructor(
    @InjectModel(ServiceOffer.name)
    private adModel: ExtendedModel<ServiceOfferDocument>
  ) {}

  findById(id: string) {
    return dbToInstance(ServiceOfferDto, this.adModel.findById(id));
  }

  list() {
    return this.adModel.find();
  }

  create(ad: CreateServiceOfferDto, userId: string) {
    return dbToInstance(
      ServiceOfferDto,
      this.adModel.createExtended({ ...ad, isArchieved: false }, userId)
    );
  }

  async edit(id: string, ad: ServiceOfferDto, user: AuthUser) {
    return dbToInstance(
      ServiceOfferDto,
      this.adModel.findOneAndReplace({ _id: id }, ad, {
        returnDocument: 'after',
        user: user.userId,
      })
    );
  }
}
