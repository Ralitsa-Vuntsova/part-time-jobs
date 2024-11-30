import {
  Accordion,
  AccordionDetails,
  Box,
  IconButton,
  InputLabel,
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
  OfferAdCreationSchema,
  offerAdCreationSchema,
  toCreateOfferAdDto,
} from '../../validation-schemas/offer-ad-creation-schema';
import { offerAdService } from '../../services/offer-ad-service';
import { times } from 'lodash';
import { DateTime } from './date-time';
import { LabeledControl } from '../../components/labeled-control';
import dayjs from 'dayjs';

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
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
  },
  flexRow: {
    display: 'flex',
    gap: 2,
  },
  icon: {
    '&.MuiSvgIcon-root': {
      color: (theme) => theme.palette.primary.main,
    },
  },
});

export function OfferAdCreation() {
  const navigate = useNavigate();

  const form = useForm<OfferAdCreationSchema>({
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
      dateTime: [],
      location: '',
      personNumber: 0,
      qualification: '',
      duration: '',
      urgency: '',
      difficulty: '',
    },
    resolver: zodResolver(offerAdCreationSchema),
  });

  const { append, remove } = useFieldArray({
    control: form.control,
    name: 'contacts',
  });
  const contacts = form.watch('contacts');

  const { trigger, loading, error } = useAsyncAction(
    async ({ signal }, ad: OfferAdCreationSchema) => {
      await offerAdService.createAd(toCreateOfferAdDto(ad), signal);

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
              control={form.control}
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

            <Box sx={styles.flexRow}>
              <Controller
                name="personNumber"
                control={form.control}
                render={({ field, fieldState: { error, invalid } }) => (
                  <LabeledControl
                    label="How many people are needed for the service to be performed?"
                    sx={{ width: '50%' }}
                  >
                    <TextField
                      label="Number of people*"
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      error={invalid}
                      helperText={error?.message}
                      sx={{ width: '50%' }}
                    />
                  </LabeledControl>
                )}
              />

              <Controller
                name="qualification"
                control={form.control}
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
              control={form.control}
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

            <Box sx={styles.flexRow}>
              <Controller
                name="urgency"
                control={form.control}
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
                control={form.control}
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

        <Accordion defaultExpanded>
          <AccordionSummaryWithLeftIcon>
            <Typography>Contacts</Typography>
          </AccordionSummaryWithLeftIcon>
          <AccordionDetails sx={styles.flexColumn}>
            {contacts.map((c, index) => (
              <Box key={`${c.name}-${c.email}-${index}`} sx={styles.flexRow}>
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
