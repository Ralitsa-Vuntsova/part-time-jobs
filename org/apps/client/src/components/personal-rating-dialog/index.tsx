import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '../../libs/make-styles';
import { LoadingButton } from '../loading-button';
import { useState } from 'react';
import { useAsyncAction } from '../../hooks/use-async-action';
import { personalRatingService } from '../../services/personal-rating-service';
import { ErrorContainer } from '../error-container';

const styles = makeStyles({
  title: {
    color: (theme) => theme.palette.primary.main,
  },
  flexRow: {
    display: 'flex',
    gap: 2,
    justifyContent: 'center',
  },
  input: {
    width: '100%',
  },
});

interface Props {
  open: boolean;
  onClose: () => unknown;
  adId: string;
}

export function PersonalRatingDialog({ open, onClose, adId }: Props) {
  const [comment, setComment] = useState<string>();

  const { t } = useTranslation();

  const { trigger, loading, error } = useAsyncAction(async ({ signal }) => {
    await personalRatingService.create(
      {
        comment: comment ?? '',
        adId,
      },
      signal
    );

    setComment(undefined);
    onClose();
  });

  return (
    <Dialog open={open} onSubmit={trigger} onClose={onClose} fullWidth>
      <DialogTitle sx={styles.title}>{t('personal-rating')}</DialogTitle>

      <DialogContent>
        <TextField
          label={`${t('comment')}*`}
          multiline
          rows={5}
          sx={styles.input}
          onChange={(e) => setComment(String(e.target.value))}
        />
      </DialogContent>

      <DialogActions sx={styles.flexRow}>
        <Button
          variant="outlined"
          onClick={() => {
            onClose();
            setComment(undefined);
          }}
        >
          {t('cancel')}
        </Button>

        <LoadingButton
          loading={loading}
          variant="contained"
          type="submit"
          color="primary"
          onClick={trigger}
          disabled={!comment}
        >
          {t('add')}
        </LoadingButton>
      </DialogActions>

      {error ? <ErrorContainer>{error}</ErrorContainer> : null}
    </Dialog>
  );
}
