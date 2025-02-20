import { useEffect, useState } from 'react';
import { notificationService } from '../../services/notification-service';
import { useAsyncAction } from '../../hooks/use-async-action';
import { useCurrentUser } from '../../hooks/use-current-user';
import { NotificationDto } from '@shared/data-objects';
import { uniq } from 'lodash';
import { Badge, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { makeStyles } from '../../libs/make-styles';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { getTimePassed } from '../../libs/notification-helper-functions';

const DISPLAY_NOTIFICATION_COUNT = 5;

const styles = makeStyles({
  icon: {
    color: (theme) => theme.palette.warning.main,
  },
  menu: {
    '& .MuiMenu-paper': {
      maxHeight: '500px',
      overflowY: 'auto',
    },
  },
  menuItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    width: '400px',
    whiteSpace: 'normal',
  },
  menuItemRead: {
    bgcolor: (theme) => theme.palette.action.selected,
    '&.MuiMenuItem-root:hover': {
      bgcolor: (theme) => theme.palette.action.selected,
    },
  },
  subHeading: {
    fontSize: '10px',
  },
  showMore: {
    width: '100%',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: '0.20px',
    fontWeight: 500,
  },
});

interface Props {
  initialNotifications: NotificationDto[];
  onChange: () => void;
}

export function Notifications({ initialNotifications, onChange }: Props) {
  const currentUser = useCurrentUser();

  const { t } = useTranslation();

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notifications, setNotifications] =
    useState<NotificationDto[]>(initialNotifications);
  const [displayCount, setDisplayCount] = useState(DISPLAY_NOTIFICATION_COUNT);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (currentUser?._id) {
      notificationService.listenForNotifications((newNotification) =>
        setNotifications((prev) => uniq([newNotification, ...prev]))
      );
    }
  }, [currentUser?._id]);

  const { trigger: markAsRead } = useAsyncAction(
    async ({ signal }, id: string) => {
      await notificationService.markAsRead(id, signal);

      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
      onChange();
    }
  );

  const menuItemReadStyles = { ...styles.menuItem, ...styles.menuItemRead };

  const displayedNotifications = notifications.slice(0, displayCount);

  return (
    <>
      <IconButton sx={styles.icon} onClick={handleClick}>
        <Badge
          badgeContent={notifications.filter((n) => !n.isRead).length}
          color="error"
        >
          <NotificationsIcon />
        </Badge>
      </IconButton>

      {!!displayedNotifications.length && (
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={() => {
            handleClose();
            setDisplayCount(DISPLAY_NOTIFICATION_COUNT);
          }}
          sx={styles.menu}
        >
          {displayedNotifications.map((n) => {
            const createdTime = getTimePassed(n.createdAt);

            return (
              <MenuItem
                key={n._id}
                onClick={() => {
                  if (!n.isRead) {
                    markAsRead(n._id);
                    handleClose();
                    setDisplayCount(DISPLAY_NOTIFICATION_COUNT);
                  }
                  if (n.redirectUrl) {
                    navigate(n.redirectUrl);
                  }
                }}
                divider={true}
                sx={n.isRead ? menuItemReadStyles : styles.menuItem}
              >
                <Typography>{n.message}</Typography>
                <Typography sx={styles.subHeading}>{createdTime}</Typography>
              </MenuItem>
            );
          })}

          {displayedNotifications.length >= displayCount && (
            <MenuItem
              onClick={() =>
                setDisplayCount(displayCount + DISPLAY_NOTIFICATION_COUNT)
              }
            >
              <Typography sx={styles.showMore} variant="subtitle1">
                {t('show-more')}
              </Typography>
            </MenuItem>
          )}
        </Menu>
      )}
    </>
  );
}
