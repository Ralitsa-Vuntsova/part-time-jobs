import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import { JobOfferDto, ServiceOfferDto } from '@shared/data-objects';
import { makeStyles } from '../../../libs/make-styles';
import { useNavigate } from 'react-router-dom';
import { AdType } from '../../../libs/ad-helper-functions';
import { useTranslation } from 'react-i18next';

const styles = makeStyles({
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'space-between',
  },
  mainColor: {
    color: (theme) => theme.palette.primary.main,
  },
  grayColor: {
    color: (theme) => theme.palette.info.main,
  },
  grid: {
    maxWidth: 345,
    '& .MuiTypography-root': {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      overflowWrap: 'anywhere',
    },
  },
  list: {
    display: 'inline-block',
    width: '100%',
  },
});

interface Props {
  ad: JobOfferDto | ServiceOfferDto;
  isGrid: boolean;
  type: AdType;
}

export function AdCard({ ad, isGrid, type }: Props) {
  const navigate = useNavigate();

  const { t } = useTranslation();

  const cardStyles = isGrid ? styles.grid : styles.list;

  return (
    <Card sx={cardStyles}>
      <CardContent sx={styles.flexColumn}>
        <Typography gutterBottom variant="h5" component="div">
          {ad.name}
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {ad.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          sx={styles.mainColor}
          onClick={() =>
            navigate(
              type === AdType.Job
                ? `/seek-service-ads/${ad._id}`
                : `/offer-service-ads/${ad._id}`
            )
          }
        >
          {t('learn-more')}
        </Button>
        {!!ad.archiveReason && (
          <Typography sx={styles.grayColor}>{t('archived')}</Typography>
        )}
      </CardActions>
    </Card>
  );
}
