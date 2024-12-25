import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, DialogActions } from '@mui/material';
import { ServiceOfferDto, UserProfile } from '@shared/data-objects';
import { ErrorContainer } from '../../../components/error-container';
import { LoadingButton } from '../../../components/loading-button';
import { ServiceOfferControls } from '../../../components/service-offer-form/controls';
import { useAsyncAction } from '../../../hooks/use-async-action';
import { makeStyles } from '../../../libs/make-styles';
import { serviceOfferService } from '../../../services/service-offer-service';
import { FormProvider, useForm } from 'react-hook-form';
import {
  defaultValues,
  serviceOfferEditSchema,
  ServiceOfferEditSchema,
  toEditServiceOfferDto,
} from '../../../validation-schemas/service-offer-update-schema';

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
  ad: ServiceOfferDto;
  onClose: () => void;
  onChange: () => void;
}

export function EditServiceOfferForm({
  userData,
  ad,
  onClose,
  onChange,
}: Props) {
  const form = useForm<ServiceOfferEditSchema>({
    defaultValues: defaultValues(userData, ad),
    resolver: zodResolver(serviceOfferEditSchema),
  });

  const { trigger, loading, error } = useAsyncAction(
    async ({ signal }, formAd: ServiceOfferEditSchema) => {
      await serviceOfferService.editAd(
        ad._id,
        toEditServiceOfferDto(formAd),
        signal
      );

      onClose();
      onChange();
    }
  );

  const onSubmit = form.handleSubmit(trigger);

  return (
    <FormProvider {...form}>
      <Box component="form" onSubmit={onSubmit} sx={styles.content}>
        <ServiceOfferControls />

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
