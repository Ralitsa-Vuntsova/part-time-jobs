import { useParams } from 'react-router-dom';
import { AdType } from '../../libs/ad-helper-functions';
import { jobOfferService } from '../../services/job-offer-service';
import { serviceOfferService } from '../../services/service-offer-service';
import {
  AsyncDataLoader,
  AsyncDataLoaderAPI,
  LOADING_PROPS,
} from '../../components/async-data-loader';
import { userService } from '../../services/user-service';
import { useCurrentUser } from '../../hooks/use-current-user';
import { useRef } from 'react';
import { applicationService } from '../../services/application-service';
import { AdDetails } from '../../components/ad-details';
import { applicationResponseService } from '../../services/application-response-service';
import { getServicePerformerIds } from '../../libs/rating-helper-functions';

interface Props {
  type: AdType;
}

export function Ad({ type }: Props) {
  const { id } = useParams();
  const currentUser = useCurrentUser();

  if (!id || !currentUser) {
    return null;
  }

  const api = useRef<AsyncDataLoaderAPI>({ reload: () => {} });

  return (
    <AsyncDataLoader
      dataLoader={({ signal }) =>
        Promise.all([
          type === AdType.Job
            ? jobOfferService.getById(id, signal)
            : serviceOfferService.getById(id, signal),
          applicationService.listAll(signal),
          applicationResponseService.listAll(signal),
          userService.getById(currentUser._id, signal),
        ])
      }
      api={api}
      loadOptions={{ clearDataOnReload: false }}
      loadingProps={LOADING_PROPS.BLANK_PAGE_WITH_TOP_BAR}
    >
      {([ad, applications, applicationResponses, userData]) => (
        <AdDetails
          ad={ad}
          applications={applications}
          userData={userData}
          servicePerformerIds={
            getServicePerformerIds(
              ad._id,
              applications,
              applicationResponses
            ) ?? []
          }
          type={type}
          onChange={api.current.reload}
        />
      )}
    </AsyncDataLoader>
  );
}
