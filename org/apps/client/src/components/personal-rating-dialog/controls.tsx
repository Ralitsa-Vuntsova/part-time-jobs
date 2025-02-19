import { Box, TextField, Typography } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { makeStyles } from '../../libs/make-styles';
import { useTranslation } from 'react-i18next';
import { UserProfile } from '@shared/data-objects';
import { PersonalRatingsSchema } from '../../validation-schemas/personal-rating-schema';

const styles = makeStyles({
  input: {
    width: '100%',
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 1,
  },
});

interface Props {
  index: number;
  user: UserProfile;
}

export function PersonalRatingControls({ index, user }: Props) {
  const { control } = useFormContext<PersonalRatingsSchema>();

  const { t } = useTranslation();

  return (
    <Box sx={styles.flexColumn}>
      <Typography>{`${user.firstName} ${user.lastName}`}</Typography>

      <Controller
        name={`ratings.${index}.comment`}
        control={control}
        render={({ field, fieldState: { error, invalid } }) => (
          <TextField
            label={`${t('comment')}*`}
            {...field}
            multiline
            rows={5}
            sx={styles.input}
            error={invalid}
            helperText={error?.message}
          />
        )}
      />
    </Box>
  );
}
