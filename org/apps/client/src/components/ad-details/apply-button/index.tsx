import { Box, Button, Typography } from '@mui/material';
import { ApplyDialog } from './apply-dialog';
import { FormattedDate } from '../../formatted-date';
import { ApplicationDto, JobOfferDto } from '@shared/data-objects';
import { AdType } from '../../../libs/ad-helper-functions';
import { DateFormats } from '../../../libs/dates';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '../../../libs/make-styles';

const styles = makeStyles({
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
  openApplyDialog: boolean;
  application?: ApplicationDto;
  onApply: () => void;
  onClose: () => void;
  onChange: () => void;
  ad: JobOfferDto;
}

export function ApplyButton({
  openApplyDialog,
  application,
  onApply,
  onClose,
  onChange,
  ad,
}: Props) {
  const { t } = useTranslation();

  return (
    <>
      <Button
        variant="contained"
        sx={styles.button}
        onClick={onApply}
        disabled={!!application}
      >
        {t('apply')}
      </Button>

      {!!application && (
        <Box sx={styles.flexRow}>
          <Typography>{t('already-applied')}</Typography>
          <FormattedDate variant="body1" format={DateFormats.Preview}>
            {application.createdAt}
          </FormattedDate>
        </Box>
      )}

      <ApplyDialog
        open={openApplyDialog}
        onClose={onClose}
        ad={ad}
        onChange={onChange}
      />
    </>
  );
}
