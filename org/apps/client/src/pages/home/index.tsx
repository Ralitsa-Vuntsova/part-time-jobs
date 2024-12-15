import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { makeStyles } from '../../libs/make-styles';
import { CreateAdButton } from './create-ad-button';
import {
  AsyncDataLoader,
  LOADING_PROPS,
} from '../../components/async-data-loader';
import { jobOfferService } from '../../services/job-offer-service';
import { serviceOfferService } from '../../services/service-offer-service';
import { AdList } from './ad-list';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import AppsIcon from '@mui/icons-material/Apps';
import { AdType } from '../../libs/ad-type';
import { JobOfferDto, ServiceOfferDto } from '@shared/data-objects';
import { filterJobsByTerm, filterServicesByTerm } from '../../libs/search-ads';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { sortJobs, sortServices } from '../../libs/sort-ads';

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

export function Home() {
  const [isGrid, setIsGrid] = useState(true);
  const [isAsc, setIsAsc] = useState(false);
  const [type, setType] = useState(AdType.Job);
  const [searchJobs, setSearchJobs] = useState<JobOfferDto[]>([]);
  const [searchServices, setSearchServices] = useState<ServiceOfferDto[]>([]);

  return (
    <AsyncDataLoader
      dataLoader={({ signal }) =>
        Promise.all([
          jobOfferService.listAll(signal),
          serviceOfferService.listAll(signal),
        ])
      }
      loadingProps={LOADING_PROPS.BLANK_PAGE_WITH_TOP_BAR}
    >
      {([jobs, services]) => {
        const displayedJobs =
          searchJobs.length === 0 ? sortJobs(jobs, isAsc) : searchJobs;
        const displayedServices =
          searchServices.length === 0
            ? sortServices(services, isAsc)
            : searchServices;

        return (
          <Box sx={styles.flexColumn}>
            <Box sx={styles.flexRow}>
              <Box sx={styles.flexRow}>
                <TextField
                  placeholder="Search"
                  type="search"
                  sx={styles.textField}
                  onChange={(e) => {
                    setSearchJobs(
                      sortJobs(filterJobsByTerm(jobs, e.target.value), isAsc)
                    );
                    setSearchServices(
                      sortServices(
                        filterServicesByTerm(services, e.target.value),
                        isAsc
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
                    <Typography sx={styles.toggleButton}>
                      Service Offers
                    </Typography>
                  </ToggleButton>
                </ToggleButtonGroup>

                <CreateAdButton />
              </Box>
            </Box>

            <AdList
              jobs={displayedJobs}
              services={displayedServices}
              isGrid={isGrid}
              type={type}
            />
          </Box>
        );
      }}
    </AsyncDataLoader>
  );
}
