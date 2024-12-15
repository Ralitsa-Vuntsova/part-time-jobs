import { Box, Button, Typography } from '@mui/material';
import { UserProfile } from '@shared/data-objects';
import { ErrorContainer } from '../../../components/error-container';
import { useAsyncAction } from '../../../hooks/use-async-action';
import { makeStyles } from '../../../libs/make-styles';
import { userService } from '../../../services/user-service';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../../services/auth-service';
import { ConfirmDialog } from '../../../components/dialog';
import { useState } from 'react';

const styles = makeStyles({
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    alignItems: 'center',
  },
});

interface Props {
  userData: UserProfile;
}

export function DeleteProfileButton({ userData }: Props) {
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const navigate = useNavigate();

  const { trigger, loading, error } = useAsyncAction(async ({ signal }) => {
    await userService.deleteUser(userData._id, signal);
    authService.logout();

    navigate('/register');
  });

  return (
    <Box
      component="form"
      sx={styles.flexColumn}
      onSubmit={(event) => {
        event.preventDefault();
        trigger();
      }}
    >
      <Button variant="outlined" onClick={() => setOpenConfirmDialog(true)}>
        Delete Profile
      </Button>

      {error ? <ErrorContainer>{error}</ErrorContainer> : null}

      <ConfirmDialog
        open={openConfirmDialog}
        title="Delete Profile"
        onConfirm={() => trigger()}
        confirmLabel="Delete"
        confirmLoading={loading}
        onCancel={() => setOpenConfirmDialog(false)}
        cancelLabel="Cancel"
      >
        <Typography>
          Are you sure you want to delete profile? This action cannot be undone.
        </Typography>
      </ConfirmDialog>
    </Box>
  );
}
