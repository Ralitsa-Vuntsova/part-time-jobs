import { useTheme, useMediaQuery } from '@mui/material';

export enum Breakpoint {
  XS,
  SM,
  MD,
  LG,
  XL,
}

export function useResponsive(): Breakpoint {
  const { breakpoints } = useTheme();
  const xs = useMediaQuery(breakpoints.only('xs'));
  const sm = useMediaQuery(breakpoints.only('sm'));
  const md = useMediaQuery(breakpoints.only('md'));
  const lg = useMediaQuery(breakpoints.only('lg'));

  if (xs) {
    return Breakpoint.XS;
  }

  if (sm) {
    return Breakpoint.SM;
  }

  if (md) {
    return Breakpoint.MD;
  }

  if (lg) {
    return Breakpoint.LG;
  }

  return Breakpoint.XL;
}
