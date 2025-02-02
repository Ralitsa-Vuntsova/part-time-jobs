import { z } from 'zod';
import { CreateApplicationResponseDto } from '@shared/data-objects';
import { ApplicationResponse } from '@shared/enums';

export const applicationResponseSchema = z.object({
  personNumber: z.onumber(),
  response: z.string(),
});

export type ApplicationResponseSchema = z.infer<
  typeof applicationResponseSchema
>;

export function toCreateApplicationResponseDto(
  applicationId: string,
  applicationResponse: ApplicationResponseSchema
): CreateApplicationResponseDto {
  return {
    applicationId,
    response: applicationResponse.response as ApplicationResponse,
    personNumber: applicationResponse.personNumber,
  };
}
