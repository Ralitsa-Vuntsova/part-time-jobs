import createPalette from '@mui/material/styles/createPalette';

export const palette = createPalette({
  primary: {
    main: '#0065AC',
    light: '#4586f5',
    dark: '#002C77',
    contrastText: '#FFFFFF', // white
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
    main: '#C53532', // red
    light: '#EF4E45',
    dark: '#9A1C1F',
    contrastText: '#FFFFFF',
  },
  warning: {
    main: '#FFBE00', // yellow
    light: '#FFD240',
    dark: '#C98600',
    contrastText: '#FFFFFF',
  },
  info: {
    main: '#8096B2', // gray-blue
    light: '#A2B7CD',
    dark: '#627798',
    contrastText: '#FFFFFF',
  },
  success: {
    main: '#14853D', // green
    light: '#00AC41',
    dark: '#275D38',
    contrastText: '#FFFFFF',
  },
  text: {
    primary: '#202020DE', // gray-black
    secondary: '#202028AE', // light gray
    disabled: '#20202861', // light gray
  },
  action: {
    active: '#2020203B', // light gray
    hover: '#2020200A', // almost white
    selected: '#20202014', // almost white
    disabled: '#20202042', // light gray
    disabledBackground: '#2020201F', // light gray
  },
  background: {
    default: '#F0F0F0', // almost white
    paper: '#E8E8E8', // light gray
  },
  divider: '#2020201F', // light gray
  contrastThreshold: 3,
  tonalOffset: 0.2,
});
