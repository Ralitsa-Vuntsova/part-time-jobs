import {
  ApplicationDto,
  ApplicationResponseDto,
  JobOfferDto,
  UserProfile,
} from '@shared/data-objects';
import { NoApplications } from './no-applications';
import { useState } from 'react';
import { Box, InputAdornment, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';
import { ApplicationList } from './application-list';
import { filterApplicationsByTerm } from '../../libs/application-helper-functions';
import { makeStyles } from '../../libs/make-styles';

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
  applications: ApplicationDto[];
  users: UserProfile[];
  ads: JobOfferDto[];
  applicationResponses: ApplicationResponseDto[];
  label?: string;
  onChange: () => void;
}

export function ApplicationLibrary({
  applications,
  users,
  ads,
  applicationResponses,
  label,
  onChange,
}: Props) {
  const [searchResults, setSearchResults] =
    useState<ApplicationDto[]>(applications);

  const { t } = useTranslation();

  return (
    <Box sx={styles.flexColumn}>
      {!searchResults.length ? (
        <NoApplications />
      ) : (
        <>
          <TextField
            placeholder={t('search')}
            type="search"
            sx={styles.textField}
            onChange={(e) => {
              setSearchResults(
                filterApplicationsByTerm(
                  applications,
                  ads,
                  users,
                  e.target.value
                )
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

          <ApplicationList
            applications={searchResults}
            users={users}
            ads={ads}
            applicationResponses={applicationResponses}
            onChange={onChange}
          />
        </>
      )}
    </Box>
  );
}
