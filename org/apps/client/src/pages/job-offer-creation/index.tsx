import { useCurrentUser } from '../../hooks/use-current-user';
import { userService } from '../../services/user-service';
import {
  AsyncDataLoader,
  LOADING_PROPS,
} from '../../components/async-data-loader';
import { JobOfferCreationForm } from './form';

export function JobOfferCreation() {
  const currentUser = useCurrentUser();

  if (!currentUser) {
    return null;
  }

  return (
    <AsyncDataLoader
      dataLoader={({ signal }) => userService.getById(currentUser._id, signal)}
      loadingProps={LOADING_PROPS.BLANK_PAGE_WITH_TOP_BAR}
    >
      {(userData) => <JobOfferCreationForm userData={userData} />}
    </AsyncDataLoader>
  );
}
