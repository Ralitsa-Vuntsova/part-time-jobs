import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { dbToInstance } from '../lib/utils';
import { ExtendedModel } from '../lib/db-utils/extended-model';
import {
  ApplicationResponse,
  ApplicationResponseDocument,
  ApplicationResponseDto,
  CreateApplicationResponseDto,
} from '@shared/data-objects';
import { ApplicationResponse as Response } from '@shared/enums';

@Injectable()
export class ApplicationResponsesService {
  constructor(
    @InjectModel(ApplicationResponse.name)
    private appResponseModel: ExtendedModel<ApplicationResponseDocument>
  ) {}

  list() {
    return this.appResponseModel.find();
  }

  async listAccepted() {
    return await this.appResponseModel.find({ response: Response.Accepted });
  }

  create(app: CreateApplicationResponseDto, userId: string) {
    return dbToInstance(
      ApplicationResponseDto,
      this.appResponseModel.createExtended(app, userId)
    );
  }
}
