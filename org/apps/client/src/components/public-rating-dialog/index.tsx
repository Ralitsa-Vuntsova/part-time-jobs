import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
  TextField,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '../../libs/make-styles';
import { LoadingButton } from '../loading-button';
import { useState } from 'react';
import { useAsyncAction } from '../../hooks/use-async-action';
import { ErrorContainer } from '../error-container';
import { publicRatingService } from '../../services/public-rating-service';
import { useCurrentUser } from '../../hooks/use-current-user';
import { useServicePerformer } from '../../hooks/use-service-performer';
import { JobOfferDto } from '@shared/data-objects';

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
    alignItems: 'center',
    gap: 2,
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

interface PrivateRating {
  comment?: string;
  rateValue?: number;
}

export function PrivateRatingDialog({ open, onClose, ad }: Props) {
  const currentUser = useCurrentUser();

  const [rating, setRating] = useState<PrivateRating>();

  const { t } = useTranslation();

  const servicePerformer = useServicePerformer(ad._id);

  const userId =
    currentUser?._id === ad?.createdBy ? servicePerformer?._id : ad?.createdBy;

  if (!userId) {
    return null;
  }

  const { trigger, loading, error } = useAsyncAction(async ({ signal }) => {
    await publicRatingService.create(
      {
        comment: rating?.comment ?? '',
        rateValue: rating?.rateValue ?? 0,
        adId: ad._id,
        userId,
      },
      signal
    );

    setRating(undefined);
    onClose();
  });

  return (
    <Dialog open={open} onSubmit={trigger} onClose={onClose} fullWidth>
      <DialogTitle sx={styles.title}>{t('public-rating')}</DialogTitle>

      <DialogContent sx={styles.flexColumn}>
        <TextField
          label={`${t('comment')}*`}
          multiline
          rows={5}
          sx={styles.input}
          onChange={(e) =>
            setRating({ ...rating, comment: String(e.target.value) })
          }
        />

        <Rating
          value={rating?.rateValue}
          onChange={(_, newValue) => {
            setRating({ ...rating, rateValue: Number(newValue) });
          }}
        />
      </DialogContent>

      <DialogActions sx={styles.flexRow}>
        <Button
          variant="outlined"
          onClick={() => {
            onClose();
            setRating(undefined);
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
          disabled={!rating?.comment || !rating.rateValue}
        >
          {t('add')}
        </LoadingButton>
      </DialogActions>

      {error ? <ErrorContainer>{error}</ErrorContainer> : null}
    </Dialog>
  );
}
