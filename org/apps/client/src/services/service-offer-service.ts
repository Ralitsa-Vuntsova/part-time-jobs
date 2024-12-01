import { CreateServiceOfferDto } from '@shared/data-objects';
import { HttpService } from './http-service';

export class ServiceOfferService {
  private http = new HttpService();

  createAd(ad: CreateServiceOfferDto, abortSignal: AbortSignal) {
    return this.http.post('service-offers', {
      body: ad,
      abortSignal,
    });
  }
}

export const serviceOfferService = new ServiceOfferService();
