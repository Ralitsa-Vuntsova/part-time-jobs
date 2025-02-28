import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  AccordionSummary as MuiAccordionSummary,
  AccordionSummaryProps,
  SxProps,
  Theme,
} from '@mui/material';
import { makeStyles } from '../../libs/make-styles';

const generateStyles = (externalStyles?: SxProps<Theme>) =>
  makeStyles({
    icon: {
      color: (theme) => theme.palette.primary.main,
    },
    accordionStyles: {
      flexDirection: 'row-reverse',
      gap: 1,
      '& .MuiAccordionSummary-content': {
        alignItems: 'center',
      },
      ...externalStyles,
    },
  });

export function AccordionSummary({ ...props }: AccordionSummaryProps) {
  const styles = generateStyles(props.sx);

  return (
    <MuiAccordionSummary
      {...props}
      expandIcon={<ExpandMoreIcon sx={styles.icon} />}
      sx={styles.accordionStyles}
    />
  );
}
