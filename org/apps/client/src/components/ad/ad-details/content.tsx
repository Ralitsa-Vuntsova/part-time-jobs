import { Accordion, AccordionDetails, Typography } from '@mui/material';
import { AccordionSummaryWithLeftIcon } from '../../accordion-summary-with-left-icon';
import { OfferInformationAccordion } from './offer-information-accordion';
import { AdType } from '../../../libs/ad-helper-functions';
import { ContactTable } from './contact-table';
import { JobOfferDto, ServiceOfferDto } from '@shared/data-objects';
import { useTranslation } from 'react-i18next';

interface Props {
  ad: JobOfferDto | ServiceOfferDto;
  type: AdType;
}

export function AdDetailsContent({ ad, type }: Props) {
  const { t } = useTranslation();

  return (
    <>
      <Accordion defaultExpanded>
        <AccordionSummaryWithLeftIcon>
          <Typography>{t('description')}</Typography>
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
          <Typography>{t('contacts')}</Typography>
        </AccordionSummaryWithLeftIcon>
        <AccordionDetails>
          <ContactTable contacts={ad.contacts} />
        </AccordionDetails>
      </Accordion>

      {ad.additionalInformation && (
        <Accordion defaultExpanded>
          <AccordionSummaryWithLeftIcon>
            <Typography>{t('additional-information')}</Typography>
          </AccordionSummaryWithLeftIcon>
          <AccordionDetails>
            <Typography>{ad.additionalInformation}</Typography>
          </AccordionDetails>
        </Accordion>
      )}
    </>
  );
}
