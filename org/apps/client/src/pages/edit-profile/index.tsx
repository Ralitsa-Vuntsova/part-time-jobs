import { userService } from '../../services/user-service';
import { useCurrentUser } from '../../hooks/use-current-user';
import {
  AsyncDataLoader,
  LOADING_PROPS,
} from '../../components/async-data-loader';
import { EditProfileForm } from './form';
import { DeleteProfileButton } from './delete-button';
import { makeStyles } from '../../libs/make-styles';
import { Box, Rating } from '@mui/material';
import { RatingAccordion } from '../../components/rating-accordion';
import { useUserRating } from '../../hooks/use-user-rating';

const styles = makeStyles({
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    alignItems: 'center',
  },
});

export function EditProfile() {
  const currentUser = useCurrentUser();

  if (!currentUser) {
    return null;
  }

  const { averageRating, ratings } = useUserRating(currentUser?._id);

  return (
    <AsyncDataLoader
      dataLoader={({ signal }) => userService.getById(currentUser._id, signal)}
      loadingProps={LOADING_PROPS.BLANK_PAGE_WITH_TOP_BAR}
    >
      {(userData) => (
        <Box sx={styles.flexColumn}>
          <EditProfileForm userData={userData} />
          <DeleteProfileButton userData={userData} />

          {ratings.length > 0 && (
            <>
              {/* TODO [future]: Display how many people rated */}
              <Rating value={averageRating} readOnly />
              <RatingAccordion expanded={true} ratings={ratings} />
            </>
          )}
        </Box>
      )}
    </AsyncDataLoader>
  );
}
