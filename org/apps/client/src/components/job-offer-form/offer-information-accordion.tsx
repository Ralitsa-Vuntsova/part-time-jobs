import {
  Accordion,
  AccordionDetails,
  Box,
  TextField,
  Typography,
} from '@mui/material';
import { AccordionSummaryWithLeftIcon } from '../accordion-summary-with-left-icon';
import { LabeledControl } from '../labeled-control';
import { Controller, useFormContext } from 'react-hook-form';
import { makeStyles } from '../../libs/make-styles';
import { JobOfferCreationSchema } from '../../validation-schemas/job-offer-creation-schema';
import { PriceControls } from './price-controls';
import { PersonNumberControls } from './person-number-controls';

const styles = makeStyles({
  input: {
    width: '100%',
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
  },
  responsiveFlexRow: {
    display: 'flex',
    flexDirection: ['column', null, null, 'row'],
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
        <Controller
          name="dateTime"
          control={control}
          render={({ field, fieldState: { error, invalid } }) => (
            <LabeledControl
              label="Date and time"
              detailedLabel="When should the service be performed?"
              sx={styles.input}
            >
              <TextField
                label="Datetime*"
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
          name="location"
          control={control}
          render={({ field, fieldState: { error, invalid } }) => (
            <LabeledControl
              label="Location"
              detailedLabel="Where should the service be performed?"
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
          <PersonNumberControls />

          <Controller
            name="qualification"
            control={control}
            render={({ field, fieldState: { error, invalid } }) => (
              <LabeledControl
                label="Qualification"
                detailedLabel="What qualification is needed for the service to be performed?"
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
              label="Duration"
              detailedLabel="How long does the service take to perform?"
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
                label="Urgency"
                detailedLabel="How urgent is the service?"
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
                label="Difficulty"
                detailedLabel="How difficult is the service?"
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

        <LabeledControl
          label="Price"
          detailedLabel="What would be the cost of performing the service?"
          sx={styles.input}
        >
          <Box sx={styles.responsiveFlexRow}>
            <PriceControls />
          </Box>
        </LabeledControl>
      </AccordionDetails>
    </Accordion>
  );
}
