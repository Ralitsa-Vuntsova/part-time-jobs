import { JobOfferDto, ServiceOfferDto } from '@shared/data-objects';

// TODO: Refactor
export function sortJobs(ads: JobOfferDto[], isAsc: boolean) {
  return ads.sort((a, b) => {
    const firstDate = new Date(a.createdAt).getTime();
    const secondDate = new Date(b.createdAt).getTime();

    return isAsc ? firstDate - secondDate : secondDate - firstDate;
  });
}

export function sortServices(ads: ServiceOfferDto[], isAsc: boolean) {
  return ads.sort((a, b) => {
    const firstDate = new Date(a.createdAt).getTime();
    const secondDate = new Date(b.createdAt).getTime();

    return isAsc ? firstDate - secondDate : secondDate - firstDate;
  });
}
