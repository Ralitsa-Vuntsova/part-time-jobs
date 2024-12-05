import { UserProfile } from '@shared/data-objects';
import { useAsyncAction } from '../../hooks/use-async-action';
import { userService } from '../../services/user-service';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, TextField } from '@mui/material';
import { LoadingButton } from '../../components/loading-button';
import { ErrorContainer } from '../../components/error-container';
import { makeStyles } from '../../libs/make-styles';
import {
  defaultValues,
  toEditUserDto,
  userEditSchema,
  UserEditSchema,
} from '../../validation-schemas/user-edit-schema';
import { useEffect, useState } from 'react';
import { isEqual } from 'lodash';

interface Props {
  userData: UserProfile;
}

const styles = makeStyles({
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    alignItems: 'center',
  },
  input: {
    width: '500px',
  },
});

// TODO: Consider adding phone number and address
// TODO: Consider adding message for success
export function EditProfileForm({ userData }: Props) {
  const { trigger, loading, error } = useAsyncAction(
    async ({ signal }, user: UserEditSchema) => {
      await userService.editUser(userData._id, toEditUserDto(user), signal);
    }
  );

  const formDefaultValues = defaultValues(userData);

  const form = useForm<UserEditSchema>({
    defaultValues: formDefaultValues,
    resolver: zodResolver(userEditSchema),
  });

  const [changed, setChanged] = useState(
    !isEqual(form.getValues(), formDefaultValues)
  );

  useEffect(() => {
    setChanged(!isEqual(form.getValues(), formDefaultValues));

    const subscription = form.watch(() => {
      setChanged(!isEqual(form.getValues(), formDefaultValues));
    });

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      subscription.unsubscribe;
    };
  }, [form, formDefaultValues]);

  const onSubmit = form.handleSubmit(trigger);

  return (
    <FormProvider {...form}>
      <Box onSubmit={onSubmit} component="form" sx={styles.flexColumn}>
        <Box sx={styles.flexColumn}>
          <TextField
            label="Username"
            value={userData.username}
            sx={styles.input}
            slotProps={{ htmlInput: { readOnly: true } }}
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
        </Box>

        <LoadingButton
          type="submit"
          variant="contained"
          loading={loading}
          disabled={!changed}
        >
          Save
        </LoadingButton>

        {error ? <ErrorContainer>{error}</ErrorContainer> : null}
      </Box>
    </FormProvider>
  );
}
