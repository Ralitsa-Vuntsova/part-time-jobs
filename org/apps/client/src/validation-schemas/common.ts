import dayjs from 'dayjs';
import { z } from 'zod';

export const notEmpty = z.string().trim().min(1, { message: 'Required' });
export const longString = z
  .string()
  .trim()
  .min(5, { message: 'Required - at least 5 characters' });
export const multilineString = z
  .string()
  .trim()
  .min(100, { message: 'Required - at least 100 characters' });

export const dayjsDate = z.any().transform(dayjs);
