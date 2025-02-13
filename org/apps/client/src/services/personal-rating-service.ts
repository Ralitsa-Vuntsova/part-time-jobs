import { HttpService } from './http-service';
import {
  CreatePersonalRatingDto,
  PersonalRatingDto,
} from '@shared/data-objects';

export class PersonalRatingService {
  private http = new HttpService();

  listAll(abortSignal: AbortSignal) {
    return this.http.get<PersonalRatingDto[]>('personal-ratings', {
      abortSignal,
    });
  }

  create(personalRating: CreatePersonalRatingDto, abortSignal: AbortSignal) {
    return this.http.post('personal-ratings', {
      body: personalRating,
      abortSignal,
    });
  }
}

export const personalRatingService = new PersonalRatingService();
