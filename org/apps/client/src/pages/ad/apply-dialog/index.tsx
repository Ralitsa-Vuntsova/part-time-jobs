import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { LoadingButton } from '../../../components/loading-button';
import { makeStyles } from '../../../libs/make-styles';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import {
  ApplicationSchema,
  applicationSchema,
  toCreateApplicationDto,
} from '../../../validation-schemas/application-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAsyncAction } from '../../../hooks/use-async-action';
import { applicationService } from '../../../services/application-service';
import { ErrorContainer } from '../../../components/error-container';
import { LabeledControl } from '../../../components/labeled-control';
import { JobOfferDto } from '@shared/data-objects';
import { times } from 'lodash';

const styles = makeStyles({
  title: {
    color: (theme) => theme.palette.primary.main,
  },
  button: {
    width: 'min-content',
    alignSelf: 'center',
  },
  flexRow: {
    display: 'flex',
    gap: 2,
    justifyContent: 'center',
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  input: {
    width: ['100%', '600px'],
  },
});

interface Props {
  open: boolean;
  onClose: () => void;
  ad: JobOfferDto;
  onChange: () => void;
}

export function ApplyDialog({ open, onClose, ad, onChange }: Props) {
  const form = useForm<ApplicationSchema>({
    defaultValues: {
      reason: '',
      dateTime: '',
      additionalInformation: '',
      personNumber: 0,
    },
    resolver: zodResolver(applicationSchema),
  });

  const { trigger, loading, error } = useAsyncAction(
    async ({ signal }, app: ApplicationSchema) => {
      await applicationService.apply(
        toCreateApplicationDto(ad._id, app),
        signal
      );

      onChange();

      form.reset();
      onClose();
    }
  );

  const onSubmit = form.handleSubmit(trigger);

  const personNumberOptions = times(ad.personNumber);
  personNumberOptions.shift();
  personNumberOptions.push(ad.personNumber);

  return (
    <FormProvider {...form}>
      <Dialog
        open={open}
        maxWidth="lg"
        onClose={onClose}
        onSubmit={onSubmit}
        component="form"
      >
        <DialogTitle sx={styles.title}>Apply for Ad</DialogTitle>

        <DialogContent sx={styles.flexColumn}>
          <Controller
            name="reason"
            control={form.control}
            render={({ field, fieldState: { error, invalid } }) => (
              <LabeledControl
                label="Reason"
                detailedLabel="What is your reason for applying?"
                sx={styles.input}
              >
                <TextField
                  label="Reason*"
                  multiline
                  rows={5}
                  {...field}
                  error={invalid}
                  helperText={error?.message}
                  sx={styles.input}
                />
              </LabeledControl>
            )}
          />

          <Controller
            name="dateTime"
            control={form.control}
            render={({ field, fieldState: { error, invalid } }) => (
              <LabeledControl
                label="Date and time"
                detailedLabel="When would you be available to perform the service?"
                sx={styles.input}
              >
                <TextField
                  label="Datetime*"
                  multiline
                  rows={5}
                  {...field}
                  error={invalid}
                  helperText={error?.message}
                  sx={styles.input}
                />
              </LabeledControl>
            )}
          />

          <Controller
            name="additionalInformation"
            control={form.control}
            render={({ field }) => (
              <LabeledControl label="Additional Information" sx={styles.input}>
                <TextField
                  label="Additional Information"
                  multiline
                  rows={5}
                  {...field}
                  sx={styles.input}
                />
              </LabeledControl>
            )}
          />

          <Controller
            name="personNumber"
            control={form.control}
            render={({ field, fieldState: { error, invalid } }) => (
              <LabeledControl
                label="Number of People"
                detailedLabel="How many people are available to perform the service?"
                sx={styles.input}
              >
                <FormControl fullWidth>
                  <InputLabel>Number of People*</InputLabel>
                  <Select
                    label="Number of People*"
                    error={invalid}
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  >
                    {personNumberOptions.map((value) => (
                      <MenuItem key={value} value={value}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                  {!!error && (
                    <FormHelperText error>{error.message}</FormHelperText>
                  )}
                </FormControl>
              </LabeledControl>
            )}
          />
        </DialogContent>

        <DialogActions sx={styles.flexRow}>
          <Button
            variant="outlined"
            onClick={() => {
              form.reset();
              onClose();
            }}
          >
            Cancel
          </Button>

          <LoadingButton
            type="submit"
            variant="contained"
            loading={loading}
            sx={styles.button}
          >
            Apply
          </LoadingButton>
        </DialogActions>

        {error ? <ErrorContainer>{error}</ErrorContainer> : null}
      </Dialog>
    </FormProvider>
  );
}
