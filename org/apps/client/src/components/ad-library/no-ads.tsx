import { Box, Typography } from '@mui/material';
import { makeStyles } from '../../libs/make-styles';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';

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

export function NoAds() {
  return (
    <Box sx={styles.root}>
      <Typography variant="h3" sx={styles.mainColor}>
        Currently there are no ads
      </Typography>
      <DoNotDisturbIcon sx={styles.mainColor} />
    </Box>
  );
}
