import {
  ApplicationDto,
  ApplicationResponseDto,
  JobOfferDto,
  PersonalRatingDto,
  ResultUserDto,
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
  currentUser: ResultUserDto | undefined,
  applications: ApplicationDto[] | undefined,
  applicationResponses: ApplicationResponseDto[] | undefined,
  searchTerm: string
) {
  const query = searchTerm.toLowerCase();

  return ratings.filter((rating) => {
    const ad = ads.find(({ _id }) => _id === rating.adId);
    const adCreator = users.find(({ _id }) => _id === ad?.createdBy);
    const servicePerformer = getServicePerformer(
      rating.adId,
      users,
      applications,
      applicationResponses
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
