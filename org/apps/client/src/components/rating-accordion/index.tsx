import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Rating,
  Typography,
} from '@mui/material';
import { PublicRatingDto } from '@shared/data-objects';
import { makeStyles } from '../../libs/make-styles';
import { useTranslation } from 'react-i18next';

const styles = makeStyles({
  accordion: {
    width: '50%',
    alignSelf: 'center',
    '& .MuiAccordionSummary-root': {
      bgcolor: (theme) => theme.palette.info.light,
    },
  },
  summary: {
    textTransform: 'uppercase',
    fontWeight: 700,
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 1,
  },
});

interface Props {
  ratings: PublicRatingDto[];
  expanded?: boolean;
}

export function RatingAccordion({ ratings, expanded = false }: Props) {
  const { t } = useTranslation();

  return (
    <Accordion defaultExpanded={expanded} sx={styles.accordion}>
      <AccordionSummary sx={styles.summary}>{t('feedback')}</AccordionSummary>

      <AccordionDetails sx={styles.flexColumn}>
        {/* TODO [future]: Add button Show more */}
        {ratings.slice(0, 30).map((r) => (
          <Box key={r._id} sx={styles.flexColumn}>
            <Box sx={styles.flexColumn}>
              {/* TODO [future]: Display how many people rated, the name of the person who rated */}
              <Rating value={r.rateValue} readOnly />
              <Typography>{r.comment}</Typography>
            </Box>

            <Divider />
          </Box>
        ))}
      </AccordionDetails>
    </Accordion>
  );
}
