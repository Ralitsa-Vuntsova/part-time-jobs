import { Box, Button, Stack, TextField } from '@mui/material';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import {
  toCreateUserDto,
  userCreationSchema,
  UserCreationSchema,
} from '../../validation-schemas/user-creation-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAsyncAction } from '../../hooks/use-async-action';
import { userService } from '../../services/user-service';
import { useAsync } from '../../hooks/use-async';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '../../libs/make-styles';

const styles = makeStyles({
  root: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: (theme) => theme.palette.primary.light,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
    p: 5,
    // TODO: Add to palette
    background: '#E8E8E8',
    borderRadius: '10px',
    boxShadow: '0px 0px 3px 2px #002C77',
  },
  input: {
    '&.valid': {
      boxShadow: '3px 3px 4px #CCC8C8',
    },
  },
  button: {
    background: (theme) => theme.palette.primary.light,
    width: '100%',
  },
});

export function Register() {
  const navigate = useNavigate();

  // TODO: Handle loading and errors
  const { data: userNames } = useAsync(
    async ({ signal }) => userService.getAllUsernames(signal),
    []
  );

  const { trigger } = useAsyncAction(
    async ({ signal }, user: UserCreationSchema) => {
      await userService.createUser(toCreateUserDto(user), signal);

      navigate('/login');
    }
  );

  const form = useForm<UserCreationSchema>({
    defaultValues: {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(
      userCreationSchema.refine((data) => !userNames?.includes(data.username), {
        message: 'Username already taken',
        path: ['username'],
      })
    ),
  });

  const onSubmit = form.handleSubmit(trigger);

  // TODO: Add button for Login
  return (
    <Stack sx={styles.root}>
      <FormProvider {...form}>
        <Box component="form" onSubmit={onSubmit} sx={styles.content}>
          <Controller
            name="username"
            control={form.control}
            render={({ field, fieldState: { error, invalid } }) => (
              <TextField
                label="Username"
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
            control={form.control}
            render={({ field, fieldState: { error, invalid } }) => (
              <TextField
                label="First Name"
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
            control={form.control}
            render={({ field, fieldState: { error, invalid } }) => (
              <TextField
                label="Last Name"
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
            control={form.control}
            render={({ field, fieldState: { error, invalid } }) => (
              <TextField
                label="Email"
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
            control={form.control}
            render={({ field, fieldState: { error, invalid } }) => (
              <TextField
                label="Password"
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
            control={form.control}
            render={({ field, fieldState: { error, invalid } }) => (
              <TextField
                label="Confirm Password"
                type="password"
                {...field}
                className={invalid ? '' : 'valid'}
                error={invalid}
                helperText={error?.message}
                sx={styles.input}
              />
            )}
          />

          <Button type="submit" variant="contained" sx={styles.button}>
            Register
          </Button>
        </Box>
      </FormProvider>
    </Stack>
  );
}
