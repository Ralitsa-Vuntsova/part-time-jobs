import { Add } from '@mui/icons-material';
import { Button, ButtonProps } from '@mui/material';
import { makeStyles } from '../../libs/make-styles';

const styles = makeStyles({
  button: {
    backgroundColor: (theme) => theme.palette.secondary.main,
  },
});

interface Props extends ButtonProps {
  rounded?: boolean;
}

export function AddButton({ rounded = true, sx, ...buttonProps }: Props) {
  const buttonStyle = { ...sx, ...styles.button };

  return (
    <Button
      {...(rounded ? { variant: 'contained', className: 'rounded' } : {})}
      startIcon={<Add />}
      sx={{
        width: buttonProps.fullWidth ? '100%' : 'fit-content',
        ...buttonStyle,
      }}
      {...buttonProps}
    />
  );
}
