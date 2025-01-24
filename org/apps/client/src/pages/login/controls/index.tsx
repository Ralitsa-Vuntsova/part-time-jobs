import { TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { makeStyles } from '../../../libs/make-styles';
import { UserLoginSchema } from '../../../validation-schemas/user-login-schema';
import { useTranslation } from 'react-i18next';

const styles = makeStyles({
  input: {
    '&.valid': {
      boxShadow: '3px 3px 4px #CCC8C8',
    },
    width: ['200px', '250px', '300px'],
  },
});

export function LoginControls() {
  const { control } = useFormContext<UserLoginSchema>();

  const { t } = useTranslation();

  return (
    <>
      <Controller
        name="username"
        control={control}
        render={({ field, fieldState: { error, invalid } }) => (
          <TextField
            label={`${t('username')}*`}
            className={invalid ? '' : 'valid'}
            {...field}
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
    </>
  );
}
