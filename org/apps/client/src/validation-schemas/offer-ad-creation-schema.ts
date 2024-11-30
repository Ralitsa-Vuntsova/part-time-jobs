import { z } from 'zod';
import { adCreationSchema } from './ad-creation-schema';
import { dayjsDate, longString } from './common';
import { CreateOfferAdDto } from '@shared/data-objects';

export const offerAdCreationSchema = adCreationSchema.merge(
  z.object({
    dateTime: z.array(
      z.object({
        time: dayjsDate,
        date: dayjsDate,
      })
    ),
    location: longString,
    personNumber: z.number(),
    qualification: z.string(),
    duration: z.string(),
    urgency: z.string(),
    difficulty: z.string(),
  })
);

export type OfferAdCreationSchema = z.infer<typeof offerAdCreationSchema>;

export function toCreateOfferAdDto(
  ad: OfferAdCreationSchema
): CreateOfferAdDto {
  return {
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
