import { Box, Button, Typography } from '@mui/material';
import {
  ApplicationDto,
  JobOfferDto,
  ServiceOfferDto,
  UserProfile,
} from '@shared/data-objects';
import { makeStyles } from '../../../libs/make-styles';
import { AdType } from '../../../libs/ad-helper-functions';
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
import { FormattedDate } from '../../../components/formatted-date';
import { DateFormats } from '../../../libs/dates';
import { useTranslation } from 'react-i18next';

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
  flexRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: 1,
    '& .MuiTypography-root': {
      color: (theme) => theme.palette.primary.main,
    },
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

  const { t } = useTranslation();

  const alreadyApplied = !!applications.find((app) => app.adId === ad._id);
  const application = applications.find(
    (app) => app.createdBy === userData._id && app.adId === ad._id
  );
  const alreadyAppliedByCurrentUser = !!application;

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
              disabled={ad.isArchieved || alreadyApplied}
            >
              {t('edit')}
            </Button>
            {ad.isArchieved ? (
              <Typography sx={styles.typography}>{t('archieved')}</Typography>
            ) : (
              <Button
                variant="outlined"
                sx={styles.button}
                onClick={() => setOpenConfirmDialog(true)}
              >
                {t('archieve')}
              </Button>
            )}
          </>
        )}

        <AdDetailsContent ad={ad} type={type} />

        {currentUser?._id !== ad.createdBy && type === AdType.Job && (
          <>
            <Button
              variant="contained"
              sx={styles.button}
              onClick={() => setOpenApplyDialog(true)}
              disabled={alreadyAppliedByCurrentUser}
            >
              {t('apply')}
            </Button>

            {alreadyAppliedByCurrentUser && (
              <Box sx={styles.flexRow}>
                <Typography>{t('already-applied')}</Typography>
                <FormattedDate variant="body1" format={DateFormats.Preview}>
                  {application.createdAt}
                </FormattedDate>
              </Box>
            )}
          </>
        )}

        <AdDetailsFooter ad={ad} />
      </Box>

      {error ? <ErrorContainer>{error}</ErrorContainer> : null}

      <ConfirmDialog
        open={openConfirmDialog}
        title={t('archieve-ad')}
        onConfirm={() => trigger()}
        confirmLabel={t('archieve')}
        confirmLoading={loading}
        onCancel={() => setOpenConfirmDialog(false)}
        cancelLabel={t('cancel')}
        onClose={() => setOpenConfirmDialog(false)}
      >
        <Typography>{t('archieve-confirm-question')}</Typography>
      </ConfirmDialog>

      <EditAdDialog
        open={openEditDialog}
        ad={ad}
        userData={userData}
        type={type}
        onClose={() => setOpenEditDialog(false)}
        onChange={onChange}
      />

      {type === AdType.Job && (
        <ApplyDialog
          open={openApplyDialog}
          onClose={() => setOpenApplyDialog(false)}
          ad={ad as JobOfferDto}
          onChange={onChange}
        />
      )}
    </>
  );
}
