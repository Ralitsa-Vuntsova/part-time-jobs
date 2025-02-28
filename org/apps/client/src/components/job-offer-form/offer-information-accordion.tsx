import {
  Accordion,
  AccordionDetails,
  Box,
  TextField,
  Typography,
} from '@mui/material';
import { AccordionSummary } from '../accordion-summary';
import { LabeledControl } from '../labeled-control';
import { Controller, useFormContext } from 'react-hook-form';
import { makeStyles } from '../../libs/make-styles';
import { JobOfferCreationSchema } from '../../validation-schemas/job-offer-creation-schema';
import { PriceControls } from './price-controls';
import { PersonNumberControls } from './person-number-controls';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  const { control } = useFormContext<JobOfferCreationSchema>();

  return (
    <Accordion defaultExpanded>
      <AccordionSummary>
        <Typography>{t('offer-information')}</Typography>
      </AccordionSummary>
      <AccordionDetails sx={styles.flexColumn}>
        <Controller
          name="dateTime"
          control={control}
          render={({ field, fieldState: { error, invalid } }) => (
            <LabeledControl
              label={t('date-and-time')}
              detailedLabel={t('date-and-time-question')}
              sx={styles.input}
            >
              <TextField
                label={`${t('datetime')}*`}
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
              label={t('location')}
              detailedLabel={t('location-question')}
              sx={styles.input}
            >
              <TextField
                label={`${t('location')}*`}
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
                label={t('qualification')}
                detailedLabel={t('qualification-question')}
                sx={styles.input}
              >
                <TextField
                  label={`${t('qualification')}*`}
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
              label={t('duration')}
              detailedLabel={t('duration-question')}
              sx={styles.input}
            >
              <TextField
                label={`${t('duration')}*`}
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
                label={t('urgency')}
                detailedLabel={t('urgency-question')}
                sx={styles.input}
              >
                <TextField
                  label={t('urgency')}
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
                label={t('difficulty')}
                detailedLabel={t('difficulty-question')}
                sx={styles.input}
              >
                <TextField
                  label={t('difficulty')}
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
          label={t('price')}
          detailedLabel={t('price-question')}
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
