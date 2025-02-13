import Box from '@mui/material/Box';
import { sortJobs, sortServices } from '../../libs/ad-helper-functions';
import {
  IconButton,
  InputAdornment,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import {
  filterJobsByTerm,
  filterServicesByTerm,
} from '../../libs/ad-helper-functions';
import { CreateAdButton } from './create-ad-button';
import { AdList } from './ad-list';
import { makeStyles } from '../../libs/make-styles';
import { useEffect, useMemo, useState } from 'react';
import { JobOfferDto, ServiceOfferDto } from '@shared/data-objects';
import { AdType } from '../../libs/ad-helper-functions';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuIcon from '@mui/icons-material/Menu';
import AppsIcon from '@mui/icons-material/Apps';
import { useUserPreferences } from '../../hooks/use-user-preferences';
import { NoAds } from './no-ads';
import { useTranslation } from 'react-i18next';

const styles = makeStyles({
  flexRow: {
    display: 'flex',
    flexDirection: ['column', 'row'],
    gap: 2,
    justifyContent: 'space-between',
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  },
  textField: {
    alignSelf: 'center',
  },
  icon: {
    color: (theme) => theme.palette.primary.main,
    fontSize: '2rem',
  },
  toggleButton: {
    color: (theme) => theme.palette.primary.main,
  },
});

interface Props {
  jobs: JobOfferDto[];
  services?: ServiceOfferDto[];
  showCreateButton?: boolean;
  showToggleButton?: boolean;
  label?: string;
  isAccomplishment?: boolean;
}

export function AdLibrary({
  jobs,
  services = [],
  showCreateButton = true,
  showToggleButton = true,
  label,
  isAccomplishment = false,
}: Props) {
  const { isGrid, isAsc, type, setPreferences } = useUserPreferences();

  const { t } = useTranslation();

  const [searchJobs, setSearchJobs] = useState<JobOfferDto[]>(
    sortJobs(jobs, isAsc)
  );
  const [searchServices, setSearchServices] = useState<ServiceOfferDto[]>(
    sortServices(services, isAsc)
  );

  useEffect(() => {
    setSearchJobs(sortJobs(searchJobs, isAsc));
    setSearchServices(sortServices(searchServices, isAsc));
  }, [isAsc]);

  const selectedType = type === AdType.Job ? AdType.Service : AdType.Job;

  return (
    <Box sx={styles.flexColumn}>
      {!jobs.length && !services.length ? (
        <NoAds />
      ) : (
        <>
          <Box sx={styles.flexRow}>
            <Box sx={styles.flexRow}>
              <TextField
                placeholder={t('search')}
                type="search"
                sx={styles.textField}
                onChange={(e) => {
                  setSearchJobs(filterJobsByTerm(jobs, e.target.value));
                  setSearchServices(
                    filterServicesByTerm(services, e.target.value)
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

              <IconButton onClick={() => setPreferences({ isGrid: !isGrid })}>
                {isGrid ? (
                  <MenuIcon sx={styles.icon} />
                ) : (
                  <AppsIcon sx={styles.icon} />
                )}
              </IconButton>

              <IconButton onClick={() => setPreferences({ isAsc: !isAsc })}>
                {isAsc ? (
                  <KeyboardArrowUpIcon sx={styles.icon} />
                ) : (
                  <KeyboardArrowDownIcon sx={styles.icon} />
                )}
              </IconButton>
            </Box>

            <Box sx={styles.flexRow}>
              {showToggleButton && (
                <ToggleButtonGroup
                  value={type}
                  exclusive
                  onChange={() => setPreferences({ type: selectedType })}
                >
                  <ToggleButton value={AdType.Job}>
                    <Typography sx={styles.toggleButton}>
                      {t('seeking')}
                    </Typography>
                  </ToggleButton>
                  <ToggleButton value={AdType.Service}>
                    <Typography sx={styles.toggleButton}>
                      {t('offering')}
                    </Typography>
                  </ToggleButton>
                </ToggleButtonGroup>
              )}

              {showCreateButton && <CreateAdButton />}
            </Box>
          </Box>

          <AdList
            jobs={searchJobs}
            services={searchServices}
            isGrid={isGrid}
            type={type}
            label={label}
            isAccomplishment={isAccomplishment}
          />
        </>
      )}
    </Box>
  );
}
