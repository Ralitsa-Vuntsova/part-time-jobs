import { Stack, styled, useTheme } from '@mui/material';

export const StyledStack = styled(Stack)(() => {
  const theme = useTheme();

  return {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
  };
});
