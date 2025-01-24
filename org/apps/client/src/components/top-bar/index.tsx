import { AppBar, Box, Button, Toolbar } from '@mui/material';
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
import ArticleIcon from '@mui/icons-material/Article';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useUserPreferences } from '../../hooks/use-user-preferences';
import { Theme } from '@shared/enums';

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
  notification: {
    color: (theme) => theme.palette.warning.main,
  },
});

interface Props {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export function TopBar({ isDarkMode, toggleTheme }: Props) {
  const user = useCurrentUser();
  const { theme, setPreferences } = useUserPreferences();

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
                label={user.username}
                menuItems={[
                  {
                    label: t('my-ads'),
                    onClick: () => navigate('my-ads'),
                    icon: <ArticleIcon />,
                  },
                  {
                    label: t('edit-profile'),
                    onClick: () => navigate('edit-profile'),
                    icon: <ManageAccountsIcon />,
                  },
                  {
                    label: isDarkMode ? t('light') : t('dark'),
                    onClick: () => {
                      toggleTheme();
                      setPreferences({
                        theme: isDarkMode ? Theme.Light : Theme.Dark,
                      });
                    },
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
