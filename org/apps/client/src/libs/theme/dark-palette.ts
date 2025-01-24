import createPalette from '@mui/material/styles/createPalette';
import { basePalette } from './base-palette';

export const darkPalette = createPalette({
  mode: 'dark',
  primary: {
    main: '#072946', // dark blue
    light: '#0E528D',
    dark: '#020910',
    contrastText: '#FFFFFF', // white
  },
  secondary: {
    main: '#0e528d', // dark blue
    light: '#3094EA',
    dark: '#0C4475',
    contrastText: '#FFFFFF',
  },
  background: {
    default: '#D7D7D7', // very light gray
    paper: '#DBDBDB', // light gray
  },
  text: {
    primary: '#202020', // almost black
    secondary: '#2d2d2d', // almost black
    disabled: '#20202861', // light gray
  },
  ...basePalette,
});
