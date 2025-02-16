import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { dbToInstance } from '../lib/utils';
import { ExtendedModel } from '../lib/db-utils/extended-model';
import {
  CreatePublicRatingDto,
  PublicRating,
  PublicRatingDocument,
  PublicRatingDto,
} from '@shared/data-objects';

@Injectable()
export class PublicRatingsService {
  constructor(
    @InjectModel(PublicRating.name)
    private publicRatingModel: ExtendedModel<PublicRatingDocument>
  ) {}

  list(): Promise<PublicRatingDto[]> {
    return this.publicRatingModel.find();
  }

  create(
    publicRating: CreatePublicRatingDto,
    userId: string
  ): Promise<PublicRatingDto> {
    return dbToInstance(
      PublicRatingDto,
      this.publicRatingModel.createExtended(publicRating, userId)
    );
  }
}
