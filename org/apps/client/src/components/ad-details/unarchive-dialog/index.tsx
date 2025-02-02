import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { LoadingButton } from '../../loading-button';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '../../../libs/make-styles';

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

interface Props {
  open: boolean;
  onConfirm: () => unknown;
  confirmLoading: boolean;
  onClose?: () => unknown;
}

export function UnarchiveDialog({
  open,
  onConfirm,
  confirmLoading,
  onClose,
}: Props) {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onSubmit={onConfirm} onClose={onClose} fullWidth>
      <DialogTitle sx={styles.title}>{t('unarchive-ad')}</DialogTitle>

      <DialogContent>
        <Typography>{t('unarchive-question')}</Typography>
      </DialogContent>

      <DialogActions sx={styles.flexRow}>
        <Button variant="outlined" onClick={onClose} disabled={confirmLoading}>
          {t('cancel')}
        </Button>

        <LoadingButton
          loading={confirmLoading}
          variant="contained"
          type="submit"
          color="primary"
          onClick={onConfirm}
        >
          {t('unarchive')}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
