import {
  CreateNotificationDto,
  JobOfferDto,
  UserProfile,
} from '@shared/data-objects';
import { getTimeFromNow, TimeType } from './format-date';
import i18n from 'i18next';

// TODO: Translate notifications
export function toNotificationForResponse(
  ad: JobOfferDto,
  creator: UserProfile | undefined,
  userId: string,
  isAccepted: boolean
): CreateNotificationDto {
  const actionString = isAccepted ? 'accepted' : 'declined';

  return {
    message: `${creator?.firstName} ${creator?.lastName} ${actionString} your application for the following ad: ${ad.name}`,
    redirectUrl: `/seek-service-ads/${ad._id}`,
    userId,
  };
}

export function toNotificationForApplying(
  ad: JobOfferDto,
  creator: UserProfile | undefined,
  userId: string
): CreateNotificationDto {
  return {
    message: `${creator?.firstName} ${creator?.lastName} applied for your ad: ${ad.name}`,
    redirectUrl: 'applications',
    userId,
  };
}

export function getTimePassed(createdAt: string) {
  const time = getTimeFromNow(createdAt);

  switch (time.type) {
    case TimeType.Days:
      return time.value === 1
        ? i18n.t('1-day-ago')
        : i18n.t('days-ago', { days: time.value });
    case TimeType.Hours:
      return time.value === 1
        ? i18n.t('1-hour-ago')
        : i18n.t('hours-ago', { hours: time.value });
    case TimeType.Minutes:
      return time.value === 1
        ? i18n.t('1-minute-ago')
        : i18n.t('minutes-ago', { minutes: time.value });
    default:
      return '';
  }
}
