import {
  ApplicationDto,
  ApplicationResponseDto,
  JobOfferDto,
  PersonalRatingDto,
  UserProfile,
} from '@shared/data-objects';

export function getServicePerformer(
  adId: string,
  users: UserProfile[] | undefined,
  applications: ApplicationDto[] | undefined,
  applicationResponses: ApplicationResponseDto[] | undefined
) {
  const adApplication = applications?.find((a) => a.adId === adId);
  const servicePerformerId = applicationResponses?.find(
    (response) => response.applicationId === adApplication?._id
  )?.createdBy;

  return users?.find(({ _id }) => _id === servicePerformerId);
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
