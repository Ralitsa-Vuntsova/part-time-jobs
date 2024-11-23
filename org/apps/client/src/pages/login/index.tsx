import { Box, Button, TextField } from '@mui/material';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAsyncAction } from '../../hooks/use-async-action';
import { userService } from '../../services/user-service';
import { userLoginSchema, UserLoginSchema } from '../../validation-schemas/user-login-schema';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const navigate = useNavigate();

  // TODO: Handle loading and errors
  const { trigger } = useAsyncAction(async ({ signal }, user: UserLoginSchema) => {
    await userService.login(user, signal);

    navigate('/');
  });

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
    <FormProvider {...form}>
      <Box component="form" onSubmit={onSubmit}>
        <Controller
          name="username"
          control={form.control}
          render={({ field, fieldState: { error } }) => <TextField label="Username" {...field} helperText={error?.message} />}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState: { error } }) => <TextField label="Password" type="password" {...field} helperText={error?.message} />}
        />

        <Button type="submit">Login</Button>
      </Box>
    </FormProvider>
  );
}
