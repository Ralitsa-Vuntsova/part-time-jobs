import { Box, Pagination } from '@mui/material';
import {
  JobOfferDto,
  PersonalRatingDto,
  UserProfile,
} from '@shared/data-objects';
import { makeStyles } from '../../../libs/make-styles';
import { useState } from 'react';
import { RatingCard } from './card';
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
  ratings: PersonalRatingDto[];
  users: UserProfile[];
  ads: JobOfferDto[];
}

export function RatingList({ ratings, users, ads }: Props) {
  const [page, setPage] = useState(0);

  // TODO: Extract pagination functions in a common place
  const displayedData = getDisplayedData(ratings, page, PAGE_SIZE);

  return (
    <Box sx={styles.flexColumn}>
      <Box sx={styles.list}>
        {displayedData.map((rating) => (
          <RatingCard
            key={rating._id}
            rating={rating}
            users={users}
            ad={ads.find(({ _id }) => _id === rating.adId)}
          />
        ))}
      </Box>

      {/* TODO [future]: Support server-side pagination */}
      <Pagination
        page={page + 1}
        onChange={(_, newPage) => setPage(newPage - 1)}
        count={getPageElementsCount(ratings, PAGE_SIZE)}
        sx={styles.pagination}
      />
    </Box>
  );
}
