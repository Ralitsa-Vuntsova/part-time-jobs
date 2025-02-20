import { Box, Button, Typography } from '@mui/material';
import { ArchiveReason } from '@shared/enums';
import { makeStyles } from '../../../libs/make-styles';
import { useTranslation } from 'react-i18next';
import { useAdAcceptedApplications } from '../../../hooks/use-ad-application-responses';
import { JobOfferDto, ServiceOfferDto } from '@shared/data-objects';

const styles = makeStyles({
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
    alignItems: 'center',
  },
  flexRow: {
    display: 'flex',
    flexDirection: ['column', 'row'],
    gap: 1,
  },
  button: {
    color: (theme) => theme.palette.primary.main,
  },
  typography: {
    color: (theme) => theme.palette.primary.main,
    alignSelf: 'center',
  },
});

interface Props {
  ad: JobOfferDto | ServiceOfferDto;
  alreadyApplied: boolean;
  onEdit: () => void;
  onArchive: () => void;
  onUnarchive: () => void;
  onPrivateRate: () => void;
  onPublicRate: () => void;
}

export function HeaderButtons({
  ad,
  alreadyApplied,
  onEdit,
  onArchive,
  onUnarchive,
  onPrivateRate,
  onPublicRate,
}: Props) {
  const { t } = useTranslation();

  const adAcceptedApplications = useAdAcceptedApplications(ad._id);

  return (
    <Box sx={styles.flexColumn}>
      <Box sx={styles.flexRow}>
        <Button
          variant="contained"
          onClick={onEdit}
          disabled={!!ad.archiveReason || alreadyApplied}
        >
          {t('edit')}
        </Button>

        {ad.archiveReason === ArchiveReason.Done && (
          <Typography sx={styles.typography}>{t('completed')}</Typography>
        )}

        {ad.archiveReason === ArchiveReason.Unpublishing && (
          <Button variant="outlined" onClick={onUnarchive}>
            {t('unarchive')}
          </Button>
        )}

        {!ad.archiveReason && (
          <Button variant="outlined" onClick={onArchive}>
            {t('archive')}
          </Button>
        )}
      </Box>

      {ad.archiveReason === ArchiveReason.Done &&
        !!adAcceptedApplications?.length && (
          <Box sx={styles.flexRow}>
            <Button size="small" onClick={onPublicRate} sx={styles.button}>
              {t('add-public-rating')}
            </Button>

            <Button size="small" onClick={onPrivateRate} sx={styles.button}>
              {t('add-personal-rating')}
            </Button>
          </Box>
        )}
    </Box>
  );
}
