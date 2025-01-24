import { AppBar, Box, Toolbar } from '@mui/material';
import { makeStyles } from '../../libs/make-styles';
import { useCurrentUser } from '../../hooks/use-current-user';
import { UserMenu } from './user-menu';
import { Breakpoint, useResponsive } from '../../hooks/use-responsive';
import { useAsyncAction } from '../../hooks/use-async-action';
import { useNavigate } from 'react-router-dom';
import { ErrorContainer } from '../error-container';
import { authService } from '../../services/auth-service';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { LanguageSwitcher } from '../language-switcher';
import { useTranslation } from 'react-i18next';

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
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
  },
  flexRow: {
    display: 'flex',
    alignItems: 'center',
  },
  notification: {
    color: (theme) => theme.palette.warning.main,
  },
});

export function TopBar() {
  const user = useCurrentUser();
  const isSM = useResponsive() < Breakpoint.SM;
  const navigate = useNavigate();

  const { t } = useTranslation();

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
          <Box sx={styles.flexRow}>
            {!isSM && (
              <>
                <LanguageSwitcher />
                <NotificationsIcon sx={styles.notification} />
              </>
            )}

            <Box sx={styles.flexColumn}>
              <UserMenu
                label={isSM ? '' : `${t('hi')}, ${user.username}`}
                menuItems={[
                  {
                    label: t('my-ads'),
                    onClick: () => navigate('my-ads'),
                  },
                  {
                    label: t('edit-profile'),
                    onClick: () => navigate('edit-profile'),
                  },
                  { label: t('logout'), onClick: logoutTrigger },
                ]}
              />
              {logoutError ? (
                <ErrorContainer>{logoutError}</ErrorContainer>
              ) : null}
            </Box>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
