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
import {
  adCreationSchema,
  AdCreationSchema,
  toCreateSearchAdDto,
} from '../../validation-schemas/ad-creation-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { AccordionSummaryWithLeftIcon } from '../../components/accordion-summary-with-left-icon';
import { makeStyles } from '../../libs/make-styles';
import { LoadingButton } from '../../components/loading-button';
import { AddButton } from '../../components/add-button';
import { useAsyncAction } from '../../hooks/use-async-action';
import { adService } from '../../services/search-ad-service';
import { useNavigate } from 'react-router-dom';
import { ErrorContainer } from '../../components/error-container';
import DeleteIcon from '@mui/icons-material/Delete';
import { ContactRow } from '../../components/contact-row';

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
  button: {
    width: 'min-content',
    alignSelf: 'center',
  },
  contactDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
  },
  contactRow: {
    display: 'flex',
    gap: 1,
  },
  icon: {
    '&.MuiSvgIcon-root': {
      color: (theme) => theme.palette.primary.main,
    },
  },
});

export function SearchAdCreation() {
  const navigate = useNavigate();

  const form = useForm<AdCreationSchema>({
    defaultValues: {
      description: '',
      additionalInformation: '',
      contacts: [
        {
          name: '',
          email: '',
          phoneNumber: '',
          address: '',
        },
      ],
    },
    resolver: zodResolver(adCreationSchema),
  });

  const { append, remove } = useFieldArray({
    control: form.control,
    name: 'contacts',
  });
  const contacts = form.watch('contacts');

  const { trigger, loading, error } = useAsyncAction(
    async ({ signal }, ad: AdCreationSchema) => {
      await adService.createAd(toCreateSearchAdDto(ad), signal);

      navigate('/');
    }
  );

  const onSubmit = form.handleSubmit(trigger);

  return (
    <FormProvider {...form}>
      <Typography variant="h3" sx={styles.header}>
        What kind of services do you offer?
      </Typography>

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

        <Accordion defaultExpanded>
          <AccordionSummaryWithLeftIcon>
            <Typography>Contacts</Typography>
          </AccordionSummaryWithLeftIcon>
          <AccordionDetails sx={styles.contactDetails}>
            {contacts.map((c, index) => (
              <Box key={`${c.name}-${c.email}-${index}`} sx={styles.contactRow}>
                <ContactRow index={index} />
                {index !== 0 && (
                  <IconButton onClick={() => remove(index)}>
                    <DeleteIcon sx={styles.icon} />
                  </IconButton>
                )}
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
