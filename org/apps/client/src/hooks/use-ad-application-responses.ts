import { useApplicationResponses } from './use-application-responses';
import { useApplications } from './use-applications';
import { getAdApplicationResponses } from '../libs/application-helper-functions';

export function useAdAcceptedApplications(adId: string) {
  const { data: applications } = useApplications();
  const { data: applicationResponses } = useApplicationResponses();

  const adApplicationResponses = getAdApplicationResponses(
    adId,
    applications,
    applicationResponses
  );

  return applications?.filter((app) =>
    adApplicationResponses?.some((res) => res.applicationId === app._id)
  );
}
