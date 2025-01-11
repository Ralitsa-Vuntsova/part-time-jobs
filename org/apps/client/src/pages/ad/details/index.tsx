import { Box, Button, Typography } from '@mui/material';
import {
  ApplicationDto,
  JobOfferDto,
  ServiceOfferDto,
  UserProfile,
} from '@shared/data-objects';
import { makeStyles } from '../../../libs/make-styles';
import { AdType } from '../../../libs/ad-type';
import { useCurrentUser } from '../../../hooks/use-current-user';
import { useState } from 'react';
import { EditAdDialog } from '../edit-dialog';
import { ConfirmDialog } from '../../../components/dialog';
import { jobOfferService } from '../../../services/job-offer-service';
import { serviceOfferService } from '../../../services/service-offer-service';
import { useAsyncAction } from '../../../hooks/use-async-action';
import { ErrorContainer } from '../../../components/error-container';
import { ApplyDialog } from '../apply-dialog';
import { AdDetailsContent } from './content';
import { AdDetailsFooter } from './footer';

const styles = makeStyles({
  header: {
    paddingBottom: 2,
    textAlign: 'center',
    color: (theme) => theme.palette.primary.main,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  button: {
    maxWidth: 'fit-content',
    alignSelf: 'center',
  },
  typography: {
    color: (theme) => theme.palette.primary.main,
    alignSelf: 'center',
  },
});

interface Props {
  ad: JobOfferDto | ServiceOfferDto;
  applications: ApplicationDto[];
  userData: UserProfile;
  type: AdType;
  onChange: () => void;
}

// TODO: Ad creator + option do visit profile
export function AdDetails({
  ad,
  applications,
  userData,
  type,
  onChange,
}: Props) {
  const currentUser = useCurrentUser();
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openApplyDialog, setOpenApplyDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const { trigger, loading, error } = useAsyncAction(async ({ signal }) => {
    if (type === AdType.Job) {
      await jobOfferService.editAd(
        ad._id,
        { ...(ad as JobOfferDto), isArchieved: true },
        signal
      );
    } else {
      await serviceOfferService.editAd(
        ad._id,
        { ...ad, isArchieved: true },
        signal
      );
    }

    setOpenConfirmDialog(false);
    onChange();
  });

  return (
    <>
      <Typography variant="h3" sx={styles.header}>
        {ad.name}
      </Typography>

      <Box sx={styles.flexColumn}>
        {currentUser?._id === ad.createdBy && (
          <>
            <Button
              variant="contained"
              sx={styles.button}
              onClick={() => setOpenEditDialog(true)}
              disabled={ad.isArchieved}
            >
              Edit
            </Button>
            {ad.isArchieved ? (
              <Typography sx={styles.typography}>Archieved</Typography>
            ) : (
              <Button
                variant="outlined"
                sx={styles.button}
                onClick={() => setOpenConfirmDialog(true)}
              >
                Archieve
              </Button>
            )}
          </>
        )}

        <AdDetailsContent ad={ad} type={type} />

        {currentUser?._id !== ad.createdBy && type === AdType.Job && (
          <Button
            variant="contained"
            sx={styles.button}
            onClick={() => setOpenApplyDialog(true)}
            disabled={
              !!applications.find(
                (app) => app.createdBy === userData._id && app.adId === ad._id
              )
            }
          >
            Apply
          </Button>
        )}

        <AdDetailsFooter ad={ad} />
      </Box>

      {error ? <ErrorContainer>{error}</ErrorContainer> : null}

      <ConfirmDialog
        open={openConfirmDialog}
        title="Archieve Ad"
        onConfirm={() => trigger()}
        confirmLabel="Archieve"
        confirmLoading={loading}
        onCancel={() => setOpenConfirmDialog(false)}
        cancelLabel="Cancel"
      >
        <Typography>
          Are you sure you want to archieve this ad? This action cannot be
          undone.
        </Typography>
      </ConfirmDialog>

      <EditAdDialog
        open={openEditDialog}
        ad={ad}
        userData={userData}
        type={type}
        onClose={() => setOpenEditDialog(false)}
        onChange={onChange}
      />

      <ApplyDialog
        open={openApplyDialog}
        onClose={() => setOpenApplyDialog(false)}
        ad={ad as JobOfferDto}
        onChange={onChange}
      />
    </>
  );
}
