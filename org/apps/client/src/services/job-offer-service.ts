import { CreateJobOfferDto, JobOfferDto } from '@shared/data-objects';
import { HttpService } from './http-service';

export class JobOfferService {
  private http = new HttpService();

  listAll(abortSignal: AbortSignal) {
    return this.http.get<JobOfferDto[]>('job-offers', { abortSignal });
  }

  createAd(ad: CreateJobOfferDto, abortSignal: AbortSignal) {
    return this.http.post('job-offers', {
      body: ad,
      abortSignal,
    });
  }
}

export const jobOfferService = new JobOfferService();
