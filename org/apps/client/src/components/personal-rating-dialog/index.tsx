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
import { personalRatingService } from '../../services/personal-rating-service';
import { ErrorContainer } from '../error-container';
import { JobOfferDto } from '@shared/data-objects';
import {
  defaultRatings,
  personalRatingsSchema,
  PersonalRatingsSchema,
  toCreatePersonalRatingDto,
} from '../../validation-schemas/personal-rating-schema';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PersonalRatingControls } from './controls';
import { useUsers } from '../../hooks/use-users';
import { sortBy } from 'lodash';

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
  userIds: string[];
}

export function PersonalRatingDialog({ open, onClose, ad, userIds }: Props) {
  const { t } = useTranslation();

  const { data: users } = useUsers(userIds);

  const form = useForm<PersonalRatingsSchema>({
    defaultValues: {
      ratings: defaultRatings(users ?? []),
    },
    resolver: zodResolver(personalRatingsSchema),
  });

  const { trigger, loading, error } = useAsyncAction(
    async ({ signal }, persosnalRatings: PersonalRatingsSchema) => {
      const ratings = persosnalRatings.ratings.map((r) =>
        toCreatePersonalRatingDto(r, ad._id)
      );

      await personalRatingService.create(ratings, signal);

      form.reset();
      onClose();
    }
  );

  const onSubmit = form.handleSubmit(trigger);

  const sortedUsers = sortBy(users);

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
        <DialogTitle sx={styles.title}>{t('personal-rating')}</DialogTitle>

        <DialogContent sx={styles.flexColumn}>
          {sortedUsers.map(
            (user, index) =>
              user && (
                <Box key={user?._id} sx={styles.flexColumn}>
                  <PersonalRatingControls index={index} user={user} />
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
