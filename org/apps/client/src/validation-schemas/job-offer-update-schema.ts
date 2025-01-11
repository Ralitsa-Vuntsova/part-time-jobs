import { z } from 'zod';
import {
  EditJobOfferDto,
  JobOfferDto,
  UserProfile,
} from '@shared/data-objects';
import {
  jobOfferCreationSchema,
  toCreateJobOfferDto,
} from './job-offer-creation-schema';
import { defaultValues as defaults } from './job-offer-creation-schema';

export const jobOfferEditSchema = jobOfferCreationSchema
  .pick({
    name: true,
    description: true,
    additionalInformation: true,
    contacts: true,
    dateTime: true,
    location: true,
    personNumber: true,
    qualification: true,
    duration: true,
    urgency: true,
    difficulty: true,
    price: true,
  })
  .merge(
    z.object({
      isArchieved: z.boolean(),
    })
  );

export type JobOfferEditSchema = z.infer<typeof jobOfferEditSchema>;

export function toEditJobOfferDto(ad: JobOfferEditSchema): EditJobOfferDto {
  return {
    ...toCreateJobOfferDto(ad),
    isArchieved: ad.isArchieved,
  };
}

export function defaultValues(
  userData: UserProfile,
  ad?: JobOfferDto
): JobOfferEditSchema {
  return {
    ...defaults(userData, ad),
    contacts: ad?.contacts ?? [
      {
        name: userData.username,
        email: userData.email,
        phoneNumber: userData.phoneNumber ?? '',
        address: userData.address ?? '',
      },
    ],
    isArchieved: ad?.isArchieved ?? false,
  };
}
