import { ApplicationResponse } from '@shared/enums';
import { useApplicationResponses } from './use-application-responses';
import { useApplications } from './use-applications';

export function useAdAcceptedApplications(adId: string) {
  const { data: applications } = useApplications();
  const { data: applicationResponses } = useApplicationResponses();

  const adApplicationsIds = applications
    ?.filter((a) => a.adId === adId)
    .map(({ _id }) => _id);
  const adApplicationResponses = applicationResponses?.filter(
    (response) =>
      adApplicationsIds?.includes(response.applicationId) &&
      response.response === ApplicationResponse.Accepted
  );

  return applications?.filter((app) =>
    adApplicationResponses?.some((res) => res.applicationId === app._id)
  );
}
