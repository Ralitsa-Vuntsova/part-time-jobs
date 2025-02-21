import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { dbToInstance } from '../lib/utils';
import { ExtendedModel } from '../lib/db-utils/extended-model';
import {
  CreatePersonalRatingDto,
  PersonalRating,
  PersonalRatingDocument,
  PersonalRatingDto,
} from '@shared/data-objects';

@Injectable()
export class PersonalRatingsService {
  constructor(
    @InjectModel(PersonalRating.name)
    private personalRatingModel: ExtendedModel<PersonalRatingDocument>
  ) {}

  listForUser(userId: string): Promise<PersonalRatingDto[]> {
    return this.personalRatingModel
      .find({ createdBy: userId })
      .sort({ createdAt: -1 });
  }

  create(
    personalRating: CreatePersonalRatingDto,
    userId: string
  ): Promise<PersonalRatingDto> {
    return dbToInstance(
      PersonalRatingDto,
      this.personalRatingModel.createExtended(personalRating, userId)
    );
  }
}
