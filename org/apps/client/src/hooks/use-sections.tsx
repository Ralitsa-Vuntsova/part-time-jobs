import { DrawerSection } from '../components/drawer/section';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { useTranslation } from 'react-i18next';

export function useSections(): DrawerSection[] {
  const { t } = useTranslation();

  return [
    {
      label: t('home'),
      Icon: HomeIcon,
      navigateTo: '/',
    },
    {
      label: t('create'),
      items: [
        {
          label: t('seek-service'),
          Icon: WorkIcon,
          navigateTo: 'seek-service',
        },
        {
          label: t('offer-service'),
          Icon: SupportAgentIcon,
          navigateTo: 'offer-service',
        },
      ],
    },
  ];
}
