import { Link, Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
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
import { LoginControls } from './controls';
import { useCurrentUser } from '../../hooks/use-current-user';

const styles = makeStyles({
  button: {
    width: '100%',
  },
});

export function Login() {
  const currentUser = useCurrentUser();

  const [loginError, setLoginError] = useState('');

  const location = useLocation();
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

  if (currentUser) {
    return <Navigate to={redirectTo} />;
  }

  return (
    <StyledStack>
      <FormProvider {...form}>
        <StyledFormControl onSubmit={onSubmit} component="form">
          <LoginControls />

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
