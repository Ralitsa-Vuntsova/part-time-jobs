import { UserProfile } from '@shared/data-objects';
import { useAsyncAction } from '../../../hooks/use-async-action';
import { userService } from '../../../services/user-service';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, TextField } from '@mui/material';
import { LoadingButton } from '../../../components/loading-button';
import { ErrorContainer } from '../../../components/error-container';
import { makeStyles } from '../../../libs/make-styles';
import {
  defaultValues,
  toEditUserDto,
  userEditSchema,
  UserEditSchema,
} from '../../../validation-schemas/user-edit-schema';
import { useEffect, useState } from 'react';
import { isEqual } from 'lodash';
import CheckIcon from '@mui/icons-material/Check';
import { useTranslation } from 'react-i18next';

const styles = makeStyles({
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    alignItems: 'center',
  },
  flexRow: {
    display: 'flex',
    gap: 2,
  },
  input: {
    width: ['auto', '500px'],
  },
  icon: {
    color: (theme) => theme.palette.success.main,
  },
});

interface Props {
  userData: UserProfile;
}

export function EditProfileForm({ userData }: Props) {
  const [isSuccess, setIsSuccess] = useState(false);

  const { t } = useTranslation();

  const { trigger, loading, error } = useAsyncAction(
    async ({ signal }, user: UserEditSchema) => {
      await userService.editUser(userData._id, toEditUserDto(user), signal);

      setIsSuccess(true);
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
            label={t('username')}
            value={userData.username}
            sx={styles.input}
            slotProps={{ htmlInput: { readOnly: true } }}
          />

          <Controller
            name="firstName"
            control={form.control}
            render={({ field, fieldState: { error, invalid } }) => (
              <TextField
                label={t('first-name')}
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
                label={t('last-name')}
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
                label={t('email')}
                {...field}
                className={invalid ? '' : 'valid'}
                error={invalid}
                helperText={error?.message}
                sx={styles.input}
              />
            )}
          />

          <Controller
            name="phoneNumber"
            control={form.control}
            render={({ field, fieldState: { error, invalid } }) => (
              <TextField
                label={t('phone-number')}
                {...field}
                className={invalid ? '' : 'valid'}
                error={invalid}
                helperText={error?.message}
                sx={styles.input}
              />
            )}
          />

          <Controller
            name="address"
            control={form.control}
            render={({ field, fieldState: { error, invalid } }) => (
              <TextField
                label={t('address')}
                {...field}
                className={invalid ? '' : 'valid'}
                error={invalid}
                helperText={error?.message}
                sx={styles.input}
              />
            )}
          />
        </Box>

        <Box sx={styles.flexRow}>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={loading}
            disabled={!changed}
          >
            {t('save')}
          </LoadingButton>

          {isSuccess && <CheckIcon sx={styles.icon} />}
        </Box>

        {error ? <ErrorContainer>{error}</ErrorContainer> : null}
      </Box>
    </FormProvider>
  );
}
