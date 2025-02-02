import { Box, Pagination } from '@mui/material';
import {
  ApplicationDto,
  ApplicationResponseDto,
  JobOfferDto,
  UserProfile,
} from '@shared/data-objects';
import { makeStyles } from '../../../libs/make-styles';
import { useState } from 'react';
import { ApplicationCard } from './card';

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
  users: UserProfile[];
  ads: JobOfferDto[];
  applicationResponses: ApplicationResponseDto[];
  onChange: () => void;
}

export function ApplicationList({
  applications,
  users,
  ads,
  applicationResponses,
  onChange,
}: Props) {
  const [page, setPage] = useState(0);

  const displayedData = applications.slice(
    page * PAGE_SIZE,
    (page + 1) * PAGE_SIZE
  );

  return (
    <Box sx={styles.flexColumn}>
      <Box sx={styles.list}>
        {displayedData.map((application) => (
          <ApplicationCard
            key={application._id}
            application={application}
            user={users.find(({ _id }) => _id === application.createdBy)}
            ad={ads.find(({ _id }) => _id === application.adId)}
            applicationResponse={applicationResponses.find(
              ({ applicationId }) => applicationId === application._id
            )}
            onChange={onChange}
          />
        ))}
      </Box>

      {/* TODO p[future]: Consider supporting server-side pagination */}
      <Pagination
        page={page + 1}
        onChange={(_, newPage) => setPage(newPage - 1)}
        count={Math.ceil(applications.length / PAGE_SIZE)}
        sx={styles.pagination}
      />
    </Box>
  );
}
