import { CreateServiceOfferDto, ServiceOfferDto } from '@shared/data-objects';
import { HttpService } from './http-service';

export class ServiceOfferService {
  private http = new HttpService();

  getById(id: string, abortSignal: AbortSignal) {
    return this.http.get<ServiceOfferDto>(`service-offers/${id}`, {
      abortSignal,
    });
  }

  listAll(abortSignal: AbortSignal) {
    return this.http.get<ServiceOfferDto[]>('service-offers', { abortSignal });
  }

  createAd(ad: CreateServiceOfferDto, abortSignal: AbortSignal) {
    return this.http.post('service-offers', {
      body: ad,
      abortSignal,
    });
  }
}

export const serviceOfferService = new ServiceOfferService();
