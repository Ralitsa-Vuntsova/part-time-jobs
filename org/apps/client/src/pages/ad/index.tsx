import { useParams } from 'react-router-dom';
import { AdType } from '../../libs/ad-type';
import { jobOfferService } from '../../services/job-offer-service';
import { serviceOfferService } from '../../services/service-offer-service';
import {
  AsyncDataLoader,
  AsyncDataLoaderAPI,
  LOADING_PROPS,
} from '../../components/async-data-loader';
import { AdDetails } from './details';
import { userService } from '../../services/user-service';
import { useCurrentUser } from '../../hooks/use-current-user';
import { useRef } from 'react';

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
          userService.getById(currentUser._id, signal),
        ])
      }
      api={api}
      loadOptions={{ clearDataOnReload: false }}
      loadingProps={LOADING_PROPS.BLANK_PAGE_WITH_TOP_BAR}
    >
      {([ad, userData]) => (
        <AdDetails
          ad={ad}
          userData={userData}
          type={type}
          onChange={api.current.reload}
        />
      )}
    </AsyncDataLoader>
  );
}
