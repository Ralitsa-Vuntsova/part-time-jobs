import { Box, Button, Typography } from '@mui/material';
import { makeStyles } from '../../../libs/make-styles';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { ApplicationDto, JobOfferDto } from '@shared/data-objects';
import { useUserCreator } from '../../../hooks/use-ad-creator';

const styles = makeStyles({
  flexRow: {
    display: 'flex',
    flexDirection: ['column', 'row'],
    gap: 1,
    alignItems: ['start', 'center'],
  },
  mainColor: {
    color: (theme) => theme.palette.primary.main,
  },
  secondaryColor: {
    color: (theme) => theme.palette.text.secondary,
  },
  link: {
    color: (theme) => theme.palette.text.secondary,
    textTransform: 'none',
    fontWeight: '400',
    fontSize: '0.875rem',
    letterSpacing: '0px',
    p: 0,
    textAlign: 'left',
  },
  button: {
    p: 0,
    textAlign: 'left',
  },
});

interface Props {
  ad: JobOfferDto;
  application: ApplicationDto;
}

export function ApplicationCardContent({ ad, application }: Props) {
  const [showEmail, setShowEmail] = useState(false);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);

  const navigate = useNavigate();
  const { t } = useTranslation();

  const user = useUserCreator(application.createdBy);

  const revealButtonStyles = { ...styles.mainColor, ...styles.button };

  return (
    <>
      <Typography gutterBottom variant="h5" component="div">
        {`${user?.firstName} ${user?.lastName}`}
      </Typography>

      {/* TODO [future]: Consider adding contacts */}
      <Box sx={styles.flexRow}>
        {showEmail ? (
          <Typography sx={styles.secondaryColor}>{user?.email}</Typography>
        ) : (
          <Button sx={revealButtonStyles} onClick={() => setShowEmail(true)}>
            {t('reveal-email')}
          </Button>
        )}

        {showPhoneNumber ? (
          <Typography sx={styles.secondaryColor}>
            {user?.phoneNumber ? user?.phoneNumber : t('no-phone')}
          </Typography>
        ) : (
          <Button
            sx={revealButtonStyles}
            onClick={() => setShowPhoneNumber(true)}
          >
            {t('reveal-phone-number')}
          </Button>
        )}
      </Box>

      <Box sx={styles.flexRow}>
        <Typography variant="body2" fontWeight={700} sx={styles.secondaryColor}>
          {t('name-of-ad')}
        </Typography>
        <Button
          sx={styles.link}
          onClick={() => navigate(`/seek-service-ads/${ad._id}`)}
        >
          {`${ad.name}`}
        </Button>
      </Box>

      <Box sx={styles.flexRow}>
        <Typography variant="body2" fontWeight={700} sx={styles.secondaryColor}>
          {`${t('number-people')}:`}
        </Typography>
        <Typography variant="body2" sx={styles.secondaryColor}>
          {application.personNumber}
        </Typography>
      </Box>

      <Box>
        <Typography variant="body2" fontWeight={700} sx={styles.secondaryColor}>
          {t('reason-for-applying')}
        </Typography>
        <Typography variant="body2" sx={styles.secondaryColor}>
          {application.reason}
        </Typography>
      </Box>
    </>
  );
}
