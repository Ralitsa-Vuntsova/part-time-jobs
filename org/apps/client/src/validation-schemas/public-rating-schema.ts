import { z } from 'zod';
import { CreatePublicRatingDto, UserProfile } from '@shared/data-objects';
import { personalRatingSchema } from './personal-rating-schema';

export const publicRatingSchema = personalRatingSchema.merge(
  z.object({
    rateValue: z.number(),
  })
);

export type PublicRatingSchema = z.infer<typeof publicRatingSchema>;

export const publicRatingsSchema = z
  .object({
    ratings: z.array(publicRatingSchema),
  })
  .superRefine((data, ctx) => {
    data.ratings.forEach((rating, index) => {
      if (rating.comment === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Cannot be empty',
          path: [index, 'comment'],
        });
      }
    });
  });

export type PublicRatingsSchema = z.infer<typeof publicRatingsSchema>;

export function toCreatePublicRatingDto(
  rating: PublicRatingSchema,
  adId: string
): CreatePublicRatingDto {
  return {
    comment: rating.comment,
    rateValue: rating.rateValue,
    userId: rating.userId,
    adId,
  };
}

export function defaultRatings(users: UserProfile[]): PublicRatingSchema[] {
  return users.map((user) => ({
    comment: '',
    rateValue: 1,
    userId: user._id,
  }));
}
