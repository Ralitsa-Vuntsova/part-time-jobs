import { sumBy } from 'lodash';
import { usePublicRatings } from './use-public-ratings';
import { useUserById } from './use-user-by-id';

export function useUserRating(userId: string) {
  const { data: publicRatings } = usePublicRatings();
  const { data: user } = useUserById(userId);

  const userRatings = publicRatings?.filter((r) => r.userId === userId);

  if (!userRatings || userRatings.length === 0) {
    return {
      user,
      averageRating: 0,
      ratings: [],
    };
  }

  return {
    user,
    averageRating: sumBy(userRatings, (r) => r.rateValue) / userRatings.length,
    ratings: userRatings,
  };
}
