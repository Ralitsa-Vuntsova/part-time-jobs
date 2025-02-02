import {
  AsyncDataLoader,
  LOADING_PROPS,
} from '../../components/async-data-loader';
import { useCurrentUser } from '../../hooks/use-current-user';
import { jobOfferService } from '../../services/job-offer-service';
import { AdLibrary } from '../../components/ad-library';
import { applicationService } from '../../services/application-service';
import { applicationResponseService } from '../../services/application-response-service';
import { ApplicationResponse, ArchiveReason } from '@shared/enums';

export function MyAccomplishments() {
  const currentUser = useCurrentUser();

  if (!currentUser) {
    return null;
  }

  return (
    <AsyncDataLoader
      dataLoader={({ signal }) =>
        Promise.all([
          jobOfferService.listAll(signal),
          applicationService.listAll(signal),
          applicationResponseService.listAll(signal),
        ])
      }
      loadingProps={LOADING_PROPS.BLANK_PAGE_WITH_TOP_BAR}
    >
      {([jobs, applications, applicationResponses]) => {
        const acceptedApplications = applications
          .filter((app) => {
            const appResponse = applicationResponses.find(
              (response) => response.applicationId === app._id
            );

            return (
              appResponse?.response === ApplicationResponse.Accepted &&
              app.createdBy === currentUser._id
            );
          })
          .map(({ adId }) => adId);

        return (
          <AdLibrary
            jobs={jobs.filter(
              (ad) =>
                ad?.archiveReason === ArchiveReason.Done &&
                acceptedApplications.includes(ad._id)
            )}
            showCreateButton={false}
            showToggleButton={false}
            label="accomplishments-list"
          />
        );
      }}
    </AsyncDataLoader>
  );
}
