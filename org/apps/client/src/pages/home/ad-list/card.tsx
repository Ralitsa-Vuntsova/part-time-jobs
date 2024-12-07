import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import { JobOfferDto, ServiceOfferDto } from '@shared/data-objects';
import { makeStyles } from '../../../libs/make-styles';

const styles = makeStyles({
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'space-between',
  },
  button: {
    color: (theme) => theme.palette.primary.main,
  },
  grid: {
    maxWidth: 345,
  },
  list: {
    display: 'inline-block',
    width: '100%',
  },
});

interface Props {
  data: JobOfferDto | ServiceOfferDto;
  isGrid: boolean;
}

export function AdCard({ data, isGrid }: Props) {
  const cardStyles = isGrid ? styles.grid : styles.list;

  return (
    <Card sx={cardStyles}>
      <CardContent sx={styles.flexColumn}>
        <Typography gutterBottom variant="h5" component="div">
          {data.name}
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {data.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" sx={styles.button}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
