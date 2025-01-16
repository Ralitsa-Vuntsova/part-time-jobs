import { Accordion, AccordionDetails, Typography } from '@mui/material';
import { AccordionSummaryWithLeftIcon } from '../../../components/accordion-summary-with-left-icon';
import { OfferInformationAccordion } from './offer-information-accordion';
import { AdType } from '../../../libs/ad-helper-functions';
import { ContactTable } from './contact-table';
import { JobOfferDto, ServiceOfferDto } from '@shared/data-objects';

interface Props {
  ad: JobOfferDto | ServiceOfferDto;
  type: AdType;
}

export function AdDetailsContent({ ad, type }: Props) {
  return (
    <>
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
    </>
  );
}
