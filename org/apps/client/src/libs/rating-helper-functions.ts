import {
  ApplicationDto,
  ApplicationResponseDto,
  JobOfferDto,
  PersonalRatingDto,
  UserProfile,
} from '@shared/data-objects';
import { ApplicationResponse } from '@shared/enums';

export function getServicePerformers(
  adId: string,
  users: UserProfile[] | undefined,
  applications: ApplicationDto[] | undefined,
  applicationResponses: ApplicationResponseDto[] | undefined
) {
  const adApplicationsIds = applications
    ?.filter((a) => a.adId === adId)
    .map(({ _id }) => _id);
  const adApplicationResponses = applicationResponses?.filter(
    (response) =>
      adApplicationsIds?.includes(response.applicationId) &&
      response.response === ApplicationResponse.Accepted
  );

  const acceptedApplications = applications?.filter((app) =>
    adApplicationResponses?.some((res) => res.applicationId === app._id)
  );
  const servicePerformers = acceptedApplications?.map(
    ({ createdBy }) => createdBy
  );

  return users?.filter(({ _id }) => servicePerformers?.includes(_id));
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
