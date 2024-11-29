import {
  Accordion,
  AccordionDetails,
  Box,
  TextField,
  Typography,
} from '@mui/material';
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import {
  adCreationSchema,
  AdCreationSchema,
  toCreateAdDto,
} from '../../validation-schemas/ad-creation-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { AccordionSummaryWithLeftIcon } from '../../components/accordion-summary-with-left-icon';
import { makeStyles } from '../../libs/make-styles';
import { LoadingButton } from '../../components/loading-button';
import { AddButton } from '../../components/add-button';
import { ContactRow } from './contact-row';
import { useAsyncAction } from '../../hooks/use-async-action';
import { adService } from '../../services/ad-service';
import { useNavigate } from 'react-router-dom';
import { ErrorContainer } from '../../components/error-container';

const styles = makeStyles({
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  },
  input: {
    width: '100%',
  },
  button: {
    width: 'min-content',
    alignSelf: 'center',
  },
  contactDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
  },
});

export function SearchAdCreation() {
  const navigate = useNavigate();

  const form = useForm<AdCreationSchema>({
    defaultValues: {
      description: '',
      additionalInformation: '',
      contacts: [],
    },
    resolver: zodResolver(adCreationSchema),
  });

  const { append } = useFieldArray({ control: form.control, name: 'contacts' });
  const contacts = form.watch('contacts');

  const { trigger, loading, error } = useAsyncAction(
    async ({ signal }, ad: AdCreationSchema) => {
      await adService.createAd(toCreateAdDto(ad), signal);

      navigate('/');
    }
  );

  const onSubmit = form.handleSubmit(trigger);

  return (
    <FormProvider {...form}>
      <Box component="form" onSubmit={onSubmit} sx={styles.content}>
        <Accordion defaultExpanded>
          <AccordionSummaryWithLeftIcon>
            <Typography>Description</Typography>
          </AccordionSummaryWithLeftIcon>
          <AccordionDetails>
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState: { error, invalid } }) => (
                <TextField
                  label="Description"
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

        <Accordion defaultExpanded>
          <AccordionSummaryWithLeftIcon>
            <Typography>Contacts</Typography>
          </AccordionSummaryWithLeftIcon>
          <AccordionDetails sx={styles.contactDetails}>
            {contacts.map((c, index) => (
              <ContactRow key={`${c.name}-${c.email}-${index}`} index={index} />
            ))}

            <AddButton
              rounded={true}
              onClick={() =>
                append({ name: '', email: '', phoneNumber: '', location: '' })
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
