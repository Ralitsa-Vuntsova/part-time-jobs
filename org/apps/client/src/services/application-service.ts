import { HttpService } from './http-service';
import { ApplicationDto, CreateApplicationDto } from '@shared/data-objects';

export class ApplicationService {
  private http = new HttpService();

  listAll(abortSignal: AbortSignal) {
    return this.http.get<ApplicationDto[]>('applications', { abortSignal });
  }

  apply(app: CreateApplicationDto, abortSignal: AbortSignal) {
    return this.http.post('applications', {
      body: app,
      abortSignal,
    });
  }
}

export const applicationService = new ApplicationService();
