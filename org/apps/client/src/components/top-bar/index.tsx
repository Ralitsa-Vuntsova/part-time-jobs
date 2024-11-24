import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { makeStyles } from '../../libs/make-styles';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import { useCurrentUser } from '../../hooks/use-current-user';
import { UserMenu } from './user-menu';
import { Breakpoint, useResponsive } from '../../hooks/use-responsive';
import { useAsyncAction } from '../../hooks/use-async-action';
import { useNavigate } from 'react-router-dom';
import { ErrorContainer } from '../error-container';
import { authService } from '../../services/auth-service';

const styles = makeStyles({
  root: {
    background: (theme) => theme.palette.primary.light,
  },
  toolbar: {
    display: 'flex',
    gap: 1,
  },
  heading: {
    color: (theme) => theme.palette.primary.contrastText,
    flexGrow: 1,
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

  const { trigger, error } = useAsyncAction(async () => {
    authService.logout();
    navigate('/login');
  });

  return (
    <AppBar sx={styles.root}>
      <Toolbar sx={styles.toolbar}>
        <WorkOutlineIcon />
        <Typography variant="h6" sx={styles.heading}>
          PartTimeJobs
        </Typography>
        {user && (
          <Box sx={styles.flexBox}>
            <UserMenu
              label={isSM ? '' : `Hi, ${user.username}`}
              menuItems={[{ label: 'Logout', onClick: trigger }]}
            />
            {error ? <ErrorContainer>{error}</ErrorContainer> : null}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
