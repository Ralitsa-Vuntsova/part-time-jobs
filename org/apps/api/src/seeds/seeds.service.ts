import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  JobOffer,
  JobOfferDocument,
  ServiceOffer,
  ServiceOfferDocument,
  User,
  UserDocument,
} from '@shared/data-objects';
import { Model } from 'mongoose';
import { getJobOffers, getServiceOffers, getUsers } from './utils';
import { ExtendedModel } from '../lib/db-utils/extended-model';

@Injectable()
export class SeedsService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(JobOffer.name)
    private jobOfferModel: ExtendedModel<JobOfferDocument>,
    @InjectModel(ServiceOffer.name)
    private serviceOfferModel: ExtendedModel<ServiceOfferDocument>
  ) {}

  async runSeed() {
    const users = getUsers();
    const jobOfferAds = getJobOffers();
    const serviceOfferAds = getServiceOffers();

    const alreadyExistingUsers = (await this.userModel.find()).map(
      ({ username }) => username
    );
    const alreadyExistingJobOffers = (await this.jobOfferModel.find()).map(
      ({ name, description }) => `${name}-${description}`
    );
    const alreadyExistingServiceOffers = (
      await this.serviceOfferModel.find()
    ).map(({ name, description }) => `${name}-${description}`);

    const filteredUsers = users.filter(
      ({ username }) => !alreadyExistingUsers.includes(username)
    );
    const filteredJobOfferAds = jobOfferAds.filter(
      ({ name, description }) =>
        !alreadyExistingJobOffers.includes(`${name}-${description}`)
    );
    const filteredServiceOfferAds = serviceOfferAds.filter(
      ({ name, description }) =>
        !alreadyExistingServiceOffers.includes(`${name}-${description}`)
    );

    await this.userModel.insertMany(filteredUsers);
    await this.jobOfferModel.insertMany(filteredJobOfferAds);
    await this.serviceOfferModel.insertMany(filteredServiceOfferAds);
  }
}
