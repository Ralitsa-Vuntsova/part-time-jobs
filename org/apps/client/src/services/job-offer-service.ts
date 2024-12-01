import { CreateJobOfferDto } from '@shared/data-objects';
import { HttpService } from './http-service';

export class JobOfferService {
  private http = new HttpService();

  createAd(ad: CreateJobOfferDto, abortSignal: AbortSignal) {
    return this.http.post('offer-ads', {
      body: ad,
      abortSignal,
    });
  }
}

export const jobOfferService = new JobOfferService();
