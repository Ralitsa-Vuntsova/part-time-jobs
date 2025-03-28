import { Box, Typography } from '@mui/material';
import {
  ApplicationDto,
  JobOfferDto,
  ServiceOfferDto,
  UserProfile,
} from '@shared/data-objects';
import { makeStyles } from '../../libs/make-styles';
import { AdType } from '../../libs/ad-helper-functions';
import { useState } from 'react';
import { EditAdDialog } from './edit-dialog';
import { jobOfferService } from '../../services/job-offer-service';
import { serviceOfferService } from '../../services/service-offer-service';
import { useAsyncAction } from '../../hooks/use-async-action';
import { ErrorContainer } from '../error-container';
import { ApplyButton } from './apply-button';
import { ArchiveReason } from '@shared/enums';
import { ArchiveDialog } from './archive-dialog';
import { UnarchiveDialog } from './unarchive-dialog';
import { AdDetailsContent } from './content';
import { AdDetailsFooter } from './footer';
import { HeaderButtons } from './header-buttons';
import { PersonalRatingDialog } from '../personal-rating-dialog';
import { PublicRatingDialog } from '../public-rating-dialog';
import { useUsers } from '../../hooks/use-users';

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
});

interface Props {
  ad: JobOfferDto | ServiceOfferDto;
  applications: ApplicationDto[];
  userData: UserProfile;
  servicePerformerIds: string[];
  type: AdType;
  onChange: () => void;
}

export function AdDetails({
  ad,
  applications,
  userData,
  servicePerformerIds,
  type,
  onChange,
}: Props) {
  const { data: users } = useUsers(servicePerformerIds);

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openApplyDialog, setOpenApplyDialog] = useState(false);
  const [openArchiveDialog, setOpenArchiveDialog] = useState(false);
  const [openUnarchiveDialog, setOpenUnarchiveDialog] = useState(false);
  const [openPersonalRatingDialog, setOpenPersonalRatingDialog] =
    useState(false);
  const [openPublicRatingDialog, setOpenPublicRatingDialog] = useState(false);

  const [archiveReason, setArchiveReason] = useState<ArchiveReason>(
    ArchiveReason.Done
  );

  const alreadyApplied = !!applications.find((app) => app.adId === ad._id);
  const application = applications.find(
    (app) => app.createdBy === userData._id && app.adId === ad._id
  );
  const isMyAccomplishmentsView =
    ad.archiveReason === ArchiveReason.Done && ad.createdBy !== userData._id;

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
        {userData._id === ad.createdBy && (
          <HeaderButtons
            ad={ad}
            alreadyApplied={alreadyApplied}
            onEdit={() => setOpenEditDialog(true)}
            onArchive={() => setOpenArchiveDialog(true)}
            onUnarchive={() => setOpenUnarchiveDialog(true)}
            onPublicRate={() => setOpenPublicRatingDialog(true)}
            onPrivateRate={() => setOpenPersonalRatingDialog(true)}
          />
        )}

        <AdDetailsContent ad={ad} type={type} />

        {userData._id !== ad.createdBy &&
          type === AdType.Job &&
          !isMyAccomplishmentsView && (
            <ApplyButton
              openApplyDialog={openApplyDialog}
              application={application}
              onApply={() => setOpenApplyDialog(true)}
              onClose={() => setOpenApplyDialog(false)}
              onChange={onChange}
              ad={ad as JobOfferDto}
            />
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

      {users && (
        <>
          <PersonalRatingDialog
            open={openPersonalRatingDialog}
            onClose={() => setOpenPersonalRatingDialog(false)}
            ad={ad as JobOfferDto}
            users={users}
          />

          <PublicRatingDialog
            open={openPublicRatingDialog}
            onClose={() => setOpenPublicRatingDialog(false)}
            ad={ad as JobOfferDto}
            users={users}
          />
        </>
      )}
    </>
  );
}
