import { ApplicationDto, JobOfferDto, UserProfile } from '@shared/data-objects';

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
