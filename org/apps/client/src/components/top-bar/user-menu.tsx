import { makeStyles } from '../../libs/make-styles';
import { useState } from 'react';
import {
  Box,
  Button,
  Menu,
  Typography,
  MenuItem as MuiMenuItem,
  Avatar,
} from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';

const styles = makeStyles({
  container: {
    float: 'right',
    height: '33px',
  },
  label: {
    color: (theme) => theme.palette.primary.contrastText,
    textTransform: 'none',
  },
  menu: {
    mt: '45px',
  },
  arrow: {
    color: (theme) => theme.palette.primary.contrastText,
  },
  avatar: {
    color: (theme) => theme.palette.primary.contrastText,
    width: 32,
    height: 32,
  },
  button: {
    p: 0,
    '& .MuiButton-endIcon': {
      marginLeft: 0,
    },
    '& .MuiButton-startIcon': {
      marginRight: 1,
    },
    '& .MuiButton-startIcon > *:nth-of-type(1)': {
      fontSize: '1rem',
    },
  },
});

export interface MenuItem {
  label: string;
  onClick: () => void;
}

interface Props {
  label?: string;
  menuItems: MenuItem[];
}

const anchorOrigin = {
  vertical: 'top',
  horizontal: 'right',
} as const;

export function UserMenu({ label, menuItems }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const openMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={styles.container}>
      <Button
        sx={styles.button}
        onClick={openMenu}
        startIcon={<Avatar sx={styles.avatar}></Avatar>}
        endIcon={<ArrowDropDown sx={styles.arrow} />}
      >
        <Typography sx={styles.label}>{label}</Typography>
      </Button>

      {menuItems.length > 0 ? (
        <Menu
          sx={styles.menu}
          anchorEl={anchorEl}
          anchorOrigin={anchorOrigin}
          keepMounted
          transformOrigin={anchorOrigin}
          open={!!anchorEl}
          onClose={closeMenu}
        >
          {menuItems.map(({ label: optionLabel, onClick }) => (
            <MuiMenuItem key={optionLabel} onClick={onClick}>
              <Typography textAlign="center">{optionLabel}</Typography>
            </MuiMenuItem>
          ))}
        </Menu>
      ) : null}
    </Box>
  );
}
