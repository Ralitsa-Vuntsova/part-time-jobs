import { useAsyncAction } from '../../../hooks/use-async-action';
import { jobOfferService } from '../../../services/job-offer-service';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { JobOfferDto, UserProfile } from '@shared/data-objects';
import { JobOfferControls } from '../../../components/job-offer-form/controls';
import { Box, Button, DialogActions } from '@mui/material';
import { LoadingButton } from '../../../components/loading-button';
import { ErrorContainer } from '../../../components/error-container';
import { makeStyles } from '../../../libs/make-styles';
import {
  jobOfferEditSchema,
  JobOfferEditSchema,
  toEditJobOfferDto,
  defaultValues,
} from '../../../validation-schemas/job-offer-update-schema';

const styles = makeStyles({
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  },
  button: {
    width: 'min-content',
    alignSelf: 'center',
  },
  flexRow: {
    display: 'flex',
    gap: 2,
    justifyContent: 'center',
  },
});

interface Props {
  userData: UserProfile;
  ad: JobOfferDto;
  onClose: () => void;
  onChange: () => void;
}

export function EditJobOfferForm({ userData, ad, onClose, onChange }: Props) {
  const form = useForm<JobOfferEditSchema>({
    defaultValues: defaultValues(userData, ad),
    resolver: zodResolver(jobOfferEditSchema),
  });

  const { trigger, loading, error } = useAsyncAction(
    async ({ signal }, formAd: JobOfferEditSchema) => {
      await jobOfferService.editAd(ad._id, toEditJobOfferDto(formAd), signal);

      onClose();
      onChange();
    }
  );

  const onSubmit = form.handleSubmit(trigger);

  return (
    <FormProvider {...form}>
      <Box component="form" onSubmit={onSubmit} sx={styles.content}>
        <JobOfferControls />

        {error ? <ErrorContainer>{error}</ErrorContainer> : null}

        <DialogActions sx={styles.flexRow}>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>

          <LoadingButton
            type="submit"
            variant="contained"
            loading={loading}
            sx={styles.button}
          >
            Save
          </LoadingButton>
        </DialogActions>
      </Box>
    </FormProvider>
  );
}