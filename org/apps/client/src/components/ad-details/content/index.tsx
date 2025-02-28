import { Accordion, AccordionDetails, Typography } from '@mui/material';
import { AccordionSummary } from '../../accordion-summary';
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
        <AccordionSummary>
          <Typography>{t('description')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{ad.description}</Typography>
        </AccordionDetails>
      </Accordion>

      {type === AdType.Job && (
        <OfferInformationAccordion ad={ad as JobOfferDto} />
      )}

      <Accordion defaultExpanded>
        <AccordionSummary>
          <Typography>{t('contacts')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ContactTable contacts={ad.contacts} />
        </AccordionDetails>
      </Accordion>

      {ad.additionalInformation && (
        <Accordion defaultExpanded>
          <AccordionSummary>
            <Typography>{t('additional-information')}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{ad.additionalInformation}</Typography>
          </AccordionDetails>
        </Accordion>
      )}
    </>
  );
}
