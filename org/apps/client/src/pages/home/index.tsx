import {
  Box,
  IconButton,
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
  const [type, setType] = useState(AdType.Job);

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
      {([jobs, services]) => (
        <Box sx={styles.flexColumn}>
          <Box sx={styles.flexRow}>
            <Box sx={styles.flexRow}>
              <TextField label="Search" type="search" sx={styles.textField} />

              <IconButton onClick={() => setIsGrid(!isGrid)}>
                {isGrid ? (
                  <MenuIcon sx={styles.icon} />
                ) : (
                  <AppsIcon sx={styles.icon} />
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

          <AdList jobs={jobs} services={services} isGrid={isGrid} type={type} />
        </Box>
      )}
    </AsyncDataLoader>
  );
}
