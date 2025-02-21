import { Box, Rating, Typography } from '@mui/material';
import { FormattedDate } from '../../formatted-date';
import { DateFormats } from '../../../libs/dates';
import { makeStyles } from '../../../libs/make-styles';
import { JobOfferDto, ServiceOfferDto } from '@shared/data-objects';
import { useTranslation } from 'react-i18next';
import { useUserRating } from '../../../hooks/use-user-rating';
import { RatingAccordion } from '../../rating-accordion';

const styles = makeStyles({
  flexRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: 1,
    '& .MuiTypography-root': {
      color: (theme) => theme.palette.info.main,
    },
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 1,
  },
});

interface Props {
  ad: JobOfferDto | ServiceOfferDto;
}

// TODO: Translate dates
export function AdDetailsFooter({ ad }: Props) {
  const { t } = useTranslation();

  const { user, averageRating, ratings } = useUserRating(ad.createdBy);

  return (
    <>
      {ad.updatedAt && (
        <Box sx={styles.flexRow}>
          <Typography>{t('updated')}</Typography>
          <FormattedDate variant="body1" format={DateFormats.Preview}>
            {ad.updatedAt}
          </FormattedDate>
        </Box>
      )}

      <Box sx={styles.flexRow}>
        <Typography>{t('created')}</Typography>
        <FormattedDate variant="body1" format={DateFormats.Preview}>
          {ad.createdAt}
        </FormattedDate>
      </Box>

      {user && (
        <>
          <Box sx={styles.flexRow}>
            <Typography>{t('created-by')}</Typography>
            <Typography>{`${user?.firstName} ${user?.lastName}`}</Typography>
          </Box>

          {ratings.length > 0 && (
            <Box sx={styles.flexColumn}>
              <Rating value={averageRating} readOnly />
              <RatingAccordion ratings={ratings} />
            </Box>
          )}
        </>
      )}
    </>
  );
}
