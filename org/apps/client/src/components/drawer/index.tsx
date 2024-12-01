import { Drawer as MuiDrawer, Divider, Box } from '@mui/material';
import { makeStyles } from '../../libs/make-styles';
import { DrawerHeader } from './header';
import { DrawerSection, Section } from './section';

export const drawerWidth = 280;
export const collapsedDrawerWidth = 65;

const styles = makeStyles({
  root: {
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    transition: (theme) =>
      theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    overflow: 'hidden',
    width: `${collapsedDrawerWidth}px`,
    '&.open': {
      transitionDuration: (theme) =>
        `${theme.transitions.duration.enteringScreen}ms`,
      width: [`${collapsedDrawerWidth}px`, `${drawerWidth}px`],
    },
    '.MuiDrawer-paper': {
      background: (theme) => theme.palette.primary.main,
      width: '100%',
      position: 'static',
    },
  },
  scrollableBox: {
    overflow: 'auto',
    overflowX: 'hidden',
  },
});

interface Props {
  sections: DrawerSection[];
  open: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

export function Drawer({ sections, open, openDrawer, closeDrawer }: Props) {
  return (
    <MuiDrawer
      sx={styles.root}
      open={open}
      variant="permanent"
      className={open ? 'open' : ''}
    >
      <DrawerHeader
        open={open}
        openDrawer={openDrawer}
        closeDrawer={closeDrawer}
      />

      <Divider />

      <Box sx={styles.scrollableBox}>
        {sections.map((section, index) => (
          <Section key={index} section={section} drawerOpened={open} />
        ))}
      </Box>
    </MuiDrawer>
  );
}
