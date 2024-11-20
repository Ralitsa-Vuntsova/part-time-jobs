import { Box, Button, TextField } from '@mui/material';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import {
  userSchema,
  UserSchema,
} from '../../../validation-schemas/user-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAsyncAction } from '../../../hooks/use-async-action';
import { userService } from '../../../services/user-service';

// TODO: Add other fields
// TODO: Add validations
export function RegisterForm() {
  const form = useForm<UserSchema>({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: zodResolver(userSchema),
  });

  const { trigger } = useAsyncAction(async ({ signal }, user: UserSchema) =>
    userService.createUser(user, signal)
  );

  const onSubmit = form.handleSubmit(trigger);

  return (
    <FormProvider {...form}>
      <Box component="form" onSubmit={onSubmit}>
        <Controller
          name="username"
          control={form.control}
          render={({ field }) => <TextField label="Username" {...field} />}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field }) => <TextField label="Password" {...field} />}
        />

        <Button type="submit">Save</Button>
      </Box>
    </FormProvider>
  );
}
