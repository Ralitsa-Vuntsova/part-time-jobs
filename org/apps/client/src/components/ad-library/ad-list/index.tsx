import { JobOfferDto, ServiceOfferDto } from '@shared/data-objects';
import { AdCard } from './card';
import {
  Autocomplete,
  Box,
  FormControl,
  Pagination,
  TextField,
  Typography,
} from '@mui/material';
import { makeStyles } from '../../../libs/make-styles';
import { useEffect, useMemo, useState } from 'react';
import {
  AdType,
  updateFilters,
  updateUrl,
} from '../../../libs/ad-helper-functions';
import { Currency } from '@shared/enums';
import { filterAds, Filters } from '../../../libs/ad-helper-functions';
import { useSearchParams } from 'react-router-dom';
import { toCurrency } from '../../../libs/to-currency';
import { useTranslation } from 'react-i18next';

const PAGE_SIZE = 12;

const styles = makeStyles({
  grid: {
    display: 'grid',
    gridTemplateColumns: ['auto', 'repeat(2,1fr)', 'repeat(4,1fr)'],
    justifyItems: 'center',
    gap: 4,
    padding: [0, 3],
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    padding: [0, 3],
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
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

export interface Props {
  jobs: JobOfferDto[];
  services: ServiceOfferDto[];
  isGrid: boolean;
  type: AdType;
  label?: string;
}

export function AdList({ jobs, services, isGrid, type, label }: Props) {
  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState<Filters>({});

  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();

  const rootStyles = { ...styles.flexColumn, gap: 2 };
  const centeredFlexColumnStyles = {
    ...styles.flexColumn,
    gap: 1,
    alignItems: 'center',
  };
  const spacedBetweenFlexRowStyles = {
    ...styles.flexRow,
    justifyContent: 'space-between',
  };

  // TODO [future]: Fix types
  const data = useMemo(() => {
    return type === AdType.Job ? filterAds(jobs, filters) : services;
  }, [filters, type]);

  const displayedData = data.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  // Update filters when URL changes
  useEffect(() => {
    setFilters(updateFilters(searchParams));
  }, [searchParams]);

  // Update URL when filters change
  useEffect(() => {
    setSearchParams(updateUrl(filters));
  }, [filters, setSearchParams]);

  return (
    <Box sx={rootStyles}>
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
                setFilters({ ...filters, location: String(e.target.value) })
              }
            />

            <TextField
              label={t('number-people')}
              type="number"
              variant="standard"
              value={filters.personNumber}
              sx={styles.input}
              onChange={(e) =>
                setFilters({ ...filters, personNumber: Number(e.target.value) })
              }
            />

            <TextField
              label={t('qualification')}
              variant="standard"
              value={filters.qualification}
              sx={styles.input}
              onChange={(e) =>
                setFilters({
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
                  setFilters({
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
                setFilters({ ...filters, priceFrom: Number(e.target.value) })
              }
            />

            <TextField
              label={t('price-to')}
              type="number"
              variant="standard"
              value={filters.priceTo}
              sx={styles.input}
              onChange={(e) =>
                setFilters({ ...filters, priceTo: Number(e.target.value) })
              }
            />
          </Box>
        </Box>
      </Box>

      {label && <Typography>{t(label)}</Typography>}

      <Box sx={centeredFlexColumnStyles}>
        <Box sx={isGrid ? styles.grid : styles.list}>
          {displayedData.map((ad) => (
            <AdCard key={ad._id} ad={ad} isGrid={isGrid} type={type} />
          ))}
        </Box>

        {/* TODO [future]: Consider supporting server-side pagination */}
        <Pagination
          page={page + 1}
          onChange={(_, newPage) => setPage(newPage - 1)}
          count={Math.ceil(data.length / PAGE_SIZE)}
        />
      </Box>
    </Box>
  );
}
