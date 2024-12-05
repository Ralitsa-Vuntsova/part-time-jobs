import { AppBar, Box, Toolbar } from '@mui/material';
import { makeStyles } from '../../libs/make-styles';
import { useCurrentUser } from '../../hooks/use-current-user';
import { UserMenu } from './user-menu';
import { Breakpoint, useResponsive } from '../../hooks/use-responsive';
import { useAsyncAction } from '../../hooks/use-async-action';
import { useNavigate } from 'react-router-dom';
import { ErrorContainer } from '../error-container';
import { authService } from '../../services/auth-service';

const styles = makeStyles({
  root: {
    position: 'sticky',
    background: (theme) =>
      `linear-gradient(90deg, ${theme.palette.primary.light} 50%, ${theme.palette.primary.main} 85%)`,
  },
  toolbar: {
    display: 'flex',
    alignSelf: 'end',
    gap: 1,
  },
  heading: {
    color: (theme) => theme.palette.primary.contrastText,
  },
  flexBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
  },
});

export function TopBar() {
  const user = useCurrentUser();
  const isSM = useResponsive() < Breakpoint.SM;
  const navigate = useNavigate();

  const { trigger: logoutTrigger, error: logoutError } = useAsyncAction(
    async () => {
      authService.logout();
      navigate('/login');
    }
  );

  return (
    <AppBar sx={styles.root}>
      <Toolbar sx={styles.toolbar}>
        {user && (
          <Box sx={styles.flexBox}>
            <UserMenu
              label={isSM ? '' : `Hi, ${user.username}`}
              menuItems={[
                {
                  label: 'Edit Profile',
                  onClick: () => navigate('edit-profile'),
                },
                { label: 'Logout', onClick: logoutTrigger },
              ]}
            />
            {logoutError ? (
              <ErrorContainer>{logoutError}</ErrorContainer>
            ) : null}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
