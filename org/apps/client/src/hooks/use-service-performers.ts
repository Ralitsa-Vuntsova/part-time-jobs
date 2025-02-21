import { getServicePerformerIds } from '../libs/rating-helper-functions';
import { useApplicationResponses } from './use-application-responses';
import { useApplications } from './use-applications';

export function useServicePerformers(adId: string) {
  const { data: applications } = useApplications();
  const { data: applicationResponses } = useApplicationResponses();

  return getServicePerformerIds(adId, applications, applicationResponses);
}
