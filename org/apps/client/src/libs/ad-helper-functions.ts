import { JobOfferDto, ServiceOfferDto } from '@shared/data-objects';
import { Currency } from '@shared/enums';
import { toCurrency } from './to-currency';

export interface Filters {
  location?: string;
  personNumber?: number;
  qualification?: string;
  priceFrom?: number;
  priceTo?: number;
  priceCurrency?: Currency;
  showArchivedButton?: boolean;
}

export enum AdType {
  Job = 'Job',
  Service = 'Service',
}

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

export function filterJobsByTerm(jobs: JobOfferDto[], searchTerm: string) {
  const query = searchTerm.toLowerCase();

  return jobs.filter((job) => job.name.toLowerCase().includes(query));
}

export function filterServicesByTerm(
  services: ServiceOfferDto[],
  searchTerm: string
) {
  const query = searchTerm.toLowerCase();

  return services.filter((service) =>
    service.name.toLowerCase().includes(query)
  );
}

// TODO [future]: Refactor using reduce
export function filterAds(ads: JobOfferDto[], filters: Filters): JobOfferDto[] {
  let tempAds = ads;

  if (filters.location) {
    tempAds = tempAds.filter(({ location }) =>
      location
        .toLocaleLowerCase()
        .includes(String(filters.location).toLocaleLowerCase())
    );
  }

  if (filters.personNumber) {
    tempAds = tempAds.filter(
      ({ personNumber }) => personNumber.value === Number(filters.personNumber)
    );
  }

  if (filters.qualification) {
    tempAds = tempAds.filter(({ qualification }) =>
      qualification
        .toLocaleLowerCase()
        .includes(String(filters.qualification).toLocaleLowerCase())
    );
  }

  if (filters.priceCurrency) {
    tempAds = tempAds.filter(
      ({ price }) => price.currency === filters.priceCurrency
    );
  }

  if (filters.priceTo && filters.priceFrom) {
    tempAds = tempAds.filter(
      ({ price }) =>
        !price.byNegotiation &&
        price.value >= Number(filters.priceFrom) &&
        price.value <= Number(filters.priceTo)
    );
  }

  if (filters.showArchivedButton) {
    tempAds = tempAds.filter(({ archiveReason }) => !!archiveReason);
  }

  return tempAds;
}

// TODO [future]: Consider adding search term and page number, same for updateUrl
export function updateFilters(searchParams: URLSearchParams) {
  const searchPersonNumber = searchParams.get('personNumber');
  const searchCurrency = searchParams.get('priceCurrency');
  const searchPriceFrom = searchParams.get('priceFrom');
  const searchPriceTo = searchParams.get('priceTo');

  return {
    location: searchParams.get('location') ?? undefined,
    personNumber: searchPersonNumber ? Number(searchPersonNumber) : undefined,
    qualification: searchParams.get('qualification') ?? undefined,
    priceCurrency: searchCurrency ? toCurrency(searchCurrency) : undefined,
    priceFrom: searchPriceFrom ? Number(searchPriceFrom) : undefined,
    priceTo: searchPriceTo ? Number(searchPriceTo) : undefined,
  };
}

export function updateUrl(filters: Filters) {
  const params = new URLSearchParams();

  if (filters.location) {
    params.set('location', filters.location);
  }

  if (filters.personNumber) {
    params.set('personNumber', String(filters.personNumber));
  }

  if (filters.qualification) {
    params.set('qualification', filters.qualification);
  }

  if (filters.priceCurrency) {
    params.set('priceCurrency', filters.priceCurrency);
  }

  if (filters.priceFrom) {
    params.set('priceFrom', String(filters.priceFrom));
  }

  if (filters.priceTo) {
    params.set('priceTo', String(filters.priceTo));
  }

  return params;
}
