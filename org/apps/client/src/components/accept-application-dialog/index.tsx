import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { LoadingButton } from '../loading-button';
import { Controller, useFormContext } from 'react-hook-form';
import { LabeledControl } from '../labeled-control';
import { ApplicationResponseSchema } from '../../validation-schemas/application-response-schema';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '../../libs/make-styles';
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
  onSubmit: () => unknown;
  loading: boolean;
  onClose: () => unknown;
  personNumber: number;
}

export function AcceptApplicationDialog({
  open,
  onSubmit,
  loading,
  onClose,
  personNumber,
}: Props) {
  const { control, reset } = useFormContext<ApplicationResponseSchema>();

  const { t } = useTranslation();

  const personNumberOptions = times(personNumber);
  personNumberOptions.shift();
  personNumberOptions.push(personNumber);

  return (
    <Dialog
      open={open}
      maxWidth="lg"
      onClose={onClose}
      onSubmit={onSubmit}
      component="form"
    >
      <DialogTitle sx={styles.title}>{t('accept-application')}</DialogTitle>

      <DialogContent sx={styles.flexColumn}>
        <Controller
          name="personNumber"
          control={control}
          render={({ field }) => (
            <LabeledControl
              label={t('number-people')}
              detailedLabel={t('accept-application-question')}
              sx={styles.input}
            >
              <FormControl fullWidth>
                <InputLabel>{t('number-people')}</InputLabel>
                <Select
                  label={t('number-people')}
                  {...field}
                  value={field.value ?? ''}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                >
                  {personNumberOptions.map((value) => (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </LabeledControl>
          )}
        />
      </DialogContent>

      <DialogActions sx={styles.flexRow}>
        <Button
          variant="outlined"
          onClick={() => {
            reset();
            onClose();
          }}
        >
          {t('cancel')}
        </Button>

        <LoadingButton
          type="submit"
          variant="contained"
          loading={loading}
          sx={styles.button}
          onClick={() => onSubmit()}
        >
          {t('accept')}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
