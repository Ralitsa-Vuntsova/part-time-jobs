import { Box, Typography } from '@mui/material';
import { makeStyles } from '../../libs/make-styles';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import { useTranslation } from 'react-i18next';

const styles = makeStyles({
  root: {
    minHeight: '50vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    gap: 2,
  },
  mainColor: {
    color: (theme) => theme.palette.primary.main,
  },
});

export function NoApplications() {
  const { t } = useTranslation();

  return (
    <Box sx={styles.root}>
      <Typography variant="h3" sx={styles.mainColor}>
        {t('no-applications')}
      </Typography>
      <DoNotDisturbIcon sx={styles.mainColor} />
    </Box>
  );
}
