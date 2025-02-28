import { AppBar, Box, Toolbar } from '@mui/material';
import { makeStyles } from '../../libs/make-styles';
import { UserMenu } from './user-menu';
import { Breakpoint, useResponsive } from '../../hooks/use-responsive';
import { useAsyncAction } from '../../hooks/use-async-action';
import { useNavigate } from 'react-router-dom';
import { ErrorContainer } from '../error-container';
import { authService } from '../../services/auth-service';
import { LanguageSwitcher } from '../language-switcher';
import { useTranslation } from 'react-i18next';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';
import { Notifications } from '../notifications';
import { useNotifications } from '../../hooks/use-notifications';
import { useCurrentUser } from '../../hooks/use-current-user';

const styles = makeStyles({
  root: {
    position: 'sticky',
    background: (theme) =>
      `linear-gradient(90deg, ${theme.palette.primary.light} 50%, ${theme.palette.primary.main} 90%)`,
  },
  toolbar: {
    display: 'flex',
    alignSelf: 'end',
    gap: 1,
  },
  whiteTypography: {
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
});

interface Props {
  toggleTheme: () => void;
}

export function TopBar({ toggleTheme }: Props) {
  const user = useCurrentUser();

  const { data: initialNotifications, reload } = useNotifications();

  const isSM = useResponsive() < Breakpoint.SM;
  const navigate = useNavigate();

  const { t } = useTranslation();

  const { trigger: logoutTrigger, error: logoutError } = useAsyncAction(
    async () => {
      authService.logout();
      navigate('/login');
    }
  );

  const isDarkMode = localStorage.getItem('theme') === 'dark';

  return (
    <AppBar sx={styles.root}>
      <Toolbar sx={styles.toolbar}>
        {user && (
          <Box sx={styles.flexRow}>
            {!isSM && (
              <>
                <LanguageSwitcher />
                {initialNotifications && (
                  <Notifications
                    initialNotifications={initialNotifications}
                    onChange={() => reload(() => {})}
                  />
                )}
              </>
            )}

            <Box sx={styles.flexColumn}>
              <UserMenu
                label={user.username}
                menuItems={[
                  {
                    label: t('profile'),
                    onClick: () => navigate('edit-profile'),
                    icon: <ManageAccountsIcon />,
                  },
                  {
                    label: t('personal-ratings'),
                    onClick: () => navigate('personal-ratings'),
                    icon: <ThumbsUpDownIcon />,
                  },
                  {
                    label: isDarkMode ? t('light') : t('dark'),
                    onClick: toggleTheme,
                    icon: isDarkMode ? <LightModeIcon /> : <DarkModeIcon />,
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
