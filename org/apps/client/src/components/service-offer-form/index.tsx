import { ServiceOfferDto, UserProfile } from '@shared/data-objects';
import { makeStyles } from '../../libs/make-styles';
import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import {
  defaultValues,
  serviceOfferCreationSchema,
  ServiceOfferCreationSchema,
  toCreateServiceOfferDto,
} from '../../validation-schemas/service-offer-creation-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAsyncAction } from '../../hooks/use-async-action';
import { serviceOfferService } from '../../services/service-offer-service';
import { Box, Typography } from '@mui/material';
import { ErrorContainer } from '../error-container';
import { LoadingButton } from '../loading-button';
import { ServiceOfferControls } from './controls';
import { useTranslation } from 'react-i18next';

const styles = makeStyles({
  header: {
    paddingBottom: 2,
    textAlign: 'center',
    color: (theme) => theme.palette.primary.main,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  },
  button: {
    width: 'min-content',
    alignSelf: 'center',
  },
});

interface Props {
  userData: UserProfile;
  ad?: ServiceOfferDto;
}

export function ServiceOfferForm({ userData, ad }: Props) {
  const navigate = useNavigate();

  const { t } = useTranslation();

  const form = useForm<ServiceOfferCreationSchema>({
    defaultValues: defaultValues(userData, ad),
    resolver: zodResolver(serviceOfferCreationSchema),
  });

  const { trigger, loading, error } = useAsyncAction(
    async ({ signal }, ad: ServiceOfferCreationSchema) => {
      await serviceOfferService.createAd(toCreateServiceOfferDto(ad), signal);

      navigate('/');
    }
  );

  const onSubmit = form.handleSubmit(trigger);

  return (
    <FormProvider {...form}>
      <Typography variant="h3" sx={styles.header}>
        {t('offer-services-question')}
      </Typography>

      <Box component="form" onSubmit={onSubmit} sx={styles.content}>
        <ServiceOfferControls />

        {error ? <ErrorContainer>{error}</ErrorContainer> : null}

        <LoadingButton
          type="submit"
          variant="contained"
          loading={loading}
          sx={styles.button}
        >
          Save
        </LoadingButton>
      </Box>
    </FormProvider>
  );
}
