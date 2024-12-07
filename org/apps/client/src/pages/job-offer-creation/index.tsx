import {
  Accordion,
  AccordionDetails,
  Box,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AccordionSummaryWithLeftIcon } from '../../components/accordion-summary-with-left-icon';
import { makeStyles } from '../../libs/make-styles';
import { LoadingButton } from '../../components/loading-button';
import { AddButton } from '../../components/add-button';
import { useAsyncAction } from '../../hooks/use-async-action';
import { useNavigate } from 'react-router-dom';
import { ErrorContainer } from '../../components/error-container';
import DeleteIcon from '@mui/icons-material/Delete';
import { ContactRow } from '../../components/contact-row';
import {
  defaultValues,
  jobOfferCreationSchema,
  JobOfferCreationSchema,
  toCreateJobOfferDto,
} from '../../validation-schemas/job-offer-creation-schema';
import { times } from 'lodash';
import { jobOfferService } from '../../services/job-offer-service';
import { OfferInformationAccordion } from './offer-information-accordion';
import { useCurrentUser } from '../../hooks/use-current-user';

const styles = makeStyles({
  header: {
    paddingBottom: 2,
    textAlign: 'center',
    color: (theme) => theme.palette.primary.main,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  },
  input: {
    width: '100%',
  },
  smallInput: {
    width: ['100%', '25%'],
  },
  button: {
    width: 'min-content',
    alignSelf: 'center',
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

export function JobOfferCreation() {
  const navigate = useNavigate();
  const currentUser = useCurrentUser();

  const form = useForm<JobOfferCreationSchema>({
    defaultValues: defaultValues(currentUser),
    resolver: zodResolver(jobOfferCreationSchema),
  });

  const { append, remove } = useFieldArray({
    control: form.control,
    name: 'contacts',
  });
  const contacts = form.watch('contacts');

  const { trigger, loading, error } = useAsyncAction(
    async ({ signal }, ad: JobOfferCreationSchema) => {
      await jobOfferService.createAd(toCreateJobOfferDto(ad), signal);

      navigate('/');
    }
  );

  const onSubmit = form.handleSubmit(trigger);

  return (
    <FormProvider {...form}>
      <Typography variant="h3" sx={styles.header}>
        What kind of work do you offer?
      </Typography>

      <Box component="form" onSubmit={onSubmit} sx={styles.content}>
        <Accordion defaultExpanded>
          <AccordionSummaryWithLeftIcon>
            <Typography>Description</Typography>
          </AccordionSummaryWithLeftIcon>
          <AccordionDetails sx={styles.flexColumn}>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState: { error, invalid } }) => (
                <TextField
                  label="Name*"
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
                  label="Description*"
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
            <Typography>Contacts</Typography>
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
              Add Contact
            </AddButton>
          </AccordionDetails>
        </Accordion>

        <Accordion defaultExpanded>
          <AccordionSummaryWithLeftIcon>
            <Typography>Additional Information</Typography>
          </AccordionSummaryWithLeftIcon>
          <AccordionDetails>
            <Controller
              name="additionalInformation"
              control={form.control}
              render={({ field, fieldState: { error, invalid } }) => (
                <TextField
                  label="Additional Information"
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

          {error ? <ErrorContainer>{error}</ErrorContainer> : null}
        </Accordion>

        <LoadingButton
          type="submit"
          variant="contained"
          loading={loading}
          sx={styles.button}
        >
          Save
        </LoadingButton>
      </Box>
    </FormProvider>
  );
}
