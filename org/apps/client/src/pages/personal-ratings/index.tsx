import { useCurrentUser } from '../../hooks/use-current-user';
import {
  AsyncDataLoader,
  LOADING_PROPS,
} from '../../components/async-data-loader';
import { useTranslation } from 'react-i18next';
import { personalRatingService } from '../../services/personal-rating-service';
import { userService } from '../../services/user-service';
import { jobOfferService } from '../../services/job-offer-service';
import { RatingLibrary } from '../../components/rating-library';
import { applicationService } from '../../services/application-service';
import { applicationResponseService } from '../../services/application-response-service';

export function PersonalRatings() {
  const currentUser = useCurrentUser();
  const { t } = useTranslation();

  return (
    <AsyncDataLoader
      dataLoader={({ signal }) =>
        Promise.all([
          personalRatingService.listAll(signal),
          jobOfferService.listAll(signal),
          userService.listAll(signal),
          applicationService.listAll(signal),
          applicationResponseService.listAll(signal),
        ])
      }
      loadingProps={LOADING_PROPS.BLANK_PAGE_WITH_TOP_BAR}
    >
      {([personalRatings, jobs, users, applications, applicationResponses]) => {
        const currentUserPersonalRatings = personalRatings.filter(
          ({ createdBy }) => createdBy === currentUser?._id
        );
        const personalRatingAdIds = currentUserPersonalRatings.map(
          ({ adId }) => adId
        );

        return (
          <RatingLibrary
            ratings={currentUserPersonalRatings}
            applications={applications}
            applicationResponses={applicationResponses}
            users={users}
            ads={jobs.filter(({ _id }) => personalRatingAdIds.includes(_id))}
            label={t('personal-ratings-list')}
          />
        );
      }}
    </AsyncDataLoader>
  );
}
