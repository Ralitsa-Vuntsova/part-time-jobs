import {
  DialogContent,
  DialogActions,
  Button,
  Dialog,
  DialogTitle,
} from '@mui/material';
import { ReactElement, ReactNode } from 'react';
import { LoadingButton } from '../loading-button';
import { makeStyles } from '../../libs/make-styles';

const styles = makeStyles({
  title: {
    color: (theme) => theme.palette.primary.main,
  },
  flexRow: {
    display: 'flex',
    gap: 2,
    justifyContent: 'center',
  },
});

interface AlertProps {
  open: boolean;
  title: string;
  children: ReactNode;
  onConfirm: () => unknown;
  confirmLabel?: string;
  confirmLoading?: boolean;
  onClose?: () => unknown;
}

export function AlertDialog({
  open,
  title,
  children,
  onConfirm,
  confirmLabel = 'OK',
  onClose,
}: AlertProps) {
  return (
    <Dialog open={open} onSubmit={onConfirm} onClose={onClose}>
      <DialogTitle sx={styles.title}>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>

      <DialogActions sx={styles.flexRow}>
        <Button
          variant="contained"
          type="submit"
          color="primary"
          onClick={onConfirm}
        >
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

interface ConfirmProps extends AlertProps {
  onCancel?: () => unknown;
  cancelLabel?: string;
}

export function ConfirmDialog({
  open,
  title,
  children,
  onConfirm,
  confirmLabel = 'OK',
  confirmLoading = false,
  onClose,
  onCancel = onClose,
  cancelLabel = 'Cancel',
}: ConfirmProps) {
  return (
    <Dialog open={open} onSubmit={onConfirm} onClose={onClose}>
      <DialogTitle sx={styles.title}>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>

      <DialogActions sx={styles.flexRow}>
        <Button variant="outlined" onClick={onCancel} disabled={confirmLoading}>
          {cancelLabel}
        </Button>

        <LoadingButton
          loading={confirmLoading}
          variant="contained"
          type="submit"
          color="primary"
          onClick={onConfirm}
        >
          {confirmLabel}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
