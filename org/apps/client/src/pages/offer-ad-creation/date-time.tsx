import { Controller, useFormContext } from 'react-hook-form';
import { OfferAdCreationSchema } from '../../validation-schemas/offer-ad-creation-schema';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { makeStyles } from '../../libs/make-styles';
import { Box } from '@mui/material';
import dayjs from 'dayjs';

const styles = makeStyles({
  box: {
    display: 'flex',
    gap: 2,
  },
});

interface Props {
  index: number;
}

export function DateTime({ index }: Props) {
  const { control } = useFormContext<OfferAdCreationSchema>();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={styles.box}>
        <Controller
          name={`dateTime.${index}.date`}
          control={control}
          render={({ field, fieldState: { error, invalid } }) => (
            <DatePicker
              label="Basic date picker"
              {...field}
              value={field.value ?? dayjs()}
              inputRef={field.ref}
            />
          )}
        />

        <Controller
          name={`dateTime.${index}.time`}
          control={control}
          render={({ field, fieldState: { error, invalid } }) => (
            <TimePicker
              label="Basic time picker"
              {...field}
              value={field.value ?? dayjs()}
              inputRef={field.ref}
            />
          )}
        />
      </Box>
    </LocalizationProvider>
  );
}
