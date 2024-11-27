import { FormControl, styled, useTheme } from '@mui/material';

export const StyledFormControl = styled(FormControl)(() => {
  const theme = useTheme();

  return {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '16px',
    padding: '35px',
    background: theme.palette.background.paper,
    borderRadius: '10px',
    boxShadow: '0px 0px 3px 2px #002C77',
  };
});
