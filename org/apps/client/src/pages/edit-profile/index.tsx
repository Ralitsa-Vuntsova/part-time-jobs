import { userService } from '../../services/user-service';
import { Box, CircularProgress } from '@mui/material';
import { ErrorContainer } from '../../components/error-container';
import { useCurrentUser } from '../../hooks/use-current-user';
import { useAsync } from '../../hooks/use-async';
import { LOADING_PROPS } from '../../components/async-data-loader';
import { EditProfileForm } from './form';

export function EditProfile() {
  const currentUser = useCurrentUser();

  if (!currentUser) {
    return null;
  }

  const {
    data: userData,
    loading: loading,
    error: error,
  } = useAsync(
    async ({ signal }) => userService.getById(currentUser._id, signal),
    []
  );

  if (loading) {
    return (
      <Box sx={LOADING_PROPS.BLANK_PAGE.sx}>
        <CircularProgress size={LOADING_PROPS.BLANK_PAGE.size} />
      </Box>
    );
  }

  if (!userData) {
    return null;
  }

  return (
    <Box>
      <EditProfileForm userData={userData} />

      {error ? <ErrorContainer>{error}</ErrorContainer> : null}
    </Box>
  );
}
