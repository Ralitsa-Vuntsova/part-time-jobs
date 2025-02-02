import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { LoadingButton } from '../../loading-button';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '../../../libs/make-styles';
import { archieveReasonToTranslateKey, ArchiveReason } from '@shared/enums';

const styles = makeStyles({
  title: {
    color: (theme) => theme.palette.primary.main,
  },
  flexRow: {
    display: 'flex',
    gap: 2,
    justifyContent: 'center',
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
});

interface Props {
  open: boolean;
  onConfirm: () => unknown;
  confirmLoading: boolean;
  onClose?: () => unknown;
  archiveReason: ArchiveReason | undefined;
  onReasonSelected: (reason: ArchiveReason) => void;
}

export function ArchiveDialog({
  open,
  onConfirm,
  confirmLoading,
  onClose,
  archiveReason,
  onReasonSelected,
}: Props) {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onSubmit={onConfirm} onClose={onClose} fullWidth>
      <DialogTitle sx={styles.title}>{t('archive-ad')}</DialogTitle>

      <DialogContent sx={styles.flexColumn}>
        <Typography>{t('archive-question')}</Typography>

        <FormControl fullWidth>
          <InputLabel>{`${t('reason')}*`}</InputLabel>
          <Select
            label={t('reason')}
            value={archiveReason ?? ArchiveReason.Done}
            defaultValue={ArchiveReason.Done}
            onChange={(e) => onReasonSelected(e.target.value as ArchiveReason)}
          >
            {Object.values(ArchiveReason).map((value) => (
              <MenuItem key={value} value={value}>
                {t(archieveReasonToTranslateKey[value])}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
          {t('archive')}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
