import {
  JobOfferDto,
  PersonalRatingDto,
  UserProfile,
} from '@shared/data-objects';
import { useState } from 'react';
import { Box, InputAdornment, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';
import { filterApplicationsByTerm } from '../../libs/application-helper-functions';
import { makeStyles } from '../../libs/make-styles';
import { NoRatings } from './no-ratings';
import { filterRatingsByTerm } from '../../libs/rating-helper-functions';
import { RatingList } from './rating-list';

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
  users: UserProfile[];
  ads: JobOfferDto[];
  label?: string;
}

export function RatingLibrary({ ratings, users, ads, label }: Props) {
  const [searchResults, setSearchResults] =
    useState<PersonalRatingDto[]>(ratings);

  const { t } = useTranslation();

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
                filterRatingsByTerm(ratings, ads, users, e.target.value)
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

          <RatingList ratings={searchResults} users={users} ads={ads} />
        </>
      )}
    </Box>
  );
}
