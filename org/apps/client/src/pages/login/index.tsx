import { Link, TextField, Typography } from '@mui/material';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAsyncAction } from '../../hooks/use-async-action';
import {
  userLoginSchema,
  UserLoginSchema,
} from '../../validation-schemas/user-login-schema';
import { Navigate, useLocation } from 'react-router-dom';
import { makeStyles } from '../../libs/make-styles';
import { Link as RouterLink } from 'react-router-dom';
import { ErrorContainer } from '../../components/error-container';
import { LoadingButton } from '../../components/loading-button';
import { useState } from 'react';
import { authService } from '../../services/auth-service';
import { StyledStack } from '../../components/styled/stack';
import { StyledFormControl } from '../../components/styled/form-control';

const styles = makeStyles({
  input: {
    '&.valid': {
      boxShadow: '3px 3px 4px #CCC8C8',
    },
    width: ['200px', '250px', '300px'],
  },
  button: {
    width: '100%',
  },
});

export function Login() {
  const location = useLocation();

  const [loginError, setLoginError] = useState('');

  const redirectTo = location.state?.from?.pathname ?? '/';

  const { trigger, loading, error } = useAsyncAction(
    async ({ signal }, user: UserLoginSchema) => {
      try {
        await authService.login(user, signal);
      } catch {
        setLoginError('Wrong username or password');
        return;
      }
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
    return <Navigate to={redirectTo} />;
  }

  return (
    <StyledStack>
      <FormProvider {...form}>
        <StyledFormControl onSubmit={onSubmit} component="form">
          <Controller
            name="username"
            control={form.control}
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
            control={form.control}
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

          {loginError && <Typography color="error">{loginError}</Typography>}

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
        </StyledFormControl>
      </FormProvider>
    </StyledStack>
  );
}
