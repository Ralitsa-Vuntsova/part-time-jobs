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
import { useState } from 'react';
import { PersonalRatingDialog } from '../../personal-rating-dialog';
import { ArchiveReason } from '@shared/enums';
import { PrivateRatingDialog } from '../../public-rating-dialog';

const styles = makeStyles({
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'space-between',
  },
  flexRow: {
    display: 'flex',
    flexDirection: ['column', 'row'],
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
  isAccomplishment?: boolean;
}

export function AdCard({ ad, isGrid, type, isAccomplishment = false }: Props) {
  const [openPersonalRatingDialog, setOpenPersonalRatingDialog] =
    useState(false);
  const [openPublicRatingDialog, setOpenPublicRatingDialog] = useState(false);

  const navigate = useNavigate();

  const { t } = useTranslation();

  const cardStyles = isGrid ? styles.grid : styles.list;

  return (
    <>
      <Card sx={cardStyles}>
        <CardContent sx={styles.flexColumn}>
          <Typography gutterBottom variant="h5" component="div">
            {ad.name}
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {ad.description}
          </Typography>
        </CardContent>
        <CardActions sx={isGrid ? styles.flexColumn : styles.flexRow}>
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

          {(ad.archiveReason === ArchiveReason.Done && !isAccomplishment) ||
            (isAccomplishment && (
              <>
                <Button
                  size="small"
                  sx={styles.mainColor}
                  onClick={() => setOpenPublicRatingDialog(true)}
                >
                  {t('add-public-rating')}
                </Button>

                <Button
                  size="small"
                  sx={styles.mainColor}
                  onClick={() => setOpenPersonalRatingDialog(true)}
                >
                  {t('add-personal-rating')}
                </Button>
              </>
            ))}

          {!isAccomplishment && !!ad.archiveReason && (
            <Typography sx={styles.grayColor}>{t('archived')}</Typography>
          )}
        </CardActions>
      </Card>

      <PersonalRatingDialog
        open={openPersonalRatingDialog}
        onClose={() => setOpenPersonalRatingDialog(false)}
        ad={ad as JobOfferDto}
      />

      <PrivateRatingDialog
        open={openPublicRatingDialog}
        onClose={() => setOpenPublicRatingDialog(false)}
        ad={ad as JobOfferDto}
      />
    </>
  );
}
