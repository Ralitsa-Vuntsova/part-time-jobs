import { useEffect, useState } from 'react';
import { Breakpoint, useResponsive } from '../../hooks/use-responsive';
import { makeStyles } from '../../libs/make-styles';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { TopBar } from '../top-bar';
import { useSections } from '../../hooks/use-sections';
import { Drawer } from '../drawer';

const styles = makeStyles({
  root: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: (theme) => theme.palette.background.default,
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
    overflowY: 'auto',
    p: 3,
  },
});

interface Props {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export function DrawerLayout({ isDarkMode, toggleTheme }: Props) {
  const sections = useSections();
  const breakpoint = useResponsive();

  const isSM = breakpoint <= Breakpoint.SM;
  const [open, setOpen] = useState(!isSM);

  useEffect(() => {
    if (isSM) {
      setOpen(false);
    }
  }, [isSM]);

  return (
    <Box sx={styles.root}>
      <Drawer
        sections={sections}
        open={open}
        openDrawer={() => {
          if (breakpoint !== Breakpoint.XS) {
            setOpen(true);
          }
        }}
        closeDrawer={() => setOpen(false)}
      />
      <Box sx={styles.main}>
        <TopBar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        <Box component="main" sx={styles.contentWrapper}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
