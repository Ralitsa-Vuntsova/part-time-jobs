import { TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { makeStyles } from '../../libs/make-styles';
import { UserLoginSchema } from '../../validation-schemas/user-login-schema';

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

  return (
    <>
      <Controller
        name="username"
        control={control}
        render={({ field, fieldState: { error, invalid } }) => (
          <TextField
            label="Username*"
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
            label="Password*"
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
