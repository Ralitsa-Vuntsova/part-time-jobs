import { useCurrentUser } from '../../hooks/use-current-user';
import {
  AsyncDataLoader,
  LOADING_PROPS,
} from '../../components/async-data-loader';
import { useTranslation } from 'react-i18next';
import { personalRatingService } from '../../services/personal-rating-service';
import { jobOfferService } from '../../services/job-offer-service';
import { RatingLibrary } from '../../components/rating-library';

export function PersonalRatings() {
  const currentUser = useCurrentUser();
  const { t } = useTranslation();

  if (!currentUser) {
    return null;
  }

  return (
    <AsyncDataLoader
      dataLoader={({ signal }) =>
        Promise.all([
          personalRatingService.listForUser(currentUser._id, signal),
          jobOfferService.listAll(signal),
        ])
      }
      loadingProps={LOADING_PROPS.BLANK_PAGE_WITH_TOP_BAR}
    >
      {([personalRatings, jobs]) => {
        const personalRatingAdIds = personalRatings.map(({ adId }) => adId);

        return (
          <RatingLibrary
            ratings={personalRatings}
            ads={jobs.filter(({ _id }) => personalRatingAdIds.includes(_id))}
            label={t('personal-ratings-list')}
          />
        );
      }}
    </AsyncDataLoader>
  );
}
