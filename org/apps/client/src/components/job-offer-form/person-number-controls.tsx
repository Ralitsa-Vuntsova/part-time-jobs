import { Box, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { LabeledControl } from '../labeled-control';
import { Controller, useFormContext } from 'react-hook-form';
import { JobOfferCreationSchema } from '../../validation-schemas/job-offer-creation-schema';
import { makeStyles } from '../../libs/make-styles';

const styles = makeStyles({
  smallInput: {
    width: ['100%', '50%'],
  },
  responsiveFlexRow: {
    display: 'flex',
    flexDirection: ['column', null, null, 'row'],
    gap: 2,
  },
  typography: {
    '& .MuiTypography-root': {
      width: 'max-content',
    },
  },
});

export function PersonNumberControls() {
  const { control, watch } = useFormContext<JobOfferCreationSchema>();
  const notSure = watch('personNumber.notSure');

  return (
    <LabeledControl
      label="Number of people"
      detailedLabel="How many people are needed for the service to be performed?"
      sx={styles.smallInput}
    >
      <Box sx={styles.responsiveFlexRow}>
        <Controller
          name="personNumber.value"
          control={control}
          render={({ field, fieldState: { error, invalid } }) => (
            <TextField
              label="Number of People*"
              type="number"
              {...field}
              onChange={(e) => field.onChange(Number(e.target.value))}
              error={invalid}
              helperText={error?.message}
              sx={styles.smallInput}
              disabled={notSure}
            />
          )}
        />

        <Controller
          name="personNumber.notSure"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox checked={field.value} />}
              label="Not Sure"
              {...field}
              sx={styles.typography}
            />
          )}
        />
      </Box>
    </LabeledControl>
  );
}
