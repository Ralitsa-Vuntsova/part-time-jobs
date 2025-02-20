import { useRef } from 'react';
import { ApplicationLibrary } from '../../components/application-library';
import {
  AsyncDataLoader,
  AsyncDataLoaderAPI,
  LOADING_PROPS,
} from '../../components/async-data-loader';
import { useCurrentUser } from '../../hooks/use-current-user';
import { applicationResponseService } from '../../services/application-response-service';
import { applicationService } from '../../services/application-service';
import { jobOfferService } from '../../services/job-offer-service';
import { userService } from '../../services/user-service';
import { useTranslation } from 'react-i18next';

export function Applications() {
  const currentUser = useCurrentUser();

  const api = useRef<AsyncDataLoaderAPI>({ reload: () => {} });

  const { t } = useTranslation();

  return (
    <AsyncDataLoader
      dataLoader={({ signal }) =>
        Promise.all([
          jobOfferService.listAll(signal),
          applicationService.listAll(signal),
          userService.listAll(signal),
          applicationResponseService.listAll(signal),
        ])
      }
      api={api}
      loadingProps={LOADING_PROPS.BLANK_PAGE_WITH_TOP_BAR}
      loadOptions={{ clearDataOnReload: false }}
    >
      {([jobs, applications, users, applicationResponses]) => {
        const currentUserAds = jobs.filter(
          ({ createdBy }) => createdBy === currentUser?._id
        );

        return (
          <ApplicationLibrary
            applications={applications.filter(({ adId }) =>
              currentUserAds.map(({ _id }) => _id).includes(adId)
            )}
            users={users}
            ads={currentUserAds}
            applicationResponses={applicationResponses.filter(
              ({ createdBy }) => createdBy === currentUser?._id
            )}
            onChange={api.current.reload}
            label={t('applications-list')}
          />
        );
      }}
    </AsyncDataLoader>
  );
}
