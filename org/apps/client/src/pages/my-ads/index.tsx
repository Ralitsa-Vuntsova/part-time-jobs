import { AdLibrary } from '../../components/ad-library';
import {
  AsyncDataLoader,
  LOADING_PROPS,
} from '../../components/async-data-loader';
import { useCurrentUser } from '../../hooks/use-current-user';
import { jobOfferService } from '../../services/job-offer-service';
import { serviceOfferService } from '../../services/service-offer-service';

export function MyAds() {
  const currentUser = useCurrentUser();

  if (!currentUser) {
    return null;
  }

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
            jobs={jobs.filter((ad) => ad.createdBy === currentUser._id)}
            services={services.filter((ad) => ad.createdBy === currentUser._id)}
            showCreateButton={false}
            showArchivedButton={true}
            label="ads-list"
          />
        );
      }}
    </AsyncDataLoader>
  );
}
