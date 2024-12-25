import { z } from 'zod';
import { EditUserDto, UserProfile } from '@shared/data-objects';
import { userCreationSchema } from './user-creation-schema';
import validator from 'validator';

export const userEditSchema = userCreationSchema
  .pick({
    firstName: true,
    lastName: true,
    email: true,
  })
  .merge(
    z.object({
      phoneNumber: z.ostring(),
      address: z.ostring(),
    })
  )
  .superRefine((data, ctx) => {
    if (data.address && data.address.length < 5) {
      ctx.addIssue({
        message: 'Required - at least 5 characters',
        code: z.ZodIssueCode.custom,
      });
    }

    if (data.phoneNumber && !validator.isMobilePhone(data.phoneNumber)) {
      ctx.addIssue({
        message: 'Invalid mobile phone number',
        code: z.ZodIssueCode.custom,
      });
    }
  });

export type UserEditSchema = z.infer<typeof userEditSchema>;

export function toEditUserDto(user: UserEditSchema): EditUserDto {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phoneNumber: user.phoneNumber ?? '',
    address: user.address ?? '',
  };
}

export function defaultValues(userData: UserProfile): UserEditSchema {
  return {
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    phoneNumber: userData.phoneNumber ?? '',
    address: userData.address ?? '',
  };
}
