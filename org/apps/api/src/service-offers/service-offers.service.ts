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

  list() {
    return this.adModel.find();
  }

  create(ad: CreateServiceOfferDto) {
    return dbToInstance(ServiceOfferDto, this.adModel.create(ad));
  }
}
