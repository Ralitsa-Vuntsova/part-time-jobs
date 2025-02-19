import { Box, Button, Divider, Rating, Typography } from '@mui/material';
import { makeStyles } from '../../../libs/make-styles';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { ApplicationDto, JobOfferDto } from '@shared/data-objects';
import { useUserRating } from '../../../hooks/use-user-rating';

const styles = makeStyles({
  flexRow: {
    display: 'flex',
    flexDirection: ['column', 'row'],
    gap: 1,
    alignItems: ['start', 'center'],
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
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
  rating: {
    fontStyle: 'italic',
    fontSize: '0.875rem',
  },
});

interface Props {
  ad: JobOfferDto;
  application: ApplicationDto;
}

export function ApplicationCardContent({ ad, application }: Props) {
  const [showEmail, setShowEmail] = useState(false);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const navigate = useNavigate();
  const { t } = useTranslation();

  const { user, averageRating, ratings } = useUserRating(application.createdBy);

  const revealButtonStyles = { ...styles.mainColor, ...styles.button };

  if (!user) {
    return null;
  }

  return (
    <Box sx={styles.flexColumn}>
      <Typography gutterBottom variant="h5" component="div">
        {`${user.firstName} ${user.lastName}`}
      </Typography>

      {/* TODO [future]: Consider adding contacts instead of user profile data */}
      <Box sx={styles.flexRow}>
        {showEmail ? (
          <Typography sx={styles.secondaryColor}>{user.email}</Typography>
        ) : (
          <Button sx={revealButtonStyles} onClick={() => setShowEmail(true)}>
            {t('reveal-email')}
          </Button>
        )}

        {showPhoneNumber ? (
          <Typography sx={styles.secondaryColor}>
            {user.phoneNumber ? user.phoneNumber : t('no-phone')}
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

      {ratings.length > 0 && (
        <Box sx={styles.flexRow}>
          {/* TODO [future]: Display how many people rated */}
          <Rating value={averageRating} readOnly />
          <Button
            size="small"
            sx={styles.mainColor}
            onClick={() => setShowFeedback(!showFeedback)}
          >
            {showFeedback ? t('hide-feedback') : t('show-feedback')}
          </Button>
        </Box>
      )}

      {/* TODO [future]: Add button Show more */}
      {showFeedback &&
        ratings.slice(0, 5).map((r) => (
          // TODO [future]: Display the name of the person who rated
          <Box key={r._id}>
            <Typography sx={styles.rating}>{r.comment}</Typography>
            <Divider />
          </Box>
        ))}
    </Box>
  );
}
