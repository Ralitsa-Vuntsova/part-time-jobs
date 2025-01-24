import { Controller, useFormContext } from 'react-hook-form';
import { ServiceOfferCreationSchema } from '../../validation-schemas/service-offer-creation-schema';
import { Box, TextField } from '@mui/material';
import { makeStyles } from '../../libs/make-styles';
import { useTranslation } from 'react-i18next';

const styles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: ['column', 'row'],
    gap: 1,
  },
});

interface Props {
  index: number;
}

export function ContactRow({ index }: Props) {
  const { t } = useTranslation();

  const { control } = useFormContext<ServiceOfferCreationSchema>();

  return (
    <Box sx={styles.root}>
      <Controller
        name={`contacts.${index}.name`}
        control={control}
        render={({ field, fieldState: { error, invalid } }) => (
          <TextField
            label={`${t('name')}*`}
            {...field}
            error={invalid}
            helperText={error?.message}
          />
        )}
      />

      <Controller
        name={`contacts.${index}.email`}
        control={control}
        render={({ field, fieldState: { error, invalid } }) => (
          <TextField
            label={`${t('email')}*`}
            {...field}
            error={invalid}
            helperText={error?.message}
          />
        )}
      />

      <Controller
        name={`contacts.${index}.phoneNumber`}
        control={control}
        render={({ field, fieldState: { error, invalid } }) => (
          <TextField
            label={`${t('phone-number')}*`}
            {...field}
            error={invalid}
            helperText={error?.message}
          />
        )}
      />

      <Controller
        name={`contacts.${index}.address`}
        control={control}
        render={({ field, fieldState: { error, invalid } }) => (
          <TextField
            label={`${t('address')}*`}
            {...field}
            error={invalid}
            helperText={error?.message}
          />
        )}
      />
    </Box>
  );
}
