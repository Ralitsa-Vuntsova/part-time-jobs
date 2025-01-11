import {
  Box,
  Divider,
  SxProps,
  Theme,
  Tooltip,
  Typography,
  TypographyProps,
} from '@mui/material';
import { ReactNode } from 'react';
import { makeStyles } from '../../libs/make-styles';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

interface Props {
  label: string;
  detailedLabel?: string;
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
  flexRow: {
    display: 'flex',
    gap: 0.5,
    alignItems: 'center',
  },
  icon: {
    '&.MuiSvgIcon-root': {
      color: (theme) => theme.palette.info.main,
      width: '16px',
      height: '16px',
    },
  },
});

export function LabeledControl({
  label,
  detailedLabel,
  children,
  sx,
  typographyProps,
  withDivider = true,
  isInline = false,
}: Props) {
  const rootSx = { ...sx, ...(isInline ? styles.root : {}) };

  return (
    <Box sx={rootSx}>
      <Box sx={styles.flexRow}>
        <Typography fontWeight={700} fontSize={14} {...typographyProps}>
          {label}
        </Typography>
        {detailedLabel && (
          <Tooltip title={detailedLabel}>
            <QuestionMarkIcon sx={styles.icon} />
          </Tooltip>
        )}
      </Box>

      {!isInline && withDivider && <Divider sx={{ my: 1 }} />}
      {children}
    </Box>
  );
}
