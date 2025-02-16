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
import { JobOfferDto } from '@shared/data-objects';
import { useCurrentUser } from '../../hooks/use-current-user';
import { useServicePerformer } from '../../hooks/use-service-performer';

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
  ad: JobOfferDto;
}

export function PersonalRatingDialog({ open, onClose, ad }: Props) {
  const [comment, setComment] = useState<string>();

  const { t } = useTranslation();

  const currentUser = useCurrentUser();
  const servicePerformer = useServicePerformer(ad._id);

  const userId =
    currentUser?._id === ad?.createdBy ? servicePerformer?._id : ad?.createdBy;

  if (!userId) {
    return null;
  }

  const { trigger, loading, error } = useAsyncAction(async ({ signal }) => {
    await personalRatingService.create(
      {
        comment: comment ?? '',
        adId: ad._id,
        userId,
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
