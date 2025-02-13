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
    gap: 2,
  },
  mainColor: {
    color: (theme) => theme.palette.primary.main,
  },
});

// TODO [future]: Extract in a common place in order to be reused
export function NoRatings() {
  const { t } = useTranslation();

  return (
    <Box sx={styles.root}>
      <Typography variant="h3" sx={styles.mainColor}>
        {t('no-ratings')}
      </Typography>
      <DoNotDisturbIcon sx={styles.mainColor} />
    </Box>
  );
}
