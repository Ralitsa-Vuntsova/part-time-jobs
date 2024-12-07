import dayjs from 'dayjs';
import { z } from 'zod';
import validator from 'validator';

export const notEmpty = z.string().trim().min(1, { message: 'Required' });
export const nonZero = z.number().refine((num) => num !== 0, 'Cannot be zero');
export const longString = z
  .string()
  .trim()
  .min(5, { message: 'Required - at least 5 characters' });
export const multilineString = z
  .string()
  .trim()
  .min(100, { message: 'Required - at least 100 characters' });

export const dayjsDate = z.any().transform(dayjs);

export const phoneNumber = z.string().refine(validator.isMobilePhone);
