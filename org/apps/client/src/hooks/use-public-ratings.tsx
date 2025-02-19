import { publicRatingService } from '../services/public-rating-service';
import { useAsync } from './use-async';

export function usePublicRatings() {
  return useAsync(
    async ({ signal }) => publicRatingService.listAll(signal),
    []
  );
}
