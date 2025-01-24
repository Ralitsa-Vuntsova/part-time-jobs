import { Controller, useFormContext } from 'react-hook-form';
import { JobOfferCreationSchema } from '../../validation-schemas/job-offer-creation-schema';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { Currency, Payment } from '@shared/enums';
import { makeStyles } from '../../libs/make-styles';
import { useTranslation } from 'react-i18next';

const styles = makeStyles({
  typography: {
    '& .MuiTypography-root': {
      width: 'max-content',
    },
  },
});

export function PriceControls() {
  const { t } = useTranslation();

  const { control, watch } = useFormContext<JobOfferCreationSchema>();
  const [byNegotiation, notSure] = watch([
    'price.byNegotiation',
    'personNumber.notSure',
  ]);

  return (
    <>
      <Controller
        name="price.value"
        control={control}
        render={({ field, fieldState: { error, invalid } }) => (
          <TextField
            label={`${t('price')}*`}
            type="number"
            {...field}
            onChange={(e) => field.onChange(Number(e.target.value))}
            error={invalid}
            helperText={error?.message}
            disabled={byNegotiation}
          />
        )}
      />

      <Controller
        name="price.currency"
        control={control}
        render={({ field, fieldState: { error, invalid } }) => (
          <FormControl fullWidth>
            <InputLabel>{`${t('currency')}*`}</InputLabel>
            <Select
              label={t('currency')}
              error={invalid}
              disabled={byNegotiation}
              {...field}
            >
              {Object.values(Currency).map((value) => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
            {!!error && <FormHelperText error>{error.message}</FormHelperText>}
          </FormControl>
        )}
      />

      <Controller
        name="price.payment"
        control={control}
        render={({ field, fieldState: { error, invalid } }) => (
          <FormControl fullWidth>
            <InputLabel>{`${t('payment')}*`}</InputLabel>
            <Select
              label={t('payment')}
              error={invalid}
              disabled={byNegotiation || notSure}
              {...field}
            >
              {Object.values(Payment).map((value) => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
            {!!error && <FormHelperText error>{error.message}</FormHelperText>}
          </FormControl>
        )}
      />

      <Controller
        name="price.byNegotiation"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={<Checkbox checked={field.value} />}
            label={t('by-negotiation')}
            {...field}
            sx={styles.typography}
          />
        )}
      />
    </>
  );
}
