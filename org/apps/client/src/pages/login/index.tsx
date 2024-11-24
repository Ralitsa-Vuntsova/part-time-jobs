import { Box, Link, Stack, TextField, Typography } from '@mui/material';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAsyncAction } from '../../hooks/use-async-action';
import {
  userLoginSchema,
  UserLoginSchema,
} from '../../validation-schemas/user-login-schema';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { makeStyles } from '../../libs/make-styles';
import { Link as RouterLink } from 'react-router-dom';
import { ErrorContainer } from '../../components/error-container';
import { LoadingButton } from '../../components/loading-button';
import { useState } from 'react';
import { authService } from '../../services/auth-service';

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
    background: (theme) => theme.palette.background.paper,
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
  const { state } = useLocation();

  const [loginError, setLoginError] = useState();

  const { trigger, loading, error } = useAsyncAction(
    async ({ signal }, user: UserLoginSchema) => {
      try {
        await authService.login(user, signal);
      } catch {
        setLoginError(loginError);
        return;
      }

      navigate(state.path ?? '/');
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

  if (localStorage.getItem('currentUser')) {
    return <Navigate to="/" />;
  }

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

          {loginError && (
            <Typography color="error">Wrong credentials</Typography>
          )}

          <LoadingButton
            type="submit"
            variant="contained"
            sx={styles.button}
            loading={loading}
          >
            Login
          </LoadingButton>

          <Typography>
            Don't have an account?{' '}
            <Link component={RouterLink} to="/register" underline="none">
              Register
            </Link>
          </Typography>

          {error ? <ErrorContainer>{error}</ErrorContainer> : null}
        </Box>
      </FormProvider>
    </Stack>
  );
}
