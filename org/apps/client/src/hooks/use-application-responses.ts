import { applicationResponseService } from '../services/application-response-service';
import { useAsync } from './use-async';

export function useApplicationResponses() {
  return useAsync(
    async ({ signal }) => applicationResponseService.listAll(signal),
    []
  );
}
