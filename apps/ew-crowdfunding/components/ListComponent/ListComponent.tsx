import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { FC } from 'react';
import { useStyles } from './ListComponent.styles';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export interface ListComponentProps {
  listItems: string[];
}

export const ListComponent: FC<ListComponentProps> = ({ listItems }) => {
  const classes = useStyles();

  return (
    <List className={classes.listWrapper}>
      {listItems.map((listItem: string) => {
        return (
          <ListItem key={`${listItem}`} className={classes.listItem}>
            <ListItemIcon>
              <ArrowForwardIosIcon />
            </ListItemIcon>
            <ListItemText style={{ margin: 0 }} primary={listItem} />
          </ListItem>
        );
      })}
    </List>
  );
};
