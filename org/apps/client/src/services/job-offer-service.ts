import {
  CreateJobOfferDto,
  EditJobOfferDto,
  JobOfferDto,
} from '@shared/data-objects';
import { HttpService } from './http-service';

export class JobOfferService {
  private http = new HttpService();

  getById(id: string, abortSignal: AbortSignal) {
    return this.http.get<JobOfferDto>(`job-offers/${id}`, { abortSignal });
  }

  listAll(abortSignal: AbortSignal) {
    return this.http.get<JobOfferDto[]>('job-offers', { abortSignal });
  }

  createAd(ad: CreateJobOfferDto, abortSignal: AbortSignal) {
    return this.http.post('job-offers', {
      body: ad,
      abortSignal,
    });
  }

  editAd(id: string, ad: EditJobOfferDto, abortSignal: AbortSignal) {
    return this.http.patch(`job-offers/${id}`, {
      body: ad,
      abortSignal,
    });
  }

  unarchiveAd(id: string, abortSignal: AbortSignal) {
    return this.http.patch(`job-offers/unarchive/${id}`, { abortSignal });
  }
}

export const jobOfferService = new JobOfferService();
