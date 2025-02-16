import { HttpService } from './http-service';
import { CreatePublicRatingDto, PublicRatingDto } from '@shared/data-objects';

export class PublicRatingService {
  private http = new HttpService();

  listAll(abortSignal: AbortSignal) {
    return this.http.get<PublicRatingDto[]>('public-ratings', {
      abortSignal,
    });
  }

  create(publicRating: CreatePublicRatingDto, abortSignal: AbortSignal) {
    return this.http.post('public-ratings', {
      body: publicRating,
      abortSignal,
    });
  }
}

export const publicRatingService = new PublicRatingService();
