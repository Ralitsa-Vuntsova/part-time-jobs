import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import {
  ApplicationDto,
  ApplicationResponseDto,
  JobOffer,
} from '@shared/data-objects';
import { makeStyles } from '../../../libs/make-styles';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import {
  ApplicationResponse,
  applicationResponseToTranslateKey,
} from '@shared/enums';
import { useAsyncAction } from '../../../hooks/use-async-action';
import { ConfirmDialog } from '../../dialog';
import {
  applicationResponseSchema,
  ApplicationResponseSchema,
  toCreateApplicationResponseDto,
} from '../../../validation-schemas/application-response-schema';
import { applicationResponseService } from '../../../services/application-response-service';
import { AcceptApplicationDialog } from '../../accept-application-dialog';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ErrorContainer } from '../../error-container';
import { ApplicationCardContent } from './card-content';
import { shouldDisableApplicationResponse } from '../../../libs/application-helper-functions';
import { useUserCreator } from '../../../hooks/use-ad-creator';

const styles = makeStyles({
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'space-between',
    gap: 1,
  },
  mainColor: {
    color: (theme) => theme.palette.primary.main,
  },
  list: {
    display: 'inline-block',
    width: '100%',
  },
});

interface Props {
  application: ApplicationDto;
  ad: JobOffer | undefined;
  applications: ApplicationDto[];
  applicationResponses: ApplicationResponseDto[];
  onChange: () => void;
}

export function ApplicationCard({
  application,
  ad,
  applications,
  applicationResponses,
  onChange,
}: Props) {
  if (!ad) {
    return null;
  }

  const [openAcceptDialog, setOpenAcceptDialog] = useState(false);
  const [openDeclineDialog, setOpenDeclineDialog] = useState(false);

  const { t } = useTranslation();

  const form = useForm<ApplicationResponseSchema>({
    defaultValues: {
      personNumber: 0,
      response: ApplicationResponse.Declined,
    },
    resolver: zodResolver(applicationResponseSchema),
  });

  const { trigger, loading, error } = useAsyncAction(
    async ({ signal }, applicationResponse: ApplicationResponseSchema) => {
      await applicationResponseService.create(
        toCreateApplicationResponseDto(application._id, applicationResponse),
        signal
      );

      onChange();
    }
  );

  const labelTypograpgyStyles = { ...styles.mainColor, pl: 1 };

  const applicationResponse = applicationResponses.find(
    ({ applicationId }) => applicationId === application._id
  );

  const disableReponding = shouldDisableApplicationResponse(
    ad,
    application,
    applications,
    applicationResponses
  );

  const onSubmit = form.handleSubmit(trigger);

  return (
    <FormProvider {...form}>
      <Card sx={styles.list}>
        <CardContent sx={styles.flexColumn}>
          <ApplicationCardContent application={application} ad={ad} />
        </CardContent>
        <CardActions>
          {applicationResponse?.response ? (
            <Typography sx={labelTypograpgyStyles}>
              {t(
                applicationResponseToTranslateKey[applicationResponse.response]
              )}
            </Typography>
          ) : (
            <>
              <Button
                size="small"
                sx={styles.mainColor}
                onClick={() => {
                  form.setValue('response', ApplicationResponse.Accepted);
                  setOpenAcceptDialog(true);
                }}
                disabled={disableReponding}
              >
                {t('accept')}
              </Button>
              <Button
                size="small"
                sx={styles.mainColor}
                onClick={() => {
                  form.setValue('response', ApplicationResponse.Declined);
                  setOpenDeclineDialog(true);
                }}
                disabled={disableReponding}
              >
                {t('decline')}
              </Button>
            </>
          )}
        </CardActions>
      </Card>

      {error ? <ErrorContainer>{error}</ErrorContainer> : null}

      <AcceptApplicationDialog
        open={openAcceptDialog}
        onSubmit={onSubmit}
        loading={loading}
        onClose={() => setOpenAcceptDialog(false)}
        personNumber={application.personNumber}
      />

      <ConfirmDialog
        open={openDeclineDialog}
        title={t('decline-application')}
        onConfirm={onSubmit}
        confirmLabel={t('decline')}
        confirmLoading={loading}
        onCancel={() => setOpenDeclineDialog(false)}
        cancelLabel={t('cancel')}
      >
        <Typography>{t('decline-application-question')}</Typography>
      </ConfirmDialog>
    </FormProvider>
  );
}
