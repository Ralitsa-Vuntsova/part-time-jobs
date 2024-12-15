import { userService } from '../../services/user-service';
import { useCurrentUser } from '../../hooks/use-current-user';
import {
  AsyncDataLoader,
  LOADING_PROPS,
} from '../../components/async-data-loader';
import { EditProfileForm } from './form';
import { DeleteProfileButton } from './delete-button';
import { makeStyles } from '../../libs/make-styles';
import { Box } from '@mui/material';

const styles = makeStyles({
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    alignItems: 'center',
  },
});

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
      {(userData) => (
        <Box sx={styles.flexColumn}>
          <EditProfileForm userData={userData} />
          <DeleteProfileButton userData={userData} />
        </Box>
      )}
    </AsyncDataLoader>
  );
}
