import { Box, TextField } from '@mui/material';
import { makeStyles } from '../../libs/make-styles';
import { CreateAdButton } from './create-ad-button';

const styles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: ['column', 'row'],
    gap: 1,
    justifyContent: 'space-between',
  },
});

export function Home() {
  return (
    <Box sx={styles.root}>
      <TextField label="Search" type="search" />

      <CreateAdButton />
    </Box>
  );
}
