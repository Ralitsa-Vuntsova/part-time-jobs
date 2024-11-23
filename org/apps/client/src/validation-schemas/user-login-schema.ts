import { z } from 'zod';
import { notEmpty } from './common';
import { LoginUserDto } from '@shared/data-objects';

// TODO: Add validation for wrong credentials
export const userLoginSchema = z.object({
  username: notEmpty,
  password: notEmpty,
});

export type UserLoginSchema = z.infer<typeof userLoginSchema>;

export function toCreateUserDto(user: UserLoginSchema): LoginUserDto {
  return {
    username: user.username,
    password: user.password,
  };
}
