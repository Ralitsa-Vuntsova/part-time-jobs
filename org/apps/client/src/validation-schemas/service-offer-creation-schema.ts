import { z } from 'zod';
import { longString, multilineString, phoneNumber } from './common';
import { CreateServiceOfferDto, ResultUserDto } from '@shared/data-objects';

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
  };
}
