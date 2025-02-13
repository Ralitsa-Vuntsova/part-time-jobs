import { applicationService } from '../services/application-service';
import { useAsync } from './use-async';

export function useApplications() {
  return useAsync(async ({ signal }) => applicationService.listAll(signal), []);
}
