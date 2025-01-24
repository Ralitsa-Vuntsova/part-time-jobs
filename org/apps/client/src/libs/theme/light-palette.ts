import createPalette from '@mui/material/styles/createPalette';
import { basePalette } from './base-palette';

export const lightPalette = createPalette({
  mode: 'light',
  primary: {
    main: '#1167B1', // blue
    light: '#66B1F2',
    dark: '#03254C',
    contrastText: '#FFFFFF', // white
  },
  secondary: {
    main: '#E3F2FD', // blue-gray
    light: '#F5F5F5',
    dark: '#2B548A',
    contrastText: '#FFFFFF',
  },
  background: {
    default: '#F0F0F0', // almost white
    paper: '#E8E8E8', // light gray
  },
  text: {
    primary: '#202020DE', // gray-black
    secondary: '#202028AE', // light gray
    disabled: '#20202861', // light gray
  },
  ...basePalette,
});
