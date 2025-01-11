import { z } from 'zod';
import { longString, multilineString } from './common';
import { CreateApplicationDto } from '@shared/data-objects';

export const applicationSchema = z.object({
  reason: multilineString,
  dateTime: longString,
  personNumber: z.number(),
  additionalInformation: z.ostring(),
});

export type ApplicationSchema = z.infer<typeof applicationSchema>;

export function toCreateApplicationDto(
  adId: string,
  app: ApplicationSchema
): CreateApplicationDto {
  return {
    adId,
    reason: app.reason,
    personNumber: app.personNumber,
    dateTime: app.dateTime,
    additionalInformation: app.additionalInformation,
  };
}
