import { usePublicRatings } from './use-public-ratings';

export function useUserRatings(userId: string) {
  const { data: publicRatings } = usePublicRatings();

  return publicRatings?.filter((r) => r.userId === userId);
}
