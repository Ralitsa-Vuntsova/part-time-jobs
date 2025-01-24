import { Box, Typography } from '@mui/material';
import { FormattedDate } from '../../../components/formatted-date';
import { DateFormats } from '../../../libs/dates';
import { makeStyles } from '../../../libs/make-styles';
import { JobOfferDto, ServiceOfferDto } from '@shared/data-objects';
import { useTranslation } from 'react-i18next';

const styles = makeStyles({
  flexRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: 1,
    '& .MuiTypography-root': {
      color: (theme) => theme.palette.info.main,
    },
  },
});

interface Props {
  ad: JobOfferDto | ServiceOfferDto;
}

export function AdDetailsFooter({ ad }: Props) {
  const { t } = useTranslation();

  return (
    <>
      <Box sx={styles.flexRow}>
        <Typography>{t('created')}</Typography>
        <FormattedDate variant="body1" format={DateFormats.Preview}>
          {ad.createdAt}
        </FormattedDate>
      </Box>

      {ad.updatedAt && (
        <Box sx={styles.flexRow}>
          <Typography>{t('updated')}</Typography>
          <FormattedDate variant="body1" format={DateFormats.Preview}>
            {ad.updatedAt}
          </FormattedDate>
        </Box>
      )}
    </>
  );
}
