import { Controller, useFormContext } from 'react-hook-form';
import { AdCreationSchema } from '../../validation-schemas/ad-creation-schema';
import { Box, TextField } from '@mui/material';
import { makeStyles } from '../../libs/make-styles';

const styles = makeStyles({
  root: {
    display: 'flex',
    gap: 1,
  },
});

interface Props {
  index: number;
}

export function ContactRow({ index }: Props) {
  const { control } = useFormContext<AdCreationSchema>();

  return (
    <Box sx={styles.root}>
      <Controller
        name={`contacts.${index}.name`}
        control={control}
        render={({ field, fieldState: { error, invalid } }) => (
          <TextField
            label="Name"
            {...field}
            error={invalid}
            helperText={error?.message}
          />
        )}
      />

      <Controller
        name={`contacts.${index}.email`}
        control={control}
        render={({ field, fieldState: { error, invalid } }) => (
          <TextField
            label="Email"
            {...field}
            error={invalid}
            helperText={error?.message}
          />
        )}
      />

      <Controller
        name={`contacts.${index}.phoneNumber`}
        control={control}
        render={({ field, fieldState: { error, invalid } }) => (
          <TextField
            label="Phone Number"
            {...field}
            error={invalid}
            helperText={error?.message}
          />
        )}
      />

      <Controller
        name={`contacts.${index}.location`}
        control={control}
        render={({ field, fieldState: { error, invalid } }) => (
          <TextField
            label="Location"
            {...field}
            error={invalid}
            helperText={error?.message}
          />
        )}
      />
    </Box>
  );
}
