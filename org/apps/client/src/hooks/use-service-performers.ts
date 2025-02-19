import { getServicePerformers } from '../libs/rating-helper-functions';
import { useApplicationResponses } from './use-application-responses';
import { useApplications } from './use-applications';
import { useUsers } from './use-users';

export function useServicePerformers(adId: string) {
  const { data: applications } = useApplications();
  const { data: applicationResponses } = useApplicationResponses();
  const { data: users } = useUsers();

  return getServicePerformers(adId, users, applications, applicationResponses);
}
