import {
  Autocomplete,
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  TextField,
  Typography,
} from '@mui/material';
import { Filters } from '../../../libs/ad-helper-functions';
import { makeStyles } from '../../../libs/make-styles';
import { useTranslation } from 'react-i18next';
import { Currency } from '@shared/enums';
import { toCurrency } from '../../../libs/to-currency';

const styles = makeStyles({
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
  },
  flexRow: {
    display: 'flex',
    flexDirection: ['column', 'row'],
    gap: 1,
  },
  input: {
    '.MuiInput-root': {
      height: 'auto',
    },
  },
});

interface Props {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  showArchived?: boolean;
}

export function AdListFilters({
  filters,
  onFiltersChange,
  showArchived,
}: Props) {
  const { t } = useTranslation();

  const spacedBetweenFlexRowStyles = {
    ...styles.flexRow,
    justifyContent: 'space-between',
  };

  return (
    <Box sx={styles.flexColumn}>
      <Typography variant="h5">{t('filters')}</Typography>

      <Box sx={spacedBetweenFlexRowStyles}>
        <Box sx={styles.flexRow}>
          <TextField
            label={t('location')}
            variant="standard"
            value={filters.location}
            sx={styles.input}
            onChange={(e) =>
              onFiltersChange({ ...filters, location: String(e.target.value) })
            }
          />

          <TextField
            label={t('number-people')}
            type="number"
            variant="standard"
            value={filters.personNumber}
            sx={styles.input}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                personNumber: Number(e.target.value),
              })
            }
          />

          <TextField
            label={t('qualification')}
            variant="standard"
            value={filters.qualification}
            sx={styles.input}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                qualification: String(e.target.value),
              })
            }
          />
        </Box>

        <Box sx={styles.flexRow}>
          <FormControl sx={{ width: '100px' }}>
            <Autocomplete
              options={Object.values(Currency)}
              onChange={(_, selected) =>
                onFiltersChange({
                  ...filters,
                  priceCurrency: toCurrency(selected),
                })
              }
              value={filters.priceCurrency}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t('currency')}
                  variant="standard"
                />
              )}
              sx={styles.input}
            />
          </FormControl>

          <TextField
            label={t('price-from')}
            type="number"
            variant="standard"
            value={filters.priceFrom}
            sx={styles.input}
            onChange={(e) =>
              onFiltersChange({ ...filters, priceFrom: Number(e.target.value) })
            }
          />

          <TextField
            label={t('price-to')}
            type="number"
            variant="standard"
            value={filters.priceTo}
            sx={styles.input}
            onChange={(e) =>
              onFiltersChange({ ...filters, priceTo: Number(e.target.value) })
            }
          />
        </Box>
      </Box>

      {showArchived && (
        <FormControlLabel
          control={
            <Checkbox
              checked={filters.showArchived}
              onChange={(e) =>
                onFiltersChange({
                  ...filters,
                  showArchived: Boolean(e.target.checked),
                })
              }
            />
          }
          label={t('show-archived')}
        />
      )}
    </Box>
  );
}
