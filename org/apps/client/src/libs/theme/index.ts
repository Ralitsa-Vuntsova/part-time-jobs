import { createTheme, lighten } from '@mui/material/styles';
import { fontStyleOptions } from './font-styles';
import { palette } from './palette';
import { variants } from './typography-variants';

const baseTheme = createTheme({
  palette,
  typography: {
    ...fontStyleOptions,
    ...variants,
  },
});

export const theme = createTheme(baseTheme, {
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          '&.MuiPaper-rounded': {
            borderRadius: '10px',
            overflow: 'hidden',
          },

          '&.MuiTableContainer-root': {
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '10px',
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,

            '&.scrollable': {
              overflowX: 'auto',
            },

            '.MuiTableCell-root': {
              lineHeight: '17px',
            },

            '.MuiTableCell-head': {
              color: baseTheme.palette.primary.contrastText,
              backgroundColor: baseTheme.palette.primary.light,

              '&:not(:first-of-type)': {
                borderLeft: `2px solid ${baseTheme.palette.background.default}`,
              },
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          '&.rounded': {
            borderRadius: '16px',
          },
        },
        textSizeSmall: {
          color: baseTheme.palette.secondary.main,
          fontFamily: baseTheme.typography.fontFamily,
          fontWeight: baseTheme.typography.fontWeightBold,
          letterSpacing: '1.25px',
          lineHeight: '22px',
          textTransform: 'uppercase',
        },
        textSizeMedium: {
          color: baseTheme.palette.secondary.main,
        },
        textSizeLarge: {
          color: baseTheme.palette.secondary.main,
          fontFamily: baseTheme.typography.fontFamily,
          fontWeight: baseTheme.typography.fontWeightBold,
          letterSpacing: '1.25px',
          lineHeight: '26px',
          textTransform: 'uppercase',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          height: '40px',
          alignContent: 'center',
          '&.MuiInputBase-multiline': {
            height: 'auto',
          },
          '&.Mui-disabled': {
            backgroundColor: lighten(baseTheme.palette.info.main, 0.9),
          },
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: baseTheme.palette.action.active,
          },
          '.MuiInputBase-input': {
            paddingTop: 0,
            paddingBottom: 0,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: baseTheme.palette.text.secondary,
          fontFamily: baseTheme.typography.fontFamily,
          fontSize: '0.90rem',
          fontWeight: baseTheme.typography.fontWeightRegular,
          letterSpacing: '0px',
          lineHeight: '12px',
        },
        shrink: {
          lineHeight: '35px',
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          '&.Mui-expanded': {
            margin: 0,
          },
          '&.inline': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: '12px 45px 12px 45px',
          backgroundColor: baseTheme.palette.primary.contrastText,
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          backgroundColor: baseTheme.palette.secondary.main,
          minHeight: '40px',
          '&.Mui-expanded': {
            minHeight: '40px',
          },
          '& .MuiAccordionSummary-content': {
            margin: '10px 0',
          },
          '& .MuiAccordionSummary-content.Mui-expanded': {
            margin: '10px 0',
          },
        },
      },
    },
    MuiCollapse: {
      styleOverrides: {
        root: {
          '& .MuiSvgIcon-root': {
            height: '20px',
            width: '20px',
            color: baseTheme.palette.secondary.main,
            '&.disabled': {
              color: baseTheme.palette.action.disabled,
            },
          },
          '& .MuiFormLabel-root': {
            maxWidth: 'calc(100% - 50px)',
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: baseTheme.palette.text.primary,
          fontFamily: baseTheme.typography.fontFamily,
          fontWeight: baseTheme.typography.fontWeightRegular,
          letterSpacing: '0px',
          lineHeight: '20px',
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          color: baseTheme.palette.text.primary,
          fontFamily: baseTheme.typography.fontFamily,
          fontWeight: baseTheme.typography.fontWeightRegular,
          letterSpacing: '0px',
          lineHeight: '19px',
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          color: baseTheme.palette.text.primary,
          fontFamily: baseTheme.typography.fontFamily,
          fontSize: '1.25rem',
          fontWeight: baseTheme.typography.fontWeightRegular,
          letterSpacing: '0px',
          lineHeight: '20px',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: baseTheme.typography.fontFamily,
          fontSize: '0.813rem',
          fontWeight: baseTheme.typography.fontWeightRegular,
          letterSpacing: '0.16px',
          lineHeight: '18px',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          color: baseTheme.palette.text.primary,
          fontFamily: baseTheme.typography.fontFamily,
          fontSize: '0.625rem',
          fontWeight: baseTheme.typography.fontWeightRegular,
          letterSpacing: '0px',
          lineHeight: '14px',
          backgroundColor: baseTheme.palette.text.secondary,
        },
        arrow: {
          color: baseTheme.palette.text.secondary,
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          '.MuiTableCell-head': {
            fontWeight: '700',
          },
          '.MuiTableCell-body': variants.body2,
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:last-child td': {
            borderBottom: 0,
          },
          '&.cellsNoPadding': {
            '.MuiTableCell-root': { padding: 0 },
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          verticalAlign: 'top',
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          '.MuiAutocomplete-input.MuiInputBase-input': {
            paddingTop: 0,
            paddingBottom: 0,
          },
        },
      },
    },
  },
});
