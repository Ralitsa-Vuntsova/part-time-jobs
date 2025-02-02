import { Button, Typography } from '@mui/material';
import { ArchiveReason } from '@shared/enums';
import { makeStyles } from '../../../libs/make-styles';
import { useTranslation } from 'react-i18next';

const styles = makeStyles({
  button: {
    maxWidth: 'fit-content',
    alignSelf: 'center',
  },
  typography: {
    color: (theme) => theme.palette.primary.main,
    alignSelf: 'center',
  },
});

interface Props {
  archiveReason?: ArchiveReason;
  alreadyApplied: boolean;
  onEdit: () => void;
  onArchive: () => void;
  onUnarchive: () => void;
}

export function HeaderButtons({
  archiveReason,
  alreadyApplied,
  onEdit,
  onArchive,
  onUnarchive,
}: Props) {
  const { t } = useTranslation();

  return (
    <>
      <Button
        variant="contained"
        sx={styles.button}
        onClick={onEdit}
        disabled={!!archiveReason || alreadyApplied}
      >
        {t('edit')}
      </Button>

      {!!archiveReason && archiveReason === ArchiveReason.Done && (
        <Typography sx={styles.typography}>{t('completed')}</Typography>
      )}

      {!!archiveReason && archiveReason === ArchiveReason.Unpublishing && (
        <Button variant="outlined" sx={styles.button} onClick={onUnarchive}>
          {t('unarchive')}
        </Button>
      )}

      {!archiveReason && (
        <Button variant="outlined" sx={styles.button} onClick={onArchive}>
          {t('archive')}
        </Button>
      )}
    </>
  );
}
