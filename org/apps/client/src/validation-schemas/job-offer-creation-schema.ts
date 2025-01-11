import { z } from 'zod';
import { longString, nonZero } from './common';
import { serviceOfferCreationSchema } from './service-offer-creation-schema';
import {
  CreateJobOfferDto,
  JobOfferDto,
  UserProfile,
} from '@shared/data-objects';
import { Currency, Payment } from '@shared/enums';

export const priceSchema = z.object({
  value: z.number(),
  payment: z.nativeEnum(Payment),
  currency: z.nativeEnum(Currency),
  byNegotiation: z.boolean().default(false),
});

export const jobOfferCreationSchema = serviceOfferCreationSchema.merge(
  z.object({
    dateTime: longString,
    location: longString,
    personNumber: nonZero,
    qualification: longString,
    duration: longString,
    urgency: z.ostring(),
    difficulty: z.ostring(),
    price: priceSchema,
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
    dateTime: ad.dateTime,
    location: ad.location,
    personNumber: ad.personNumber,
    qualification: ad.qualification,
    duration: ad.duration,
    urgency: ad.urgency,
    difficulty: ad.difficulty,
    price: ad.price,
  };
}

export function defaultValues(userData: UserProfile, ad?: JobOfferDto) {
  return {
    name: ad?.name ?? '',
    description: ad?.description ?? '',
    additionalInformation: ad?.additionalInformation ?? '',
    contacts: ad?.contacts ?? [
      {
        name: userData.username,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        address: userData.address,
      },
    ],
    dateTime: ad?.dateTime ?? '',
    location: ad?.location ?? '',
    personNumber: ad?.personNumber ?? 0,
    qualification: ad?.qualification ?? '',
    duration: ad?.duration ?? '',
    urgency: ad?.urgency ?? '',
    difficulty: ad?.difficulty ?? '',
    price: ad?.price ?? {
      value: 0,
      currency: Currency.BGN,
      payment: Payment.TotalAmount,
      byNegotiation: false,
    },
  };
}
