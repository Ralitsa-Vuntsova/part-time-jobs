import { z } from 'zod';
import { longString, multilineString } from './common';
import validator from 'validator';
import { CreateSearchAdDto } from '@shared/data-objects';

const contactSchema = z.object({
  name: longString,
  email: z.string().email(),
  phoneNumber: z.string().refine(validator.isMobilePhone),
  address: longString,
});

export type ContactSchema = z.infer<typeof contactSchema>;

export const adCreationSchema = z.object({
  description: multilineString,
  additionalInformation: z.ostring(),
  contacts: z.array(contactSchema),
});

export type AdCreationSchema = z.infer<typeof adCreationSchema>;

export function toCreateSearchAdDto(ad: AdCreationSchema): CreateSearchAdDto {
  return {
    description: ad.description,
    additionalInformation: ad.additionalInformation,
    contacts: ad.contacts,
  };
}
