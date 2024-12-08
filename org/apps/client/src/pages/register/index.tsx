import { Box, CircularProgress, Link, Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import {
  defaultValues,
  toCreateUserDto,
  userCreationSchema,
  UserCreationSchema,
} from '../../validation-schemas/user-creation-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAsyncAction } from '../../hooks/use-async-action';
import { userService } from '../../services/user-service';
import { useAsync } from '../../hooks/use-async';
import { Navigate, useNavigate } from 'react-router-dom';
import { makeStyles } from '../../libs/make-styles';
import { Link as RouterLink } from 'react-router-dom';
import { ErrorContainer } from '../../components/error-container';
import { StyledFormControl } from '../../components/styled/form-control';
import { StyledStack } from '../../components/styled/stack';
import { LoadingButton } from '../../components/loading-button';
import { LOADING_PROPS } from '../../components/async-data-loader';
import { RegisterControls } from './controls';
import { useCurrentUser } from '../../hooks/use-current-user';

const styles = makeStyles({
  button: {
    background: (theme) => theme.palette.primary.main,
    width: '100%',
  },
});

export function Register() {
  const navigate = useNavigate();
  const currentUser = useCurrentUser();

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

    navigate('/login');
  });

  const form = useForm<UserCreationSchema>({
    defaultValues: defaultValues(),
    resolver: zodResolver(
      userCreationSchema.refine((data) => !userNames?.includes(data.username), {
        message: 'Username already taken',
        path: ['username'],
      })
    ),
  });

  const onSubmit = form.handleSubmit(trigger);

  if (currentUser) {
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
          <RegisterControls />

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
