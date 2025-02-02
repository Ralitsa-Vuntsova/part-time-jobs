import { Box, Button, Typography } from '@mui/material';
import {
  ApplicationDto,
  JobOfferDto,
  ServiceOfferDto,
  UserProfile,
} from '@shared/data-objects';
import { makeStyles } from '../../libs/make-styles';
import { AdType } from '../../libs/ad-helper-functions';
import { useCurrentUser } from '../../hooks/use-current-user';
import { useState } from 'react';
import { EditAdDialog } from './edit-dialog';
import { jobOfferService } from '../../services/job-offer-service';
import { serviceOfferService } from '../../services/service-offer-service';
import { useAsyncAction } from '../../hooks/use-async-action';
import { ErrorContainer } from '../error-container';
import { ApplyDialog } from './apply-dialog';
import { FormattedDate } from '../formatted-date';
import { DateFormats } from '../../libs/dates';
import { useTranslation } from 'react-i18next';
import { ArchiveReason } from '@shared/enums';
import { ArchiveDialog } from './archive-dialog';
import { UnarchiveDialog } from './unarchive-dialog';
import { AdDetailsContent } from './details/content';
import { AdDetailsFooter } from './details/footer';

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
  const [openArchiveDialog, setOpenArchiveDialog] = useState(false);
  const [openUnarchiveDialog, setOpenUnarchiveDialog] = useState(false);
  const [archiveReason, setArchiveReason] = useState<ArchiveReason>(
    ArchiveReason.Done
  );

  const { t } = useTranslation();

  const alreadyApplied = !!applications.find((app) => app.adId === ad._id);
  const application = applications.find(
    (app) => app.createdBy === userData._id && app.adId === ad._id
  );
  const alreadyAppliedByCurrentUser = !!application;

  const {
    trigger: archive,
    loading: archiveLoading,
    error: archiveError,
  } = useAsyncAction(async ({ signal }) => {
    if (type === AdType.Job) {
      await jobOfferService.editAd(ad._id, { archiveReason }, signal);
    } else {
      await serviceOfferService.editAd(ad._id, { archiveReason }, signal);
    }

    setOpenArchiveDialog(false);
    onChange();
  });

  const {
    trigger: unarchive,
    loading: unarchiveLoading,
    error: unarchiveError,
  } = useAsyncAction(async ({ signal }) => {
    if (type === AdType.Job) {
      await jobOfferService.unarchiveAd(ad._id, signal);
    } else {
      await serviceOfferService.unarchiveAd(ad._id, signal);
    }

    setOpenUnarchiveDialog(false);
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
              disabled={!!ad.archiveReason || alreadyApplied}
            >
              {t('edit')}
            </Button>

            {!!ad.archiveReason && ad.archiveReason === ArchiveReason.Done && (
              <Typography sx={styles.typography}>{t('completed')}</Typography>
            )}

            {!!ad.archiveReason &&
              ad.archiveReason === ArchiveReason.Unpublishing && (
                <Button
                  variant="outlined"
                  sx={styles.button}
                  onClick={() => setOpenUnarchiveDialog(true)}
                >
                  {t('unarchive')}
                </Button>
              )}

            {!ad.archiveReason && (
              <Button
                variant="outlined"
                sx={styles.button}
                onClick={() => setOpenArchiveDialog(true)}
              >
                {t('archive')}
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

      {archiveError ? <ErrorContainer>{archiveError}</ErrorContainer> : null}
      {unarchiveError ? (
        <ErrorContainer>{unarchiveError}</ErrorContainer>
      ) : null}

      <ArchiveDialog
        open={openArchiveDialog}
        onConfirm={archive}
        confirmLoading={archiveLoading}
        onClose={() => setOpenArchiveDialog(false)}
        archiveReason={archiveReason}
        onReasonSelected={(reason: ArchiveReason) => setArchiveReason(reason)}
      />

      <UnarchiveDialog
        open={openUnarchiveDialog}
        onConfirm={unarchive}
        confirmLoading={unarchiveLoading}
        onClose={() => setOpenUnarchiveDialog(false)}
      />

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
