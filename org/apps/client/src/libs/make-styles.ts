import { SxProps, Theme } from '@mui/material';
type StylesDict<T> = Record<keyof T, SxProps<Theme>>;

export const makeStyles = <T>(sx: StylesDict<T>): StylesDict<T> => sx;

interface MakeBorderOptions {
  side?: 'Top' | 'Left' | 'Bottom' | 'Right' | '';
  width?: string;
  color?: string;
}

export const makeBorder = ({
  side = '',
  width = '1px',
  color = 'divider',
}: MakeBorderOptions) => ({
  [`border${side}Style`]: 'solid',
  [`border${side}Width`]: width,
  [`border${side}Color`]: color,
});
