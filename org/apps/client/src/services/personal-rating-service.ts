import { HttpService } from './http-service';
import {
  CreatePersonalRatingDto,
  PersonalRatingDto,
} from '@shared/data-objects';

export class PersonalRatingService {
  private http = new HttpService();

  listForUser(abortSignal: AbortSignal) {
    return this.http.get<PersonalRatingDto[]>('personal-ratings', {
      abortSignal,
    });
  }

  create(personalRatings: CreatePersonalRatingDto[], abortSignal: AbortSignal) {
    return this.http.post('personal-ratings', {
      body: personalRatings,
      abortSignal,
    });
  }
}

export const personalRatingService = new PersonalRatingService();
