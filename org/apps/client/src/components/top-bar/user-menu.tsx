import { makeStyles } from '../../libs/make-styles';
import { ReactNode, useState } from 'react';
import {
  Box,
  Button,
  Menu,
  Typography,
  MenuItem as MuiMenuItem,
  Avatar,
  SvgIconTypeMap,
} from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

const styles = makeStyles({
  container: {
    height: '33px',
    pl: 2,
  },
  label: {
    color: (theme) => theme.palette.primary.main,
    fontSize: '14px',
    pl: 2,
  },
  menu: {
    mt: '45px',
    svg: {
      color: (theme) => theme.palette.primary.main,
    },
  },
  avatar: {
    color: (theme) => theme.palette.primary.contrastText,
    width: 32,
    height: 32,
  },
  button: {
    minWidth: 'auto',
    p: 0,
  },
  flexRow: {
    display: 'flex',
    gap: 1,
  },
});

export interface MenuItem {
  label: string;
  onClick: () => void;
  icon?: ReactNode;
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
      />

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
          <Typography sx={styles.label}>{label}</Typography>
          {menuItems.map(({ label: optionLabel, onClick, icon }) => (
            <MuiMenuItem
              key={optionLabel}
              onClick={onClick}
              sx={styles.flexRow}
            >
              {icon}
              <Typography textAlign="center">{optionLabel}</Typography>
            </MuiMenuItem>
          ))}
        </Menu>
      ) : null}
    </Box>
  );
}
