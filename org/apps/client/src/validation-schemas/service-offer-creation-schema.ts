import { z } from 'zod';
import { longString, multilineString } from './common';
import validator from 'validator';
import { CreateServiceOfferDto, ResultUserDto } from '@shared/data-objects';

const contactSchema = z.object({
  name: longString,
  email: z.string().email(),
  phoneNumber: z.string().refine(validator.isMobilePhone),
  address: longString,
});

export type ContactSchema = z.infer<typeof contactSchema>;

export const serviceOfferCreationSchema = z.object({
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
    description: ad.description,
    additionalInformation: ad.additionalInformation,
    contacts: ad.contacts,
  };
}

export function defaultValues(currentUser: ResultUserDto | undefined) {
  return {
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
