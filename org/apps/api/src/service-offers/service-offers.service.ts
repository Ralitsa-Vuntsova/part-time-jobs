import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { dbToInstance } from '../lib/utils';
import { ExtendedModel } from '../lib/db-utils/extended-model';
import {
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

  findById(id: string): Promise<ServiceOfferDto> {
    return dbToInstance(ServiceOfferDto, this.adModel.findById(id));
  }

  list(): Promise<ServiceOfferDto[]> {
    return this.adModel.find();
  }

  create(ad: CreateServiceOfferDto, userId: string): Promise<ServiceOfferDto> {
    return dbToInstance(
      ServiceOfferDto,
      this.adModel.createExtended(ad, userId)
    );
  }

  edit(
    id: string,
    ad: ServiceOfferDto,
    userId: string
  ): Promise<ServiceOfferDto> {
    return dbToInstance(
      ServiceOfferDto,
      this.adModel.findOneAndReplace({ _id: id }, ad, {
        returnDocument: 'after',
        user: userId,
      })
    );
  }
}
