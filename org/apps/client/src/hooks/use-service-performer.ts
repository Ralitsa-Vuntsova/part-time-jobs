import { useApplicationResponses } from './use-application-responses';
import { useApplications } from './use-applications';
import { useUsers } from './use-users';

export function useServicePerformer(adId: string) {
  const { data: applications } = useApplications();
  const { data: applicationResponses } = useApplicationResponses();
  const { data: users } = useUsers();

  const adApplication = applications?.find((a) => a.adId === adId);
  const userId = applicationResponses?.find(
    (response) => response.applicationId === adApplication?._id
  )?.createdBy;

  return users?.find(({ _id }) => _id === userId);
}
