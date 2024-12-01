import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { makeStyles } from '../../libs/make-styles';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';

const styles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: '64px',
    px: 1,
  },
  box: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    minWidth: '48px',
  },
  button: {
    p: 0,
  },
  heading: {
    color: (theme) => theme.palette.primary.contrastText,
    textTransform: 'none',
  },
  icon: {
    color: (theme) => theme.palette.primary.contrastText,
  },
});

interface Props {
  open: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

export function DrawerHeader({ open, openDrawer, closeDrawer }: Props) {
  return (
    <Box sx={styles.root}>
      <Box sx={styles.box}>
        <IconButton
          onClick={open ? closeDrawer : openDrawer}
          sx={styles.iconButton}
        >
          <WorkOutlineIcon sx={styles.icon} />
        </IconButton>
        {open && (
          <Button onClick={closeDrawer} sx={styles.button}>
            <Typography variant="h6" sx={styles.heading}>
              PartTimeJobs
            </Typography>
          </Button>
        )}
      </Box>

      {open && (
        <IconButton onClick={closeDrawer}>
          <MenuOpenIcon sx={styles.icon} />
        </IconButton>
      )}
    </Box>
  );
}
