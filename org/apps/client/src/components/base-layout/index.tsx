import { Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { makeStyles } from '../../libs/make-styles';

const styles = makeStyles({
  root: {
    height: '100%',
  },
  content: {
    flexGrow: 1,
    p: 1,
    backgroundColor: (theme) => theme.palette.background.default,
  },
});

interface Props {
  TopBar: JSX.Element;
}

export function BaseLayout({ TopBar }: Props) {
  return (
    <Stack sx={styles.root}>
      {TopBar}
      <Stack component="main" sx={styles.content}>
        <Outlet />
      </Stack>
    </Stack>
  );
}