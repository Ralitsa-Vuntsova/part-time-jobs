import { z } from 'zod';
import { longString } from './common';
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

export const personNumberSchema = z
  .object({
    value: z.number(),
    notSure: z.boolean().default(false),
  })
  .superRefine((data, ctx) => {
    if (data.value === 0 && !data.notSure) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Cannot be zero',
        path: ['value'],
      });
    }
  });

export const jobOfferCreationSchema = serviceOfferCreationSchema.merge(
  z.object({
    dateTime: longString,
    location: longString,
    personNumber: personNumberSchema,
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
        phoneNumber: userData.phoneNumber ?? '',
        address: userData.address ?? '',
      },
    ],
    dateTime: ad?.dateTime ?? '',
    location: ad?.location ?? '',
    personNumber: ad?.personNumber ?? {
      value: 0,
      notSure: false,
    },
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
