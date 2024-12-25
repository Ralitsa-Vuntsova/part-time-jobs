import {
  Accordion,
  AccordionDetails,
  Box,
  Button,
  Typography,
} from '@mui/material';
import {
  JobOfferDto,
  ServiceOfferDto,
  UserProfile,
} from '@shared/data-objects';
import { makeStyles } from '../../../libs/make-styles';
import { AccordionSummaryWithLeftIcon } from '../../../components/accordion-summary-with-left-icon';
import { ContactTable } from './contact-table';
import { OfferInformationAccordion } from './offer-information-accordion';
import { AdType } from '../../../libs/ad-type';
import { DateFormats } from '../../../libs/dates';
import { FormattedDate } from '../../../components/formatted-date';
import { useCurrentUser } from '../../../hooks/use-current-user';
import { useState } from 'react';
import { EditAdDialog } from '../edit-dialog';
import { ConfirmDialog } from '../../../components/dialog';
import { jobOfferService } from '../../../services/job-offer-service';
import { serviceOfferService } from '../../../services/service-offer-service';
import { useAsyncAction } from '../../../hooks/use-async-action';
import { ErrorContainer } from '../../../components/error-container';

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
      color: (theme) => theme.palette.info.main,
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
  userData: UserProfile;
  type: AdType;
  onChange: () => void;
}

// TODO: Ad creator + option do visit profile
// TODO: Button Apply (for offer ads only)
export function AdDetails({ ad, userData, type, onChange }: Props) {
  const currentUser = useCurrentUser();
  const [openEditDialog, setOpenEditDialog] = useState(false);
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

        <Accordion defaultExpanded>
          <AccordionSummaryWithLeftIcon>
            <Typography>Description</Typography>
          </AccordionSummaryWithLeftIcon>
          <AccordionDetails>
            <Typography>{ad.description}</Typography>
          </AccordionDetails>
        </Accordion>

        {type === AdType.Job && (
          <OfferInformationAccordion ad={ad as JobOfferDto} />
        )}

        <Accordion defaultExpanded>
          <AccordionSummaryWithLeftIcon>
            <Typography>Contacts</Typography>
          </AccordionSummaryWithLeftIcon>
          <AccordionDetails>
            <ContactTable contacts={ad.contacts} />
          </AccordionDetails>
        </Accordion>

        {ad.additionalInformation && (
          <Accordion defaultExpanded>
            <AccordionSummaryWithLeftIcon>
              <Typography>Additional Information</Typography>
            </AccordionSummaryWithLeftIcon>
            <AccordionDetails>
              <Typography>{ad.additionalInformation}</Typography>
            </AccordionDetails>
          </Accordion>
        )}

        <Box sx={styles.flexRow}>
          <Typography>Created:</Typography>
          <FormattedDate variant="body1" format={DateFormats.Preview}>
            {ad.createdAt}
          </FormattedDate>
        </Box>

        {ad.updatedAt && (
          <Box sx={styles.flexRow}>
            <Typography>Last Updated:</Typography>
            <FormattedDate variant="body1" format={DateFormats.Preview}>
              {ad.updatedAt}
            </FormattedDate>
          </Box>
        )}
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
    </>
  );
}
