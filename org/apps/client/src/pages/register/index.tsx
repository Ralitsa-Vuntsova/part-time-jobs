import {
  Box,
  CircularProgress,
  Link,
  TextField,
  Typography,
} from '@mui/material';
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
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { makeStyles } from '../../libs/make-styles';
import { Link as RouterLink } from 'react-router-dom';
import { ErrorContainer } from '../../components/error-container';
import { StyledFormControl } from '../../components/styled/form-control';
import { StyledStack } from '../../components/styled/stack';
import { LoadingButton } from '../../components/loading-button';
import { LOADING_PROPS } from '../../components/async-data-loader';

const styles = makeStyles({
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
  const { state } = useLocation();

  const {
    data: userNames,
    loading: userNamesLoading,
    error: userNamesError,
  } = useAsync(async ({ signal }) => userService.getAllUsernames(signal), []);

  const {
    trigger,
    loading: createUserLoading,
    error: createUserError,
  } = useAsyncAction(async ({ signal }, user: UserCreationSchema) => {
    await userService.createUser(toCreateUserDto(user), signal);

    navigate(state.path ?? '/login');
  });

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

  if (localStorage.getItem('currentUser')) {
    return <Navigate to="/" />;
  }

  if (userNamesLoading) {
    return (
      <Box sx={LOADING_PROPS.BLANK_PAGE.sx}>
        <CircularProgress size={LOADING_PROPS.BLANK_PAGE.size} />
      </Box>
    );
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
            control={form.control}
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
            control={form.control}
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

          <Controller
            name="confirmPassword"
            control={form.control}
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

          <LoadingButton
            type="submit"
            variant="contained"
            loading={createUserLoading}
            sx={styles.button}
          >
            Register
          </LoadingButton>

          <Typography>
            Already have an account?{' '}
            <Link component={RouterLink} to="/login" underline="none">
              Login
            </Link>
          </Typography>

          {userNamesError ? (
            <ErrorContainer>{userNamesError}</ErrorContainer>
          ) : null}
          {createUserError ? (
            <ErrorContainer>{createUserError}</ErrorContainer>
          ) : null}
        </StyledFormControl>
      </FormProvider>
    </StyledStack>
  );
}
