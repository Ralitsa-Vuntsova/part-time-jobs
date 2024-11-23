import createPalette from '@mui/material/styles/createPalette';

export const palette = createPalette({
  primary: {
    main: '#002C77',
    light: '#0065AC',
    dark: '#001F52',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#009de0',
    light: '#3BB8F0',
    dark: '#0065AC',
    100: '#F5F5F5',
    200: '#E3F2FD',
    contrastText: '#FFFFFF',
  },
  error: {
    main: '#C53532',
    light: '#EF4E45',
    dark: '#9A1C1F',
    contrastText: '#FFFFFF',
  },
  warning: {
    main: '#FFBE00',
    light: '#FFD240',
    dark: '#C98600',
    contrastText: '#202020DE',
  },
  info: {
    main: '#8096B2',
    light: '#A2B7CD',
    dark: '#627798',
    contrastText: '#FFFFFF',
  },
  success: {
    main: '#14853D',
    light: '#00AC41',
    dark: '#275D38',
    contrastText: '#FFFFFF',
  },
  text: {
    primary: 'rgba(32, 32, 32, 0.87)',
    secondary: 'rgba(32, 32, 32, 0.54)',
    disabled: 'rgba(32, 32, 32, 0.38)',
  },
  action: {
    active: 'rgba(32, 32, 32, 0.23)',
    hover: 'rgba(32, 32, 32, 0.04)',
    selected: 'rgba(32, 32, 32, 0.08)',
    disabled: 'rgba(32, 32, 32, 0.26)',
    disabledBackground: 'rgba(32, 32, 32, 0.12)',
  },
  background: {
    default: 'rgba(240, 240, 240, 1)',
    paper: 'rgba(255, 255, 255, 1)',
  },
  divider: 'rgba(32, 32, 32, 0.12)',
  contrastThreshold: 3,
  tonalOffset: 0.2,
});
