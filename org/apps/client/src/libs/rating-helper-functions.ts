import {
  JobOfferDto,
  PersonalRatingDto,
  UserProfile,
} from '@shared/data-objects';
import { useCurrentUser } from '../hooks/use-current-user';
import { useApplications } from '../hooks/use-applications';
import { useApplicationResponses } from '../hooks/use-application-responses';

export function filterRatingsByTerm(
  ratings: PersonalRatingDto[],
  ads: JobOfferDto[],
  users: UserProfile[],
  searchTerm: string
) {
  const query = searchTerm.toLowerCase();

  const currentUser = useCurrentUser();
  const { data: applications } = useApplications();
  const { data: applicationResponses } = useApplicationResponses();

  return ratings.filter((rating) => {
    const ad = ads.find(({ _id }) => _id === rating.adId);
    const adApplication = applications?.find((a) => a.adId === rating.adId);
    const servicePerformerId = applicationResponses?.find(
      (response) => response.applicationId === adApplication?._id
    )?.createdBy;

    const adCreator = users.find(({ _id }) => _id === ad?.createdBy);
    const servicePerformer = users.find(
      ({ _id }) => _id === servicePerformerId
    );

    // Gets the user which the rating was submitted for
    // TODO [future]: Consider storing the user id in the db
    const user =
      currentUser?._id === adCreator?._id ? servicePerformer : adCreator;

    return (
      ad?.name.toLowerCase().includes(query) ||
      user?.firstName.toLowerCase().includes(query) ||
      user?.lastName.toLowerCase().includes(query)
    );
  });
}
