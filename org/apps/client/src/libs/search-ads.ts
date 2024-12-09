import { JobOfferDto, ServiceOfferDto } from '@shared/data-objects';

// TODO: Refactor
export function filterJobsByTerm(jobs: JobOfferDto[], searchTerm: string) {
  const query = searchTerm.toLowerCase();

  return jobs
    .filter((job) => job.name.toLowerCase().includes(query))
    .sort(({ name: n1 }, { name: n2 }) => {
      const isExactMatch = (name: string) =>
        name.toLowerCase().startsWith(query);

      const isFirstExactMatch = isExactMatch(n1);
      const isSecondExactMatch = isExactMatch(n2);

      if (
        (isFirstExactMatch && !isSecondExactMatch) ||
        (!isFirstExactMatch && isSecondExactMatch)
      ) {
        return isFirstExactMatch ? -1 : 1;
      }

      return n1.localeCompare(n2);
    });
}

export function filterServicesByTerm(
  services: ServiceOfferDto[],
  searchTerm: string
) {
  const query = searchTerm.toLowerCase();

  return services
    .filter((service) => service.name.toLowerCase().includes(query))
    .sort(({ name: n1 }, { name: n2 }) => {
      const isExactMatch = (name: string) =>
        name.toLowerCase().startsWith(query);

      const isFirstExactMatch = isExactMatch(n1);
      const isSecondExactMatch = isExactMatch(n2);

      if (
        (isFirstExactMatch && !isSecondExactMatch) ||
        (!isFirstExactMatch && isSecondExactMatch)
      ) {
        return isFirstExactMatch ? -1 : 1;
      }

      return n1.localeCompare(n2);
    });
}
