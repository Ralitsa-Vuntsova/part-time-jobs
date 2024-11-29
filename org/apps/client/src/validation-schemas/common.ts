import { z } from 'zod';

export const notEmpty = z.string().trim().min(1, { message: 'Required' });
export const longString = z.string().trim().min(5, { message: 'Required' });
