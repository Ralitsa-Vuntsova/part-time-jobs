import { JobOfferDto, ServiceOfferDto } from '@shared/data-objects';
import { AdCard } from './card';
import { Box, Pagination, Typography } from '@mui/material';
import { makeStyles } from '../../../libs/make-styles';
import { useEffect, useState } from 'react';
import {
  AdType,
  updateFilters,
  updateUrl,
} from '../../../libs/ad-helper-functions';
import { filterAds, Filters } from '../../../libs/ad-helper-functions';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  getDisplayedData,
  getPageElementsCount,
} from '../../../libs/pagination-helper-functions';
import { AdListFilters } from './filters';

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
});

export interface Props {
  jobs: JobOfferDto[];
  services: ServiceOfferDto[];
  isGrid: boolean;
  type: AdType;
  label?: string;
  isAccomplishment?: boolean;
  showArchived?: boolean;
}

export function AdList({
  jobs,
  services,
  isGrid,
  type,
  label,
  isAccomplishment = false,
  showArchived = false,
}: Props) {
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

  // TODO [future]: Fix ad types across the app
  // Filters will be applied only to jobs
  const data = type === AdType.Job ? filterAds(jobs, filters) : services;
  const displayedData = getDisplayedData(data, page, PAGE_SIZE);

  // Update filters when URL changes
  useEffect(() => {
    setFilters(updateFilters(searchParams));
  }, [searchParams]);

  // Update URL when filters change
  useEffect(() => {
    setSearchParams(updateUrl(filters));
  }, [filters]);

  return (
    <Box sx={rootStyles}>
      {type === AdType.Job && (
        <AdListFilters
          filters={filters}
          onFiltersChange={(filters) => setFilters(filters)}
          showArchived={showArchived}
        />
      )}

      {label && <Typography>{t(label)}</Typography>}

      <Box sx={centeredFlexColumnStyles}>
        <Box sx={isGrid ? styles.grid : styles.list}>
          {displayedData.map((ad) => (
            <AdCard
              key={ad._id}
              ad={ad}
              isGrid={isGrid}
              type={type}
              isAccomplishment={isAccomplishment}
            />
          ))}
        </Box>

        {/* TODO [future]: Support server-side pagination */}
        <Pagination
          page={page + 1}
          onChange={(_, newPage) => setPage(newPage - 1)}
          count={getPageElementsCount(data, PAGE_SIZE)}
        />
      </Box>
    </Box>
  );
}
