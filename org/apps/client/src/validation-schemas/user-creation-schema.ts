import { z } from 'zod';
import { longString, notEmpty } from './common';
import { CreateUserDto } from '@shared/data-objects';

const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

export const userCreationSchema = z
  .object({
    username: longString,
    password: z.string().regex(passwordValidation, {
      message:
        'Password must contain minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character',
    }),
    confirmPassword: notEmpty,
    firstName: longString,
    lastName: longString,
    email: z.string().email(),
  })
  .refine((data) => data.password === data.confirmPassword, {
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
  };
}

export function defaultValues() {
  return {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    address: '',
  };
}
