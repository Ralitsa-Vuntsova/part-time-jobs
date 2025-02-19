import { z } from 'zod';
import { CreatePersonalRatingDto, UserProfile } from '@shared/data-objects';

export const personalRatingSchema = z.object({
  comment: z.string(),
  userId: z.string(),
});

export type PersonalRatingSchema = z.infer<typeof personalRatingSchema>;

export const personalRatingsSchema = z
  .object({
    ratings: z.array(personalRatingSchema),
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

export type PersonalRatingsSchema = z.infer<typeof personalRatingsSchema>;

export function toCreatePersonalRatingDto(
  rating: PersonalRatingSchema,
  adId: string
): CreatePersonalRatingDto {
  return {
    comment: rating.comment,
    userId: rating.userId,
    adId,
  };
}

export function defaultRatings(users: UserProfile[]): PersonalRatingSchema[] {
  return users.map((user) => ({
    comment: '',
    userId: user._id,
  }));
}
