import { z } from 'zod';
import { dayjsDate, longString, nonZero } from './common';
import { serviceOfferCreationSchema } from './service-offer-creation-schema';
import { CreateJobOfferDto, ResultUserDto } from '@shared/data-objects';

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
      date: dt.date.format(),
      time: dt.time.format('HH:mm:ss'),
    })),
    location: ad.location,
    personNumber: ad.personNumber,
    qualification: ad.qualification,
    duration: ad.duration,
    urgency: ad.duration,
    difficulty: ad.difficulty,
  };
}

export function defaultValues(currentUser: ResultUserDto | undefined) {
  return {
    name: '',
    description: '',
    additionalInformation: '',
    contacts: currentUser
      ? [
          {
            name: currentUser.username,
            email: currentUser.email,
            phoneNumber: '',
            address: '',
          },
        ]
      : [
          {
            name: '',
            email: '',
            phoneNumber: '',
            address: '',
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
