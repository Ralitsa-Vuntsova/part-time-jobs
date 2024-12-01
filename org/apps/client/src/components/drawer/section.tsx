import {
  Box,
  Divider,
  List,
  ListSubheader,
  SxProps,
  Theme,
} from '@mui/material';
import { makeStyles } from '../../libs/make-styles';
import { DrawerItem, DrawerItemData } from './item';

const styles = makeStyles({
  list: {
    display: 'flex',
    flexDirection: 'column',
  },
  listSubheader: {
    p: 2,
    lineHeight: '20px',
    color: (theme) => theme.palette.primary.contrastText,
  },
  singleItem: {
    '&.active': {
      color: (theme) => theme.palette.primary.contrastText,
    },
  },
});

interface MultiItemSection {
  label: string;
  sx?: SxProps<Theme>;
  items: DrawerItemData[];
}

const isMultiItemSection = (
  section: DrawerSection
): section is MultiItemSection => !!(section as MultiItemSection).items;

export type DrawerSection = DrawerItemData | MultiItemSection;

interface Props {
  section: DrawerSection;
  drawerOpened: boolean;
}

export function Section({ section, drawerOpened }: Props) {
  const hasItems = isMultiItemSection(section);
  const sx = hasItems && section.sx ? section.sx : [];

  const style = [
    {
      display: 'flex',
      flexDirection: 'column',
      p: 0,
    },
    ...(Array.isArray(sx) ? sx : [sx]),
  ];

  return (
    <Box sx={style}>
      <Divider />

      <List
        subheader={
          drawerOpened && hasItems ? (
            <ListSubheader
              disableSticky
              component="div"
              sx={styles.listSubheader}
            >
              {section.label}
            </ListSubheader>
          ) : null
        }
        sx={{
          ...styles.list,
          gap: drawerOpened ? '0px' : '15px',
          textWrap: 'wrap',
        }}
      >
        {hasItems ? (
          section.items.map((item, index) => (
            <DrawerItem
              key={`${section.label}-${item.label}-${index}`}
              item={item}
              isDrawerOpen={drawerOpened}
            />
          ))
        ) : (
          <DrawerItem
            key={section.label}
            item={section}
            isDrawerOpen={drawerOpened}
            sx={styles.singleItem}
          />
        )}
      </List>
    </Box>
  );
}
