import {
  Box,
  Divider,
  SxProps,
  Theme,
  Typography,
  TypographyProps,
} from '@mui/material';
import { ReactNode } from 'react';
import { makeStyles } from '../../libs/make-styles';

interface Props {
  label: string;
  children: ReactNode;
  sx?: SxProps<Theme>;
  typographyProps?: TypographyProps;
  isInline?: boolean;
  withDivider?: boolean;
}

const styles = makeStyles({
  root: {
    display: 'flex',
    gap: 1,
    alignItems: 'center',
  },
});

export function LabeledControl({
  label,
  children,
  sx,
  typographyProps,
  withDivider = true,
  isInline = false,
}: Props) {
  const rootSx = { ...sx, ...(isInline ? styles.root : {}) };

  return (
    <Box sx={rootSx}>
      <Typography fontWeight={700} fontSize={12} {...typographyProps}>
        {label}
      </Typography>
      {!isInline && withDivider && <Divider sx={{ my: 1 }} />}
      {children}
    </Box>
  );
}
