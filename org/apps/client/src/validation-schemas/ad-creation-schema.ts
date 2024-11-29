import { z } from 'zod';
import { longString, notEmpty } from './common';
import validator from 'validator';
import { CreateAdDto } from '@shared/data-objects';

const contactSchema = z.object({
  name: longString,
  email: z.string().email(),
  phoneNumber: z.string().refine(validator.isMobilePhone),
  location: longString,
});

export type ContactSchema = z.infer<typeof contactSchema>;

export const adCreationSchema = z.object({
  description: notEmpty,
  additionalInformation: z.ostring(),
  contacts: z.array(contactSchema),
});

export type AdCreationSchema = z.infer<typeof adCreationSchema>;

export function toCreateAdDto(ad: AdCreationSchema): CreateAdDto {
  return {
    description: ad.description,
    additionalInformation: ad.additionalInformation,
    contacts: ad.contacts,
  };
}
