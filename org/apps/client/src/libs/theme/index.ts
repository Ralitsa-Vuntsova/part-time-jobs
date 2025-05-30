import { createTheme, darken, lighten } from '@mui/material/styles';
import { fontStyleOptions } from './font-styles';
import { lightPalette } from './light-palette';
import { constructVariants } from './typography-variants';
import { Theme } from '@shared/enums';
import { darkPalette } from './dark-palette';

const constructTheme = (theme: Theme) => {
  const preferedTheme = theme === Theme.Light ? lightPalette : darkPalette;
  const typographyVariants = constructVariants(preferedTheme);

  return createTheme({
    palette: preferedTheme,
    typography: {
      ...fontStyleOptions,
      ...typographyVariants,
    },
  });
};

const constructComponents = (theme: Theme) => {
  const baseTheme = constructTheme(theme);
  const variants = constructVariants(baseTheme.palette);

  return {
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
            '&.contained': {
              color:
                theme === Theme.Light
                  ? baseTheme.palette.primary.main
                  : baseTheme.palette.primary.contrastText,
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
              backgroundColor:
                theme === Theme.Light
                  ? lighten(baseTheme.palette.info.main, 0.9)
                  : darken(baseTheme.palette.text.disabled, 0),
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
            backgroundColor:
              theme === Theme.Light
                ? baseTheme.palette.primary.contrastText
                : baseTheme.palette.background.paper,
          },
        },
      },
      MuiAccordionSummary: {
        styleOverrides: {
          root: {
            backgroundColor: baseTheme.palette.secondary.main,
            minHeight: '40px',
            '& .MuiTypography-root': {
              ...constructVariants(baseTheme.palette).subtitle2,
              color:
                theme === Theme.Light
                  ? baseTheme.palette.primary.main
                  : baseTheme.palette.primary.contrastText,
            },
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
              color: baseTheme.palette.primary.main,
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
            fontSize: '1rem',
            fontWeight: baseTheme.typography.fontWeightRegular,
            lineHeight: '14px',
            p: 2,
          },
        },
      },
      MuiTable: {
        styleOverrides: {
          root: {
            '.MuiTableCell-head': {
              fontWeight: '700',
            },
            '.MuiTableCell-body': variants.body1,
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
      MuiCardContent: {
        styleOverrides: {
          root: {
            '& .MuiTypography-body2': {
              color: baseTheme.palette.text.secondary,
            },
          },
        },
      },
    },
  };
};

export const lightTheme = createTheme(
  constructTheme(Theme.Light),
  constructComponents(Theme.Light)
);
export const darkTheme = createTheme(
  constructTheme(Theme.Dark),
  constructComponents(Theme.Dark)
);
