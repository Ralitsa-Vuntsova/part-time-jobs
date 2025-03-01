import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, DialogActions } from '@mui/material';
import { ServiceOfferDto, UserProfile } from '@shared/data-objects';
import { ErrorContainer } from '../../error-container';
import { LoadingButton } from '../../loading-button';
import { ServiceOfferControls } from '../../service-offer-form/controls';
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
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

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

      form.reset();

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
          <Button
            variant="outlined"
            onClick={() => {
              form.reset();
              onClose();
            }}
          >
            {t('cancel')}
          </Button>

          <LoadingButton
            type="submit"
            variant="contained"
            loading={loading}
            sx={styles.button}
          >
            {t('save')}
          </LoadingButton>
        </DialogActions>
      </Box>
    </FormProvider>
  );
}
