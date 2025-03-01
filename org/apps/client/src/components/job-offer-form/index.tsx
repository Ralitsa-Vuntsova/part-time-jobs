import { JobOfferDto, UserProfile } from '@shared/data-objects';
import { makeStyles } from '../../libs/make-styles';
import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import {
  jobOfferCreationSchema,
  JobOfferCreationSchema,
  toCreateJobOfferDto,
} from '../../validation-schemas/job-offer-creation-schema';
import { useAsyncAction } from '../../hooks/use-async-action';
import { jobOfferService } from '../../services/job-offer-service';
import { Box, Typography } from '@mui/material';
import { ErrorContainer } from '../error-container';
import { LoadingButton } from '../loading-button';
import { zodResolver } from '@hookform/resolvers/zod';
import { defaultValues } from '../../validation-schemas/job-offer-creation-schema';
import { JobOfferControls } from './controls';
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
  ad?: JobOfferDto;
}

export function JobOfferForm({ ad, userData }: Props) {
  const navigate = useNavigate();

  const { t } = useTranslation();

  const form = useForm<JobOfferCreationSchema>({
    defaultValues: defaultValues(userData, ad),
    resolver: zodResolver(jobOfferCreationSchema),
  });

  const { trigger, loading, error } = useAsyncAction(
    async ({ signal }, ad: JobOfferCreationSchema) => {
      await jobOfferService.createAd(toCreateJobOfferDto(ad), signal);

      navigate('/');
    }
  );

  const onSubmit = form.handleSubmit(trigger);

  return (
    <FormProvider {...form}>
      <Typography variant="h3" sx={styles.header}>
        {t('seek-services-question')}
      </Typography>

      <Box component="form" onSubmit={onSubmit} sx={styles.content}>
        <JobOfferControls />

        {error ? <ErrorContainer>{error}</ErrorContainer> : null}

        <LoadingButton
          type="submit"
          variant="contained"
          loading={loading}
          sx={styles.button}
        >
          {t('save')}
        </LoadingButton>
      </Box>
    </FormProvider>
  );
}
