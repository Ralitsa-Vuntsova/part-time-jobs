import { sumBy } from 'lodash';
import { usePublicRatings } from './use-public-ratings';
import { useUsers } from './use-users';

export function useUserRating(userId: string) {
  const { data: publicRatings } = usePublicRatings();
  const { data: users } = useUsers();

  const user = users?.find(({ _id }) => _id === userId);
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
