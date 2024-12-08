import { TypographyOwnProps, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { DateFormats } from '../../libs/dates';

interface Props {
  children: string | undefined;
  variant?: TypographyOwnProps['variant'];
  format?: string;
}

export function FormattedDate({
  children,
  variant = 'body2',
  format = DateFormats.Preview,
}: Props) {
  if (!children) {
    return null;
  }

  return (
    <Typography variant={variant}>{dayjs(children).format(format)}</Typography>
  );
}
