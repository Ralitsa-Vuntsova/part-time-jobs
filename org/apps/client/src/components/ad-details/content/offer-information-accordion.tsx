import { Accordion, AccordionDetails, Box, Typography } from '@mui/material';
import { JobOfferDto } from '@shared/data-objects';
import { AccordionSummary } from '../../accordion-summary';
import { LabeledControl } from '../../labeled-control';
import { makeStyles } from '../../../libs/make-styles';
import { useTranslation } from 'react-i18next';
import { paymentToTranslateKey } from '@shared/enums';

const styles = makeStyles({
  input: {
    width: '100%',
  },
  smallInput: {
    width: ['100%', '50%'],
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
  },
  responsiveFlexRow: {
    display: 'flex',
    flexDirection: ['column', null, null, 'row'],
    gap: 2,
  },
});

interface Props {
  ad: JobOfferDto;
}

export function OfferInformationAccordion({ ad }: Props) {
  const { t } = useTranslation();

  return (
    <Accordion defaultExpanded>
      <AccordionSummary>
        <Typography>{t('offer-information')}</Typography>
      </AccordionSummary>
      <AccordionDetails sx={styles.flexColumn}>
        <LabeledControl
          label={t('date-and-time')}
          detailedLabel={t('date-and-time-question')}
          sx={styles.input}
        >
          <Typography>{ad.dateTime}</Typography>
        </LabeledControl>

        <LabeledControl
          label={t('location')}
          detailedLabel={t('location-question')}
          sx={styles.input}
        >
          <Typography>{ad.location}</Typography>
        </LabeledControl>

        <Box sx={styles.responsiveFlexRow}>
          <LabeledControl
            label={t('number-people')}
            detailedLabel={t('number-people-question')}
            sx={styles.smallInput}
          >
            <Typography>
              {ad.personNumber.notSure ? t('not-sure') : ad.personNumber.value}
            </Typography>
          </LabeledControl>

          <LabeledControl
            label={t('qualification')}
            detailedLabel={t('qualification-question')}
            sx={styles.input}
          >
            <Typography>{ad.qualification}</Typography>
          </LabeledControl>
        </Box>

        <LabeledControl
          label={t('duration')}
          detailedLabel={t('duration-question')}
          sx={styles.input}
        >
          <Typography>{ad.duration}</Typography>
        </LabeledControl>

        <Box sx={styles.responsiveFlexRow}>
          {ad.urgency && (
            <LabeledControl
              label={t('urgency')}
              detailedLabel={t('urgency-question')}
              sx={styles.input}
            >
              <Typography>{ad.urgency}</Typography>
            </LabeledControl>
          )}

          {ad.difficulty && (
            <LabeledControl
              label={t('difficulty')}
              detailedLabel={t('difficulty-question')}
              sx={styles.input}
            >
              <Typography>{ad.difficulty}</Typography>
            </LabeledControl>
          )}
        </Box>

        <LabeledControl
          label={t('price')}
          detailedLabel={t('price-question')}
          sx={styles.input}
        >
          <Box sx={styles.responsiveFlexRow}>
            {ad.price.byNegotiation ? (
              <Typography>{t('by-negotiation')}</Typography>
            ) : (
              <>
                <Typography>{ad.price.value}</Typography>
                <Typography>{ad.price.currency}</Typography>
                <Typography>
                  {t(paymentToTranslateKey[ad.price.payment])}
                </Typography>
              </>
            )}
          </Box>
        </LabeledControl>
      </AccordionDetails>
    </Accordion>
  );
}
