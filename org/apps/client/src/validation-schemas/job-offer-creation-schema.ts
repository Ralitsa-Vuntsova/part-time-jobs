import { z } from 'zod';
import { dayjsDate, longString, nonZero } from './common';
import { serviceOfferCreationSchema } from './service-offer-creation-schema';
import { CreateJobOfferDto, UserProfile } from '@shared/data-objects';
import { DateFormats } from '../libs/dates';

export const jobOfferCreationSchema = serviceOfferCreationSchema.merge(
  z.object({
    dateTime: z.array(
      z.object({
        time: dayjsDate,
        date: dayjsDate,
      })
    ),
    location: longString,
    personNumber: nonZero,
    qualification: longString,
    duration: longString,
    urgency: z.string(),
    difficulty: z.string(),
  })
);

export type JobOfferCreationSchema = z.infer<typeof jobOfferCreationSchema>;

export function toCreateJobOfferDto(
  ad: JobOfferCreationSchema
): CreateJobOfferDto {
  return {
    name: ad.name,
    description: ad.description,
    additionalInformation: ad.additionalInformation,
    contacts: ad.contacts,
    dateTime: ad.dateTime.map((dt) => ({
      date: dt.date.format(DateFormats.ISODate),
      time: dt.time.format(DateFormats.Time),
    })),
    location: ad.location,
    personNumber: ad.personNumber,
    qualification: ad.qualification,
    duration: ad.duration,
    urgency: ad.urgency,
    difficulty: ad.difficulty,
  };
}

export function defaultValues(userData: UserProfile) {
  return {
    name: '',
    description: '',
    additionalInformation: '',
    contacts: [
      {
        name: userData.username,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        address: userData.address,
      },
    ],
    dateTime: [],
    location: '',
    personNumber: 0,
    qualification: '',
    duration: '',
    urgency: '',
    difficulty: '',
  };
}
