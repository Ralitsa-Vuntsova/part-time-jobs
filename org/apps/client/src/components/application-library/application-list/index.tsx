import { Box, Pagination } from '@mui/material';
import {
  ApplicationDto,
  ApplicationResponseDto,
  JobOfferDto,
} from '@shared/data-objects';
import { makeStyles } from '../../../libs/make-styles';
import { useState } from 'react';
import { ApplicationCard } from './card';
import {
  getDisplayedData,
  getPageElementsCount,
} from '../../../libs/pagination-helper-functions';

const PAGE_SIZE = 6;

const styles = makeStyles({
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    padding: [0, 3],
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
  },
  pagination: {
    alignSelf: 'center',
  },
});

interface Props {
  applications: ApplicationDto[];
  ads: JobOfferDto[];
  applicationResponses: ApplicationResponseDto[];
  onChange: () => void;
}

export function ApplicationList({
  applications,
  ads,
  applicationResponses,
  onChange,
}: Props) {
  const [page, setPage] = useState(0);

  const displayedData = getDisplayedData(applications, page, PAGE_SIZE);

  return (
    <Box sx={styles.flexColumn}>
      <Box sx={styles.list}>
        {displayedData.map((application) => (
          <ApplicationCard
            key={application._id}
            application={application}
            ad={ads.find(({ _id }) => _id === application.adId)}
            applications={applications}
            applicationResponses={applicationResponses}
            onChange={onChange}
          />
        ))}
      </Box>

      {/* TODO [future]: Support server-side pagination */}
      <Pagination
        page={page + 1}
        onChange={(_, newPage) => setPage(newPage - 1)}
        count={getPageElementsCount(applications, PAGE_SIZE)}
        sx={styles.pagination}
      />
    </Box>
  );
}
