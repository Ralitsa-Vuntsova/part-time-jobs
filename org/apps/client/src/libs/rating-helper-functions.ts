import {
  ApplicationDto,
  ApplicationResponseDto,
  JobOfferDto,
  PersonalRatingDto,
  UserProfile,
} from '@shared/data-objects';
import { getAdApplicationResponses } from './application-helper-functions';

export function getServicePerformerIds(
  adId: string,
  applications: ApplicationDto[] | undefined,
  applicationResponses: ApplicationResponseDto[] | undefined
) {
  const adApplicationResponses = getAdApplicationResponses(
    adId,
    applications,
    applicationResponses
  );

  const acceptedApplications = applications?.filter((app) =>
    adApplicationResponses?.some((res) => res.applicationId === app._id)
  );

  return acceptedApplications?.map(({ createdBy }) => createdBy);
}

export function filterRatingsByTerm(
  ratings: PersonalRatingDto[],
  ads: JobOfferDto[],
  users: UserProfile[],
  searchTerm: string
) {
  const query = searchTerm.toLowerCase();

  return ratings.filter((rating) => {
    const ad = ads.find(({ _id }) => _id === rating.adId);
    const user = users.find(({ _id }) => _id === rating.userId);

    return (
      ad?.name.toLowerCase().includes(query) ||
      user?.firstName.toLowerCase().includes(query) ||
      user?.lastName.toLowerCase().includes(query)
    );
  });
}
