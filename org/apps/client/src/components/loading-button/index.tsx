import { Button, ButtonProps, CircularProgress } from '@mui/material';

interface Props extends ButtonProps {
  loading: boolean;
}

export function LoadingButton({ loading, ...buttonProps }: Props) {
  return (
    <Button
      {...buttonProps}
      disabled={loading || buttonProps.disabled}
      startIcon={
        loading ? (
          <CircularProgress size={20} color="secondary" />
        ) : (
          buttonProps.startIcon
        )
      }
    />
  );
}
