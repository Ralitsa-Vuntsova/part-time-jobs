import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '../../libs/make-styles';
import { LoadingButton } from '../loading-button';
import { useAsyncAction } from '../../hooks/use-async-action';
import { ErrorContainer } from '../error-container';
import { publicRatingService } from '../../services/public-rating-service';
import { JobOfferDto, UserProfile } from '@shared/data-objects';
import {
  defaultRatings,
  publicRatingsSchema,
  PublicRatingsSchema,
  toCreatePublicRatingDto,
} from '../../validation-schemas/public-rating-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { PublicRatingControls } from './controls';

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
    gap: 3,
  },
  input: {
    width: '100%',
  },
});

interface Props {
  open: boolean;
  onClose: () => unknown;
  ad: JobOfferDto;
  users: UserProfile[];
}

export function PublicRatingDialog({ open, onClose, ad, users }: Props) {
  const { t } = useTranslation();

  const form = useForm<PublicRatingsSchema>({
    defaultValues: {
      ratings: defaultRatings(users),
    },
    resolver: zodResolver(publicRatingsSchema),
  });

  const { trigger, loading, error } = useAsyncAction(
    async ({ signal }, publicRatings: PublicRatingsSchema) => {
      const ratings = publicRatings.ratings.map((r) =>
        toCreatePublicRatingDto(r, ad._id)
      );

      await publicRatingService.create(ratings, signal);

      onClose();
    }
  );

  const onSubmit = form.handleSubmit(trigger);

  return (
    <FormProvider {...form}>
      <Dialog
        open={open}
        onSubmit={onSubmit}
        onClose={() => {
          onClose();
          form.reset();
        }}
        fullWidth
        component="form"
      >
        <DialogTitle sx={styles.title}>{t('public-rating')}</DialogTitle>

        <DialogContent sx={styles.flexColumn}>
          {users.map(
            (user, index) =>
              user && (
                <Box key={user?._id} sx={styles.flexColumn}>
                  <PublicRatingControls index={index} user={user} />
                  <Divider />
                </Box>
              )
          )}
        </DialogContent>

        <DialogActions sx={styles.flexRow}>
          <Button
            variant="outlined"
            onClick={() => {
              onClose();
              form.reset();
            }}
          >
            {t('cancel')}
          </Button>

          <LoadingButton
            loading={loading}
            variant="contained"
            type="submit"
            color="primary"
          >
            {t('add')}
          </LoadingButton>
        </DialogActions>

        {error ? <ErrorContainer>{error}</ErrorContainer> : null}
      </Dialog>
    </FormProvider>
  );
}
