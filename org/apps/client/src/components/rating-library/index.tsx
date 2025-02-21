import { JobOfferDto, PersonalRatingDto } from '@shared/data-objects';
import { useState } from 'react';
import { Box, InputAdornment, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '../../libs/make-styles';
import { NoRatings } from './no-ratings';
import { filterRatingsByTerm } from '../../libs/rating-helper-functions';
import { RatingList } from './rating-list';
import { useUsers } from '../../hooks/use-users';

const styles = makeStyles({
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  },
  textField: {
    alignSelf: 'start',
  },
});

interface Props {
  ratings: PersonalRatingDto[];
  ads: JobOfferDto[];
  label?: string;
}

export function RatingLibrary({ ratings, ads, label }: Props) {
  const [searchResults, setSearchResults] =
    useState<PersonalRatingDto[]>(ratings);

  const { t } = useTranslation();

  const { data: users } = useUsers(ratings.map(({ userId }) => userId));

  return (
    <Box sx={styles.flexColumn}>
      {!searchResults.length ? (
        <NoRatings />
      ) : (
        <>
          <TextField
            placeholder={t('search')}
            type="search"
            sx={styles.textField}
            onChange={(e) => {
              setSearchResults(
                filterRatingsByTerm(ratings, ads, users ?? [], e.target.value)
              );
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
          />

          {label && <Typography>{t(label)}</Typography>}

          <RatingList ratings={searchResults} ads={ads} />
        </>
      )}
    </Box>
  );
}
