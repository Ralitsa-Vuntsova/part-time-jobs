import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { makeStyles } from '../../../libs/make-styles';
import { AdType } from '../../../libs/ad-helper-functions';
import {
  JobOfferDto,
  ServiceOfferDto,
  UserProfile,
} from '@shared/data-objects';
import { EditJobOfferForm } from './job-form';
import { EditServiceOfferForm } from './service-form';
import { useTranslation } from 'react-i18next';

const styles = makeStyles({
  title: {
    color: (theme) => theme.palette.primary.main,
  },
});

interface Props {
  open: boolean;
  ad: JobOfferDto | ServiceOfferDto;
  userData: UserProfile;
  type: AdType;
  onClose: () => void;
  onChange: () => void;
}

export function EditAdDialog({
  open,
  ad,
  userData,
  type,
  onClose,
  onChange,
}: Props) {
  const { t } = useTranslation();

  return (
    <Dialog open={open} maxWidth="lg" onClose={onClose}>
      <DialogTitle sx={styles.title}>{t('edit-ad')}</DialogTitle>

      <DialogContent>
        {type === AdType.Job ? (
          <EditJobOfferForm
            ad={ad as JobOfferDto}
            userData={userData}
            onClose={onClose}
            onChange={onChange}
          />
        ) : (
          <EditServiceOfferForm
            ad={ad}
            userData={userData}
            onClose={onClose}
            onChange={onChange}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
