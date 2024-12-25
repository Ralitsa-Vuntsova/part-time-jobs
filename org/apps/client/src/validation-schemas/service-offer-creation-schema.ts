import { z } from 'zod';
import { longString, multilineString, phoneNumber } from './common';
import {
  CreateServiceOfferDto,
  ServiceOfferDto,
  UserProfile,
} from '@shared/data-objects';

const contactSchema = z.object({
  name: longString,
  email: z.string().email(),
  phoneNumber: phoneNumber,
  address: longString,
});

export type ContactSchema = z.infer<typeof contactSchema>;

export const serviceOfferCreationSchema = z.object({
  name: longString,
  description: multilineString,
  additionalInformation: z.ostring(),
  contacts: z.array(contactSchema),
});

export type ServiceOfferCreationSchema = z.infer<
  typeof serviceOfferCreationSchema
>;

export function toCreateServiceOfferDto(
  ad: ServiceOfferCreationSchema
): CreateServiceOfferDto {
  return {
    name: ad.name,
    description: ad.description,
    additionalInformation: ad.additionalInformation,
    contacts: ad.contacts,
  };
}

export function defaultValues(userData: UserProfile, ad?: ServiceOfferDto) {
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
  };
}
