import { AppBar, Toolbar, Typography } from '@mui/material';
import { makeStyles } from '../../libs/make-styles';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import { useCurrentUser } from '../../hooks/use-current-user';
import { UserMenu } from './user-menu';
import { Breakpoint, useResponsive } from '../../hooks/use-responsive';
import { useAsyncAction } from '../../hooks/use-async-action';
import { userService } from '../../services/user-service';
import { useNavigate } from 'react-router-dom';

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
});

export function TopBar() {
  const user = useCurrentUser();
  const isSM = useResponsive() < Breakpoint.SM;
  const navigate = useNavigate();

  // TODO: Handle loading and errors
  const { trigger } = useAsyncAction(async () => {
    userService.logout();
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
          <UserMenu
            label={isSM ? '' : `Hi, ${user.username}`}
            menuItems={[{ label: 'Logout', onClick: trigger }]}
          />
        )}
      </Toolbar>
    </AppBar>
  );
}
