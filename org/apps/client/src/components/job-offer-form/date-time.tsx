import { Controller, useFormContext } from 'react-hook-form';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Box } from '@mui/material';
import dayjs from 'dayjs';
import { JobOfferCreationSchema } from '../../validation-schemas/job-offer-creation-schema';
import { makeStyles } from '../../libs/make-styles';

const styles = makeStyles({
  box: {
    display: 'flex',
    flexDirection: ['column', 'row'],
    gap: 2,
  },
});

interface Props {
  index: number;
}

export function DateTime({ index }: Props) {
  const { control } = useFormContext<JobOfferCreationSchema>();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={styles.box}>
        <Controller
          name={`dateTime.${index}.date`}
          control={control}
          render={({ field }) => (
            <DatePicker
              label="Date"
              {...field}
              value={field.value ?? dayjs()}
              inputRef={field.ref}
            />
          )}
        />

        <Controller
          name={`dateTime.${index}.time`}
          control={control}
          render={({ field }) => (
            <TimePicker
              label="Time"
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
