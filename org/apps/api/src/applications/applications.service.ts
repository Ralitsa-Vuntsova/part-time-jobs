import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { dbToInstance } from '../lib/utils';
import { ExtendedModel } from '../lib/db-utils/extended-model';
import {
  Application,
  ApplicationDocument,
  ApplicationDto,
  CreateApplicationDto,
} from '@shared/data-objects';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectModel(Application.name)
    private appModel: ExtendedModel<ApplicationDocument>
  ) {}

  list() {
    return this.appModel.find();
  }

  listByIds(applicationIds: string[], userId: string) {
    return this.appModel.find({ _id: applicationIds, createdBy: userId });
  }

  create(app: CreateApplicationDto, userId: string) {
    return dbToInstance(
      ApplicationDto,
      this.appModel.createExtended(app, userId)
    );
  }
}
