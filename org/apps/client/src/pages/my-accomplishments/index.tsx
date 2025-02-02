import {
  AsyncDataLoader,
  LOADING_PROPS,
} from '../../components/async-data-loader';
import { useCurrentUser } from '../../hooks/use-current-user';
import { jobOfferService } from '../../services/job-offer-service';
import { AdLibrary } from '../../components/ad-library';

export function MyAccomplishments() {
  const currentUser = useCurrentUser();

  if (!currentUser) {
    return null;
  }

  return (
    <AsyncDataLoader
      dataLoader={({ signal }) => jobOfferService.listAll(signal)}
      loadingProps={LOADING_PROPS.BLANK_PAGE_WITH_TOP_BAR}
    >
      {(jobs) => {
        return (
          <AdLibrary
            // TODO: Filter by accepted user applications and ads which are archived with completed reason
            jobs={jobs.filter((ad) => ad.createdBy === currentUser._id)}
            showCreateButton={false}
            showToggleButton={false}
            label="accomplishments-list"
          />
        );
      }}
    </AsyncDataLoader>
  );
}
