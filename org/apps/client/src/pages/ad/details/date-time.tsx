import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { makeStyles } from '../../../libs/make-styles';
import { Box, Typography } from '@mui/material';
import { FormattedDate } from '../../../components/formatted-date';
import { DateFormats } from '../../../libs/dates';
import { DateTimeDto } from '@shared/data-objects';

const styles = makeStyles({
  box: {
    display: 'flex',
    flexDirection: ['column', 'row'],
    gap: 2,
  },
});

interface Props {
  dateTime: DateTimeDto;
  index: number;
}

export function DateTime({ dateTime, index }: Props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={styles.box}>
        <Typography>{`Option ${index + 1}:`}</Typography>
        <FormattedDate variant="body1" format={DateFormats.Preview}>
          {dateTime.date}
        </FormattedDate>
        <Typography>{dateTime.time}</Typography>
      </Box>
    </LocalizationProvider>
  );
}
