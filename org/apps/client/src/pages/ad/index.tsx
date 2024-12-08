import { useParams } from 'react-router-dom';
import { AdType } from '../../libs/ad-type';
import { jobOfferService } from '../../services/job-offer-service';
import { serviceOfferService } from '../../services/service-offer-service';
import {
  AsyncDataLoader,
  LOADING_PROPS,
} from '../../components/async-data-loader';
import { AdDetails } from './details';

interface Props {
  type: AdType;
}

export function Ad({ type }: Props) {
  const { id } = useParams();

  if (!id) {
    return null;
  }

  return (
    <AsyncDataLoader
      dataLoader={({ signal }) => {
        return type === AdType.Job
          ? jobOfferService.getById(id, signal)
          : serviceOfferService.getById(id, signal);
      }}
      loadingProps={LOADING_PROPS.BLANK_PAGE_WITH_TOP_BAR}
    >
      {(ad) => <AdDetails ad={ad} type={type} />}
    </AsyncDataLoader>
  );
}
