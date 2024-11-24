import { Box, Button, Stack, TextField } from '@mui/material';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAsyncAction } from '../../hooks/use-async-action';
import { userService } from '../../services/user-service';
import {
  userLoginSchema,
  UserLoginSchema,
} from '../../validation-schemas/user-login-schema';
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

export function Login() {
  const navigate = useNavigate();

  // TODO: Handle loading and errors
  const { trigger } = useAsyncAction(
    async ({ signal }, user: UserLoginSchema) => {
      await userService.login(user, signal);

      navigate('/');
    }
  );

  const form = useForm<UserLoginSchema>({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: zodResolver(userLoginSchema),
  });

  const onSubmit = form.handleSubmit(trigger);

  // TODO: Add button for Register
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

          <Button type="submit" variant="contained" sx={styles.button}>
            Login
          </Button>
        </Box>
      </FormProvider>
    </Stack>
  );
}
