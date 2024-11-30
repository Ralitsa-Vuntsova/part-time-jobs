import { HttpService } from './http-service';
import { CreateSearchAdDto } from '@shared/data-objects';

export class SearchAdService {
  private http = new HttpService();

  createAd(ad: CreateSearchAdDto, abortSignal: AbortSignal) {
    return this.http.post('search-ads', {
      body: ad,
      abortSignal,
    });
  }
}

export const adService = new SearchAdService();
