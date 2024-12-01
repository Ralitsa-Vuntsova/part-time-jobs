import {
  Box,
  ListItemButton as MuiListItemButton,
  ListItemButtonProps as MuiListItemButtonProps,
  ListItemIcon,
  ListItemText,
  SvgIcon,
  Tooltip,
  styled,
  SxProps,
  Theme,
} from '@mui/material';
import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { makeStyles } from '../../libs/make-styles';
import { Link } from '../link';

const styles = makeStyles({
  root: {
    color: (theme) => theme.palette.info.light,
    gap: 1,
    '&.active': {
      color: (theme) => theme.palette.primary.contrastText,
    },
    '&.Mui-disabled': {
      backgroundColor: 'transparent',
    },
    '> .MuiListItemIcon-root': {
      justifyContent: 'center',
      color: 'inherit',
      minWidth: '32px',
    },
    '> .MuiListItemText-root': {
      my: 0,
      '> .MuiTypography-root ': (theme) => ({
        ...theme.typography.button,
        textTransform: 'none',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        color: 'inherit',
      }),
    },
  },
  tooltipIcon: {
    fontSize: '27px',
  },
});

const StyledBox = styled(Box)({
  minWidth: '16px',
  height: '16px',
  borderRadius: '8px',
  fontSize: '12px',
  fontWeight: 700,
  fontFamily: 'Arial',
  lineHeight: '16px',
  textAlign: 'center',
  letterSpacing: 0,
});

export interface DrawerItemData {
  disabled?: boolean;
  Icon: typeof SvgIcon | null;
  indicatorColor?: string;
  indicatorToolTipLabel?: string;
  IndicatorWhenClosed?: typeof SvgIcon;
  IndicatorWhenOpen?: typeof SvgIcon;
  label: string;
  navigateTo?: string;
  onClick?: () => void;
  numberWhenOpen?: number;
  show?: boolean;
}

interface Props {
  item: DrawerItemData;
  isDrawerOpen: boolean;
  sx?: SxProps<Theme>;
}

interface ListItemButtonProps extends MuiListItemButtonProps {
  navigateTo?: string;
  onClick?: () => void;
  children: ReactNode;
}

function ListItemButton({
  navigateTo,
  onClick,
  children,
  ...props
}: ListItemButtonProps) {
  const linkProps = {
    component: Link,
    to: navigateTo,
    end: navigateTo?.endsWith('/'),
  };

  const customProps = navigateTo ? linkProps : { onClick };

  return (
    <MuiListItemButton {...customProps} {...props}>
      {children}
    </MuiListItemButton>
  );
}

export function DrawerItem({ item, isDrawerOpen, sx }: Props) {
  const {
    disabled = false,
    Icon,
    indicatorColor,
    indicatorToolTipLabel,
    IndicatorWhenClosed,
    label,
    navigateTo,
    onClick,
    numberWhenOpen,
    show = true,
  } = item;

  if (!show) {
    return null;
  }

  const { pathname } = useLocation();
  const rootStyle = { ...styles.root, ...sx };

  return (
    <ListItemButton
      navigateTo={navigateTo}
      disabled={disabled}
      onClick={onClick}
      disableRipple
      sx={rootStyle}
      className={
        navigateTo && pathname.endsWith(navigateTo) ? 'highlighted' : ''
      }
    >
      {Icon && (
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
      )}
      {isDrawerOpen && (
        <ListItemText
          primary={label}
          sx={{
            pl: Icon ? undefined : '50px',
          }}
        />
      )}
      {numberWhenOpen && (
        <Tooltip title={indicatorToolTipLabel} placement="right">
          {!isDrawerOpen && IndicatorWhenClosed ? (
            <IndicatorWhenClosed sx={{ color: indicatorColor }} />
          ) : (
            <StyledBox sx={{ backgroundColor: indicatorColor }}>
              {numberWhenOpen > 9 ? '9+' : numberWhenOpen}
            </StyledBox>
          )}
        </Tooltip>
      )}
    </ListItemButton>
  );
}
