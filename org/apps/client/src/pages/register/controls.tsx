import { Controller, useFormContext } from 'react-hook-form';
import { UserCreationSchema } from '../../validation-schemas/user-creation-schema';
import { TextField } from '@mui/material';
import { makeStyles } from '../../libs/make-styles';

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

  return (
    <>
      <Controller
        name="username"
        control={control}
        render={({ field, fieldState: { error, invalid } }) => (
          <TextField
            label="Username*"
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
            label="First Name*"
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
            label="Last Name*"
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
            label="Email*"
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

      <Controller
        name="confirmPassword"
        control={control}
        render={({ field, fieldState: { error, invalid } }) => (
          <TextField
            label="Confirm Password*"
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
