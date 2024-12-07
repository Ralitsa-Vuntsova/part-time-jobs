import { z } from 'zod';
import { longString, phoneNumber } from './common';
import { EditUserDto, UserProfile } from '@shared/data-objects';

export const userEditSchema = z.object({
  firstName: longString,
  lastName: longString,
  email: z.string().email(),
  phoneNumber: phoneNumber.optional(),
  address: longString.optional(),
});

export type UserEditSchema = z.infer<typeof userEditSchema>;

export function toEditUserDto(user: UserEditSchema): Partial<EditUserDto> {
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
