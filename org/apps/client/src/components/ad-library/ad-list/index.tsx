import { JobOfferDto, ServiceOfferDto } from '@shared/data-objects';
import { AdCard } from './card';
import { Box, Pagination } from '@mui/material';
import { makeStyles } from '../../../libs/make-styles';
import { useState } from 'react';
import { AdType } from '../../../libs/ad-type';

const PAGE_SIZE = 12;

const styles = makeStyles({
  grid: {
    display: 'grid',
    gridTemplateColumns: ['auto', 'repeat(2,1fr)', 'repeat(4,1fr)'],
    justifyItems: 'center',
    gap: 4,
    padding: [0, 5],
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    width: '90%',
    padding: [0, 5],
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 1,
  },
});

export interface Props {
  jobs: JobOfferDto[];
  services: ServiceOfferDto[];
  isGrid: boolean;
  type: AdType;
}

// TODO: Consider adding user preferences
export function AdList({ jobs, services, isGrid, type }: Props) {
  const [page, setPage] = useState(0);

  const data = type === AdType.Job ? jobs : services;
  const displayedData = data.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <Box sx={styles.flexColumn}>
      <Box sx={isGrid ? styles.grid : styles.list}>
        {displayedData.map((service) => (
          <AdCard
            key={service._id}
            data={service}
            isGrid={isGrid}
            type={type}
          />
        ))}
      </Box>

      {/* TODO: Consider supporting server-side pagination */}
      <Pagination
        page={page + 1}
        onChange={(_, newPage) => setPage(newPage - 1)}
        count={Math.ceil(data.length / PAGE_SIZE)}
      />
    </Box>
  );
}
