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
import { useUserPreferences } from '../../hooks/use-user-preferences';
import { AdType } from '../../libs/ad-helper-functions';

export function MyAccomplishments() {
  const currentUser = useCurrentUser();
  const { setPreferences } = useUserPreferences();

  if (!currentUser) {
    return null;
  }

  return (
    <AsyncDataLoader
      dataLoader={({ signal }) => {
        setPreferences({ type: AdType.Job });

        return Promise.all([
          jobOfferService.listAll(signal),
          applicationService.listAll(signal),
          applicationResponseService.listAll(signal),
        ]);
      }}
      loadingProps={LOADING_PROPS.BLANK_PAGE_WITH_TOP_BAR}
    >
      {/* TODO: Filter server-side */}
      {([jobs, applications, applicationResponses]) => {
        const acceptedResponses = applicationResponses.filter(
          (r) => r.response === ApplicationResponse.Accepted
        );
        const acceptedApplications = applications
          .filter((app) =>
            acceptedResponses.some(
              (response) =>
                response.applicationId === app._id &&
                app.createdBy === currentUser._id
            )
          )
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
            isAccomplishment={true}
          />
        );
      }}
    </AsyncDataLoader>
  );
}
