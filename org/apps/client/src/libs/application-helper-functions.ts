import {
  ApplicationDto,
  ApplicationResponseDto,
  JobOfferDto,
  UserProfile,
} from '@shared/data-objects';
import { ApplicationResponse } from '@shared/enums';
import { sumBy } from 'lodash';

export function filterApplicationsByTerm(
  applications: ApplicationDto[],
  ads: JobOfferDto[],
  users: UserProfile[],
  searchTerm: string
) {
  const query = searchTerm.toLowerCase();

  return applications.filter((app) => {
    const ad = ads.find(({ _id }) => _id === app.adId)?.name;
    const user = users.find(({ _id }) => _id === app.createdBy);

    return (
      ad?.toLowerCase().includes(query) ||
      user?.firstName.toLowerCase().includes(query) ||
      user?.lastName.toLowerCase().includes(query)
    );
  });
}

export function shouldDisableApplicationResponse(
  ad: JobOfferDto | undefined,
  application: ApplicationDto,
  applications: ApplicationDto[],
  applicationResponses: ApplicationResponseDto[]
) {
  const adApplicationIds = applications
    .filter((app) => app._id !== application._id && ad?._id === app.adId)
    .map(({ _id }) => _id);
  const existingResponses = applicationResponses.filter(
    (r) =>
      adApplicationIds.includes(r.applicationId) &&
      r.response === ApplicationResponse.Accepted
  );
  const acceptedNumber = sumBy(existingResponses, (r) => r.personNumber ?? 0);

  return ad?.personNumber.notSure
    ? false
    : acceptedNumber + application.personNumber > (ad?.personNumber.value ?? 0);
}
