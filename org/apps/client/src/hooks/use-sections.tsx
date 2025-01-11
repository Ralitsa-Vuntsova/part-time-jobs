import { DrawerSection } from '../components/drawer/section';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

export function useSections(): DrawerSection[] {
  return [
    {
      label: 'Home',
      Icon: HomeIcon,
      navigateTo: '/',
    },
    {
      label: 'CREATE',
      items: [
        {
          label: 'Seek Service',
          Icon: WorkIcon,
          navigateTo: 'seek-service',
        },
        {
          label: 'Offer Service',
          Icon: SupportAgentIcon,
          navigateTo: 'offer-service',
        },
      ],
    },
  ];
}
