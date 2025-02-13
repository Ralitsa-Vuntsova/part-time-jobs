import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { JobOffer, PersonalRatingDto, UserProfile } from '@shared/data-objects';
import { makeStyles } from '../../../libs/make-styles';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../../../hooks/use-current-user';
import { useServicePerformer } from '../../../hooks/use-service-performer';

const styles = makeStyles({
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'space-between',
    gap: 1,
  },
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
  list: {
    display: 'inline-block',
    width: '100%',
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
});

interface Props {
  rating: PersonalRatingDto;
  users: UserProfile[];
  ad: JobOffer | undefined;
}

export function RatingCard({ rating, users, ad }: Props) {
  const currentUser = useCurrentUser();

  const navigate = useNavigate();

  const { t } = useTranslation();

  if (!ad) {
    return null;
  }

  const adCreator = users.find(({ _id }) => _id === ad.createdBy);
  const servicePerformer = useServicePerformer(ad._id);

  // Gets the user which the rating was submitted for
  // TODO [future]: Consider storing the user id in the db
  const user =
    currentUser?._id === adCreator?._id ? servicePerformer : adCreator;

  return (
    <Card sx={styles.list}>
      <CardContent sx={styles.flexColumn}>
        {user && (
          <Box sx={styles.flexRow}>
            <Typography
              variant="body2"
              fontWeight={700}
              sx={styles.secondaryColor}
            >
              {t('user')}
            </Typography>
            <Typography variant="body2">
              {`${user.firstName} ${user.lastName}`}
            </Typography>
          </Box>
        )}

        <Box sx={styles.flexRow}>
          <Typography
            variant="body2"
            fontWeight={700}
            sx={styles.secondaryColor}
          >
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
          <Typography
            variant="body2"
            fontWeight={700}
            sx={styles.secondaryColor}
          >
            {`${t('comment')}:`}
          </Typography>
          <Typography variant="body2" sx={styles.secondaryColor}>
            {rating.comment}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
