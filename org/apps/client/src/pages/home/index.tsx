import {
  AsyncDataLoader,
  LOADING_PROPS,
} from '../../components/async-data-loader';
import { jobOfferService } from '../../services/job-offer-service';
import { serviceOfferService } from '../../services/service-offer-service';
import { AdLibrary } from '../../components/ad-library';

export function Home() {
  return (
    <AsyncDataLoader
      dataLoader={({ signal }) =>
        Promise.all([
          jobOfferService.listAll(signal),
          serviceOfferService.listAll(signal),
        ])
      }
      loadingProps={LOADING_PROPS.BLANK_PAGE_WITH_TOP_BAR}
    >
      {([jobs, services]) => {
        return (
          <AdLibrary
            jobs={jobs.filter((ad) => !ad.isArchieved)}
            services={services.filter((ad) => !ad.isArchieved)}
          />
        );
      }}
    </AsyncDataLoader>
  );
}
