import { useNavigate } from 'react-router-dom';
import { useAsyncAction } from '../../../hooks/use-async-action';
import { userService } from '../../../services/user-service';
import {
  toCreateUserDto,
  refinedUserCreationSchema,
  UserCreationSchema,
  defaultValues,
} from '../../../validation-schemas/user-creation-schema';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { StyledStack } from '../../../components/styled/stack';
import { StyledFormControl } from '../../../components/styled/form-control';
import { RegisterControls } from './controls';
import { LoadingButton } from '../../../components/loading-button';
import { Link, Typography } from '@mui/material';
import { ErrorContainer } from '../../../components/error-container';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '../../../libs/make-styles';

const styles = makeStyles({
  button: {
    background: (theme) => theme.palette.primary.main,
    width: '100%',
  },
});

interface Props {
  usernames: string[];
}

export function RegisterForm({ usernames }: Props) {
  const navigate = useNavigate();

  const { trigger, loading, error } = useAsyncAction(
    async ({ signal }, user: UserCreationSchema) => {
      await userService.createUser(toCreateUserDto(user), signal);

      navigate('/login');
    }
  );

  const form = useForm<UserCreationSchema>({
    defaultValues: defaultValues(),
    resolver: zodResolver(
      refinedUserCreationSchema.refine(
        (data) => !usernames?.includes(data.username),
        {
          message: 'Username already taken',
          path: ['username'],
        }
      )
    ),
  });

  const onSubmit = form.handleSubmit(trigger);

  return (
    <StyledStack>
      <FormProvider {...form}>
        <StyledFormControl onSubmit={onSubmit} component="form">
          <RegisterControls />

          <LoadingButton
            type="submit"
            variant="contained"
            loading={loading}
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

          {error ? <ErrorContainer>{error}</ErrorContainer> : null}
        </StyledFormControl>
      </FormProvider>
    </StyledStack>
  );
}
