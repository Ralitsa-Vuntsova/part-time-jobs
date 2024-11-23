import { z } from 'zod';
import { notEmpty } from './common';
import { CreateUserDto } from '@shared/data-objects';

const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

export const userCreationSchema = z.object({
  username: notEmpty,
  password: z
    .string()
    .min(1, { message: 'Required' })
    .regex(passwordValidation, {
      message: 'Password must contain minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character',
  }),
  confirmPassword: notEmpty,
  firstName: notEmpty,
  lastName: notEmpty,
  email: z.string().email(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export type UserCreationSchema = z.infer<typeof userCreationSchema>;

export function toCreateUserDto(user: UserCreationSchema): CreateUserDto {
  return {
    username: user.username,
    password: user.password,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  }
}
