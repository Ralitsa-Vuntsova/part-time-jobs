import { CreateOfferAdDto } from '@shared/data-objects';
import { HttpService } from './http-service';

export class OfferAdService {
  private http = new HttpService();

  createAd(ad: CreateOfferAdDto, abortSignal: AbortSignal) {
    return this.http.post('offer-ads', {
      body: ad,
      abortSignal,
    });
  }
}

export const offerAdService = new OfferAdService();
