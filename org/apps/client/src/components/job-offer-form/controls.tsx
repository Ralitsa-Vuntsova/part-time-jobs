import {
  Accordion,
  AccordionDetails,
  Box,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { AccordionSummaryWithLeftIcon } from '../accordion-summary-with-left-icon';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { OfferInformationAccordion } from './offer-information-accordion';
import { times } from 'lodash';
import { ContactRow } from '../contact-row';
import { AddButton } from '../add-button';
import { makeStyles } from '../../libs/make-styles';
import { JobOfferCreationSchema } from '../../validation-schemas/job-offer-creation-schema';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';

const styles = makeStyles({
  input: {
    width: '100%',
  },
  smallInput: {
    width: ['100%', '25%'],
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
  },
  flexRow: {
    display: 'flex',
    gap: 2,
  },
  iconButton: {
    '&.Mui-disabled': {
      svg: {
        color: (theme) => theme.palette.action.disabled,
      },
    },
  },
});

export function JobOfferControls() {
  const { t } = useTranslation();

  const form = useFormContext<JobOfferCreationSchema>();

  const { append, remove } = useFieldArray({
    control: form.control,
    name: 'contacts',
  });
  const contacts = form.watch('contacts');

  return (
    <>
      <Accordion defaultExpanded>
        <AccordionSummaryWithLeftIcon>
          <Typography>{t('description')}</Typography>
        </AccordionSummaryWithLeftIcon>
        <AccordionDetails sx={styles.flexColumn}>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState: { error, invalid } }) => (
              <TextField
                label={`${t('name')}*`}
                {...field}
                error={invalid}
                helperText={error?.message}
                sx={styles.smallInput}
              />
            )}
          />

          <Controller
            name="description"
            control={form.control}
            render={({ field, fieldState: { error, invalid } }) => (
              <TextField
                label={`${t('description')}*`}
                multiline
                rows={5}
                {...field}
                error={invalid}
                helperText={error?.message}
                sx={styles.input}
              />
            )}
          />
        </AccordionDetails>
      </Accordion>

      <OfferInformationAccordion />

      <Accordion defaultExpanded>
        <AccordionSummaryWithLeftIcon>
          <Typography>{t('contacts')}</Typography>
        </AccordionSummaryWithLeftIcon>
        <AccordionDetails sx={styles.flexColumn}>
          {times(contacts.length, (index) => (
            <Box key={index} sx={styles.flexRow}>
              <ContactRow index={index} />

              <IconButton
                onClick={() => remove(index)}
                sx={styles.iconButton}
                disabled={index === 0}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}

          <AddButton
            rounded={true}
            onClick={() =>
              append({ name: '', email: '', phoneNumber: '', address: '' })
            }
          >
            {t('add-contact')}
          </AddButton>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummaryWithLeftIcon>
          <Typography>{t('additional-information')}</Typography>
        </AccordionSummaryWithLeftIcon>
        <AccordionDetails>
          <Controller
            name="additionalInformation"
            control={form.control}
            render={({ field, fieldState: { error, invalid } }) => (
              <TextField
                label={t('additional-information')}
                multiline
                rows={5}
                {...field}
                error={invalid}
                helperText={error?.message}
                sx={styles.input}
              />
            )}
          />
        </AccordionDetails>
      </Accordion>
    </>
  );
}
