import Box from '@mui/material/Box';
import { sortJobs, sortServices } from '../../libs/sort-ads';
import {
  IconButton,
  InputAdornment,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { filterJobsByTerm, filterServicesByTerm } from '../../libs/search-ads';
import { CreateAdButton } from './create-ad-button';
import { AdList } from './ad-list';
import { makeStyles } from '../../libs/make-styles';
import { useEffect, useState } from 'react';
import { JobOfferDto, ServiceOfferDto } from '@shared/data-objects';
import { AdType } from '../../libs/ad-type';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuIcon from '@mui/icons-material/Menu';
import AppsIcon from '@mui/icons-material/Apps';

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
  services: ServiceOfferDto[];
  showCreateButton?: boolean;
}

export function AdLibrary({ jobs, services, showCreateButton = true }: Props) {
  const [isGrid, setIsGrid] = useState(true);
  const [isAsc, setIsAsc] = useState(false);
  const [type, setType] = useState(AdType.Job);
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

  return (
    <Box sx={styles.flexColumn}>
      <Box sx={styles.flexRow}>
        <Box sx={styles.flexRow}>
          <TextField
            placeholder="Search"
            type="search"
            sx={styles.textField}
            onChange={(e) => {
              setSearchJobs(filterJobsByTerm(jobs, e.target.value));
              setSearchServices(filterServicesByTerm(services, e.target.value));
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

          <IconButton onClick={() => setIsGrid(!isGrid)}>
            {isGrid ? (
              <MenuIcon sx={styles.icon} />
            ) : (
              <AppsIcon sx={styles.icon} />
            )}
          </IconButton>

          <IconButton onClick={() => setIsAsc(!isAsc)}>
            {isAsc ? (
              <KeyboardArrowUpIcon sx={styles.icon} />
            ) : (
              <KeyboardArrowDownIcon sx={styles.icon} />
            )}
          </IconButton>
        </Box>

        <Box sx={styles.flexRow}>
          <ToggleButtonGroup
            value={type}
            exclusive
            onChange={() =>
              setType(type === AdType.Job ? AdType.Service : AdType.Job)
            }
          >
            <ToggleButton value={AdType.Job}>
              <Typography sx={styles.toggleButton}>Job Offers</Typography>
            </ToggleButton>
            <ToggleButton value={AdType.Service}>
              <Typography sx={styles.toggleButton}>Service Offers</Typography>
            </ToggleButton>
          </ToggleButtonGroup>

          {showCreateButton && <CreateAdButton />}
        </Box>
      </Box>

      <AdList
        jobs={searchJobs}
        services={searchServices}
        isGrid={isGrid}
        type={type}
      />
    </Box>
  );
}
