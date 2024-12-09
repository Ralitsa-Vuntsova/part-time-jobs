import { Accordion, AccordionDetails, Box, Typography } from '@mui/material';
import { JobOfferDto } from '@shared/data-objects';
import { AccordionSummaryWithLeftIcon } from '../../../components/accordion-summary-with-left-icon';
import { LabeledControl } from '../../../components/labeled-control';
import { makeStyles } from '../../../libs/make-styles';
import { DateTime } from './date-time';

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
  return (
    <Accordion defaultExpanded>
      <AccordionSummaryWithLeftIcon>
        <Typography>Offer Information</Typography>
      </AccordionSummaryWithLeftIcon>
      <AccordionDetails sx={styles.flexColumn}>
        <LabeledControl label="When should the service be performed (select three options)?">
          <Box sx={styles.flexColumn}>
            {ad.dateTime.map((dt, index) => (
              <DateTime
                key={`${dt.date}-${dt.time}-${index}`}
                dateTime={dt}
                index={index}
              />
            ))}
          </Box>
        </LabeledControl>

        <LabeledControl
          label="Where should the service be performed?"
          sx={styles.input}
        >
          <Typography>{ad.location}</Typography>
        </LabeledControl>

        <Box sx={styles.responsiveFlexRow}>
          <LabeledControl
            label="How many people are needed for the service to be performed?"
            sx={styles.smallInput}
          >
            <Typography>{ad.personNumber}</Typography>
          </LabeledControl>

          <LabeledControl
            label="What qualification is needed for the service to be performed?"
            sx={styles.input}
          >
            <Typography>{ad.qualification}</Typography>
          </LabeledControl>
        </Box>

        <LabeledControl
          label="How long does the service take to perform?"
          sx={styles.input}
        >
          <Typography>{ad.duration}</Typography>
        </LabeledControl>

        <Box sx={styles.responsiveFlexRow}>
          <LabeledControl label="How urgent is the service?" sx={styles.input}>
            <Typography>{ad.urgency}</Typography>
          </LabeledControl>

          <LabeledControl
            label="How difficult is the service?"
            sx={styles.input}
          >
            <Typography>{ad.difficulty}</Typography>
          </LabeledControl>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
