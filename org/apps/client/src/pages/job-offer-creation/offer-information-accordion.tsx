import {
  Accordion,
  AccordionDetails,
  Box,
  TextField,
  Typography,
} from '@mui/material';
import { AccordionSummaryWithLeftIcon } from '../../components/accordion-summary-with-left-icon';
import { LabeledControl } from '../../components/labeled-control';
import { DateTime } from './date-time';
import { Controller, useFormContext } from 'react-hook-form';
import { makeStyles } from '../../libs/make-styles';
import { times } from 'lodash';
import { JobOfferCreationSchema } from '../../validation-schemas/job-offer-creation-schema';

const styles = makeStyles({
  input: {
    width: '100%',
  },
  smallInput: {
    width: ['100%', '50%'],
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
  },
  responsiveFlexRow: {
    display: 'flex',
    flexDirection: ['column', 'row'],
    gap: 2,
  },
});

export function OfferInformationAccordion() {
  const { control } = useFormContext<JobOfferCreationSchema>();

  return (
    <Accordion defaultExpanded>
      <AccordionSummaryWithLeftIcon>
        <Typography>Offer Information</Typography>
      </AccordionSummaryWithLeftIcon>
      <AccordionDetails sx={styles.flexColumn}>
        <LabeledControl label="When should the service be performed (select three options)?">
          <Box sx={styles.flexColumn}>
            {times(3, (index) => (
              <DateTime key={index} index={index} />
            ))}
          </Box>
        </LabeledControl>

        <Controller
          name="location"
          control={control}
          render={({ field, fieldState: { error, invalid } }) => (
            <LabeledControl
              label="Where should the service be performed?"
              sx={styles.input}
            >
              <TextField
                label="Location*"
                multiline
                rows={2}
                {...field}
                error={invalid}
                helperText={error?.message}
                sx={styles.input}
              />
            </LabeledControl>
          )}
        />

        <Box sx={styles.responsiveFlexRow}>
          <Controller
            name="personNumber"
            control={control}
            render={({ field, fieldState: { error, invalid } }) => (
              <LabeledControl
                label="How many people are needed for the service to be performed?"
                sx={styles.smallInput}
              >
                <TextField
                  label="Number of people*"
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  error={invalid}
                  helperText={error?.message}
                  sx={styles.smallInput}
                />
              </LabeledControl>
            )}
          />

          <Controller
            name="qualification"
            control={control}
            render={({ field, fieldState: { error, invalid } }) => (
              <LabeledControl
                label="What qualification is needed for the service to be performed?"
                sx={styles.input}
              >
                <TextField
                  label="Qualification*"
                  multiline
                  rows={2}
                  {...field}
                  error={invalid}
                  helperText={error?.message}
                  sx={styles.input}
                />
              </LabeledControl>
            )}
          />
        </Box>

        <Controller
          name="duration"
          control={control}
          render={({ field, fieldState: { error, invalid } }) => (
            <LabeledControl
              label="How long does the service take to perform?"
              sx={styles.input}
            >
              <TextField
                label="Duration*"
                multiline
                rows={2}
                {...field}
                error={invalid}
                helperText={error?.message}
                sx={styles.input}
              />
            </LabeledControl>
          )}
        />

        <Box sx={styles.responsiveFlexRow}>
          <Controller
            name="urgency"
            control={control}
            render={({ field, fieldState: { error, invalid } }) => (
              <LabeledControl
                label="How urgent is the service?"
                sx={styles.input}
              >
                <TextField
                  label="Urgency"
                  multiline
                  rows={2}
                  {...field}
                  error={invalid}
                  helperText={error?.message}
                  sx={styles.input}
                />
              </LabeledControl>
            )}
          />

          <Controller
            name="difficulty"
            control={control}
            render={({ field, fieldState: { error, invalid } }) => (
              <LabeledControl
                label="How difficult is the service?"
                sx={styles.input}
              >
                <TextField
                  label="Difficulty"
                  multiline
                  rows={2}
                  {...field}
                  error={invalid}
                  helperText={error?.message}
                  sx={styles.input}
                />
              </LabeledControl>
            )}
          />
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
