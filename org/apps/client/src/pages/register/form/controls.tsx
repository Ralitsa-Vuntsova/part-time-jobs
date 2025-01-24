import { Controller, useFormContext } from 'react-hook-form';
import { UserCreationSchema } from '../../../validation-schemas/user-creation-schema';
import { TextField } from '@mui/material';
import { makeStyles } from '../../../libs/make-styles';
import { useTranslation } from 'react-i18next';

const styles = makeStyles({
  input: {
    '&.valid': {
      boxShadow: '3px 3px 4px #CCC8C8',
    },
    width: ['200px', '250px', '300px'],
  },
});

export function RegisterControls() {
  const { control } = useFormContext<UserCreationSchema>();

  const { t } = useTranslation();

  return (
    <>
      <Controller
        name="username"
        control={control}
        render={({ field, fieldState: { error, invalid } }) => (
          <TextField
            label={`${t('username')}*`}
            {...field}
            className={invalid ? '' : 'valid'}
            error={invalid}
            helperText={error?.message}
            sx={styles.input}
          />
        )}
      />

      <Controller
        name="firstName"
        control={control}
        render={({ field, fieldState: { error, invalid } }) => (
          <TextField
            label={`${t('first-name')}*`}
            {...field}
            className={invalid ? '' : 'valid'}
            error={invalid}
            helperText={error?.message}
            sx={styles.input}
          />
        )}
      />

      <Controller
        name="lastName"
        control={control}
        render={({ field, fieldState: { error, invalid } }) => (
          <TextField
            label={`${t('last-name')}*`}
            {...field}
            className={invalid ? '' : 'valid'}
            error={invalid}
            helperText={error?.message}
            sx={styles.input}
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ field, fieldState: { error, invalid } }) => (
          <TextField
            label={`${t('email')}*`}
            {...field}
            className={invalid ? '' : 'valid'}
            error={invalid}
            helperText={error?.message}
            sx={styles.input}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field, fieldState: { error, invalid } }) => (
          <TextField
            label={`${t('password')}*`}
            type="password"
            {...field}
            className={invalid ? '' : 'valid'}
            error={invalid}
            helperText={error?.message}
            sx={styles.input}
          />
        )}
      />

      <Controller
        name="confirmPassword"
        control={control}
        render={({ field, fieldState: { error, invalid } }) => (
          <TextField
            label={`${t('confirm-password')}*`}
            type="password"
            {...field}
            className={invalid ? '' : 'valid'}
            error={invalid}
            helperText={error?.message}
            sx={styles.input}
          />
        )}
      />
    </>
  );
}
