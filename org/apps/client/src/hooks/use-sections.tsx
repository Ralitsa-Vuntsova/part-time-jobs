import { DrawerSection } from '../components/drawer/section';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { useTranslation } from 'react-i18next';
import ArticleIcon from '@mui/icons-material/Article';
import SearchIcon from '@mui/icons-material/Search';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';

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
          Icon: SearchIcon,
          navigateTo: 'seek-service',
        },
        {
          label: t('offer-service'),
          Icon: SupportAgentIcon,
          navigateTo: 'offer-service',
        },
      ],
    },
    {
      label: t('browse'),
      items: [
        {
          label: t('my-ads'),
          Icon: ArticleIcon,
          navigateTo: 'my-ads',
        },
        {
          label: t('my-accomplishments'),
          Icon: WorkIcon,
          navigateTo: 'my-accomplishments',
        },
        {
          label: t('applications'),
          Icon: ForwardToInboxIcon,
          navigateTo: 'applications',
        },
      ],
    },
  ];
}
