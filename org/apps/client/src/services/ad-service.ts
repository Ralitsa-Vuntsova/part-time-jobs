import { HttpService } from './http-service';
import { CreateAdDto } from '@shared/data-objects';

export class AdService {
  private http = new HttpService();

  createAd(ad: CreateAdDto, abortSignal: AbortSignal) {
    return this.http.post('ads', {
      body: ad,
      abortSignal,
    });
  }
}

export const adService = new AdService();
