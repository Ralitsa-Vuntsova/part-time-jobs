import { HttpService } from './http-service';
import {
  ApplicationResponseDto,
  CreateApplicationResponseDto,
} from '@shared/data-objects';

export class ApplicationResponseService {
  private http = new HttpService();

  listAll(abortSignal: AbortSignal) {
    return this.http.get<ApplicationResponseDto[]>('application-responses', {
      abortSignal,
    });
  }

  create(app: CreateApplicationResponseDto, abortSignal: AbortSignal) {
    return this.http.post('application-responses', {
      body: app,
      abortSignal,
    });
  }
}

export const applicationResponseService = new ApplicationResponseService();
