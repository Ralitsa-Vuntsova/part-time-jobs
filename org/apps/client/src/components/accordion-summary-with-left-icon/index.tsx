import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  AccordionSummary,
  AccordionSummaryProps,
  SxProps,
  Theme,
} from '@mui/material';
import { makeStyles } from '../../libs/make-styles';
import { variants } from '../../libs/theme/typography-variants';

interface Props extends AccordionSummaryProps {
  isHeaderBold?: boolean;
}

const generateStyles = (
  isHeaderBold: boolean,
  externalStyles?: SxProps<Theme>
) =>
  makeStyles({
    icon: {
      color: (theme) => theme.palette.primary.main,
    },
    accordionStyles: {
      flexDirection: 'row-reverse',
      gap: 1,
      '& .MuiTypography-root': isHeaderBold
        ? {
            ...variants.subtitle2,
            color: (theme) => theme.palette.primary.main,
          }
        : {},
      '& .MuiAccordionSummary-content': {
        alignItems: 'center',
      },
      ...externalStyles,
    },
  });

export function AccordionSummaryWithLeftIcon({
  isHeaderBold = true,
  ...props
}: Props) {
  const styles = generateStyles(isHeaderBold, props.sx);

  return (
    <AccordionSummary
      {...props}
      expandIcon={<ExpandMoreIcon sx={styles.icon} />}
      sx={styles.accordionStyles}
    />
  );
}
