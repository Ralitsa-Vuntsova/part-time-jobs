import { userService } from '../../services/user-service';
import { useCurrentUser } from '../../hooks/use-current-user';
import {
  AsyncDataLoader,
  LOADING_PROPS,
} from '../../components/async-data-loader';
import { EditProfileForm } from './form';

export function EditProfile() {
  const currentUser = useCurrentUser();

  if (!currentUser) {
    return null;
  }

  return (
    <AsyncDataLoader
      dataLoader={({ signal }) => userService.getById(currentUser._id, signal)}
      loadingProps={LOADING_PROPS.BLANK_PAGE_WITH_TOP_BAR}
    >
      {(userData) => <EditProfileForm userData={userData} />}
    </AsyncDataLoader>
  );
}
