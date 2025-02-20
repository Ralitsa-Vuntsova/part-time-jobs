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
import { LoadingButton } from '../../loading-button';
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
import { ErrorContainer } from '../../error-container';
import { LabeledControl } from '../../labeled-control';
import { JobOfferDto } from '@shared/data-objects';
import { times } from 'lodash';
import { useTranslation } from 'react-i18next';
import { notificationService } from '../../../services/notification-service';
import { toNotificationForApplying } from '../../../libs/notification-helper-functions';
import { useUserById } from '../../../hooks/use-user-by-id';

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
  userId: string;
}

export function ApplyDialog({ open, onClose, ad, onChange, userId }: Props) {
  const { t } = useTranslation();

  const user = useUserById(userId); // the current user

  const form = useForm<ApplicationSchema>({
    defaultValues: {
      reason: '',
      dateTime: '',
      additionalInformation: '',
      personNumber: 0,
    },
    resolver: zodResolver(applicationSchema),
  });

  const {
    perform: performApplying,
    loading: loadingApplying,
    error: errorApplying,
  } = useAsyncAction(async ({ signal }, app: ApplicationSchema) => {
    await applicationService.apply(toCreateApplicationDto(ad._id, app), signal);
  });

  const { trigger, loading, error } = useAsyncAction(
    async ({ signal }, app: ApplicationSchema) => {
      await performApplying(app);

      await notificationService.create(
        toNotificationForApplying(ad, user, ad.createdBy),
        signal
      );

      onChange();

      form.reset();
      onClose();
    }
  );

  const onSubmit = form.handleSubmit(trigger);

  const notSure = ad.personNumber.notSure;

  const personNumberOptions = times(ad.personNumber.value);
  personNumberOptions.shift();
  personNumberOptions.push(ad.personNumber.value);

  return (
    <FormProvider {...form}>
      <Dialog
        open={open}
        maxWidth="lg"
        onClose={onClose}
        onSubmit={onSubmit}
        component="form"
      >
        <DialogTitle sx={styles.title}>{t('ad-application')}</DialogTitle>

        <DialogContent sx={styles.flexColumn}>
          <Controller
            name="reason"
            control={form.control}
            render={({ field, fieldState: { error, invalid } }) => (
              <LabeledControl
                label={t('reason')}
                detailedLabel={t('apply-question')}
                sx={styles.input}
              >
                <TextField
                  label={`${t('reason')}*`}
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
                label={t('date-and-time')}
                detailedLabel={t('apply-datetime-question')}
                sx={styles.input}
              >
                <TextField
                  label={`${t('datetime')}*`}
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
              <LabeledControl
                label={t('additional-information')}
                sx={styles.input}
              >
                <TextField
                  label={t('additional-information')}
                  multiline
                  rows={5}
                  {...field}
                  sx={styles.input}
                />
              </LabeledControl>
            )}
          />

          {notSure ? (
            <Controller
              name="personNumber"
              control={form.control}
              render={({ field, fieldState: { error, invalid } }) => (
                <LabeledControl
                  label={t('number-people')}
                  detailedLabel={t('apply-people-question')}
                  sx={styles.input}
                >
                  <TextField
                    label={`${t('number-people')}*`}
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    error={invalid}
                    helperText={error?.message}
                  />
                </LabeledControl>
              )}
            />
          ) : (
            <Controller
              name="personNumber"
              control={form.control}
              render={({ field, fieldState: { error, invalid } }) => (
                <LabeledControl
                  label={t('number-people')}
                  detailedLabel={t('apply-people-question')}
                  sx={styles.input}
                >
                  <FormControl fullWidth>
                    <InputLabel>{t('number-people')}*</InputLabel>
                    <Select
                      label={`${t('number-people')}*`}
                      error={invalid}
                      {...field}
                      value={field.value ?? 1}
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
          )}
        </DialogContent>

        <DialogActions sx={styles.flexRow}>
          <Button
            variant="outlined"
            onClick={() => {
              form.reset();
              onClose();
            }}
          >
            {t('cancel')}
          </Button>

          <LoadingButton
            type="submit"
            variant="contained"
            loading={loadingApplying || loading}
            sx={styles.button}
          >
            {t('apply')}
          </LoadingButton>
        </DialogActions>

        {errorApplying ? (
          <ErrorContainer>{errorApplying}</ErrorContainer>
        ) : null}
        {error ? <ErrorContainer>{error}</ErrorContainer> : null}
      </Dialog>
    </FormProvider>
  );
}
