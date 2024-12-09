import { userService } from '../../services/user-service';
import { Navigate } from 'react-router-dom';
import {
  AsyncDataLoader,
  LOADING_PROPS,
} from '../../components/async-data-loader';
import { useCurrentUser } from '../../hooks/use-current-user';
import { RegisterForm } from './form';

export function Register() {
  const currentUser = useCurrentUser();

  if (currentUser) {
    return <Navigate to="/" />;
  }

  return (
    <AsyncDataLoader
      dataLoader={({ signal }) => userService.getAllUsernames(signal)}
      loadingProps={LOADING_PROPS.BLANK_PAGE_WITH_TOP_BAR}
    >
      {(usernames) => <RegisterForm usernames={usernames} />}
    </AsyncDataLoader>
  );
}
