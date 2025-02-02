import { z } from 'zod';
import {
  EditServiceOfferDto,
  ServiceOfferDto,
  UserProfile,
} from '@shared/data-objects';
import {
  serviceOfferCreationSchema,
  toCreateServiceOfferDto,
} from './service-offer-creation-schema';
import { defaultValues as defaults } from './service-offer-creation-schema';
import { ArchiveReason } from '@shared/enums';

export const serviceOfferEditSchema = serviceOfferCreationSchema
  .pick({
    name: true,
    description: true,
    additionalInformation: true,
    contacts: true,
  })
  .merge(
    z.object({
      archiveReason: z.nativeEnum(ArchiveReason).optional(),
    })
  );

export type ServiceOfferEditSchema = z.infer<typeof serviceOfferEditSchema>;

export function toEditServiceOfferDto(
  ad: ServiceOfferEditSchema
): EditServiceOfferDto {
  return {
    ...toCreateServiceOfferDto(ad),
    archiveReason: ad.archiveReason,
  };
}

export function defaultValues(
  userData: UserProfile,
  ad?: ServiceOfferDto
): ServiceOfferEditSchema {
  return {
    ...defaults(userData, ad),
    contacts: ad?.contacts ?? [
      {
        name: userData.username,
        email: userData.email,
        phoneNumber: userData.phoneNumber ?? '',
        address: userData.address ?? '',
      },
    ],
    archiveReason: ad?.archiveReason,
  };
}
