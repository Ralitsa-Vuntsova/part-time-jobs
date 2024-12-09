import { Accordion, AccordionDetails, Box, Typography } from '@mui/material';
import { JobOfferDto, ServiceOfferDto } from '@shared/data-objects';
import { makeStyles } from '../../../libs/make-styles';
import { AccordionSummaryWithLeftIcon } from '../../../components/accordion-summary-with-left-icon';
import { ContactTable } from './contact-table';
import { OfferInformationAccordion } from './offer-information-accordion';
import { AdType } from '../../../libs/ad-type';
import { DateFormats } from '../../../libs/dates';
import { FormattedDate } from '../../../components/formatted-date';

const styles = makeStyles({
  header: {
    paddingBottom: 2,
    textAlign: 'center',
    color: (theme) => theme.palette.primary.main,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
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
  type: AdType;
}

// TODO: Ad creator + option do visit profile
// TODO: Button Apply
export function AdDetails({ ad, type }: Props) {
  return (
    <>
      <Typography variant="h3" sx={styles.header}>
        {ad.name}
      </Typography>

      <Box sx={styles.flexColumn}>
        <Accordion defaultExpanded>
          <AccordionSummaryWithLeftIcon>
            <Typography>Description</Typography>
          </AccordionSummaryWithLeftIcon>
          <AccordionDetails>
            <Typography>{ad.description}</Typography>
          </AccordionDetails>
        </Accordion>

        {type === AdType.Job && (
          <OfferInformationAccordion ad={ad as JobOfferDto} />
        )}

        <Accordion defaultExpanded>
          <AccordionSummaryWithLeftIcon>
            <Typography>Contacts</Typography>
          </AccordionSummaryWithLeftIcon>
          <AccordionDetails>
            <ContactTable contacts={ad.contacts} />
          </AccordionDetails>
        </Accordion>

        {ad.additionalInformation && (
          <Accordion defaultExpanded>
            <AccordionSummaryWithLeftIcon>
              <Typography>Additional Information</Typography>
            </AccordionSummaryWithLeftIcon>
            <AccordionDetails>
              <Typography>{ad.additionalInformation}</Typography>
            </AccordionDetails>
          </Accordion>
        )}

        <Box sx={styles.flexRow}>
          <Typography>Created:</Typography>
          <FormattedDate format={DateFormats.Preview}>
            {ad.createdAt}
          </FormattedDate>
        </Box>

        {ad.updatedAt && (
          <Box sx={styles.flexRow}>
            <Typography>Last Updated:</Typography>
            <FormattedDate format={DateFormats.Preview}>
              {ad.updatedAt}
            </FormattedDate>
          </Box>
        )}
      </Box>
    </>
  );
}
