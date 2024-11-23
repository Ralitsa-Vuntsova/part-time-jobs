import { Box, Button, TextField } from '@mui/material';
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
import { useNavigate } from 'react-router-dom';

export function Register() {
  const navigate = useNavigate();

  // TODO: Handle loading and errors
  const { data: userNames } = useAsync(async ({ signal }) =>
    userService.getAllUsernames(signal),
    []
  );

  const { trigger } = useAsyncAction(async ({ signal }, user: UserCreationSchema) => {
    await userService.createUser(toCreateUserDto(user), signal);

    navigate('/login');
  });

  const form = useForm<UserCreationSchema>({
    defaultValues: {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    resolver: zodResolver(userCreationSchema.refine((data) => !userNames?.includes(data.username), {
      message: 'Username already taken',
      path: ['username'],
    })),
  });

  const onSubmit = form.handleSubmit(trigger);

  // TODO: Add button for Login
  return (
    <FormProvider {...form}>
      <Box component="form" onSubmit={onSubmit}>
        <Controller
          name="username"
          control={form.control}
          render={({ field, fieldState: { error } }) => <TextField label="Username" {...field} helperText={error?.message} />}
        />

        <Controller
          name="firstName"
          control={form.control}
          render={({ field, fieldState: { error } }) => <TextField label="First Name" {...field} helperText={error?.message} />}
        />

        <Controller
          name="lastName"
          control={form.control}
          render={({ field, fieldState: { error } }) => <TextField label="Last Name" {...field} helperText={error?.message} />}
        />

        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState: { error } }) => <TextField label="Email" {...field} helperText={error?.message} />}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState: { error } }) => <TextField label="Password" type="password" {...field} helperText={error?.message} />}
        />

        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState: { error } }) => <TextField label="Confirm Password" type="password" {...field} helperText={error?.message} />}
        />

        <Button type="submit">Register</Button>
      </Box>
    </FormProvider>
  );
}
