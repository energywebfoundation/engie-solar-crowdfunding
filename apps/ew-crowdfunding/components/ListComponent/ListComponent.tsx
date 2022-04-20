import { Box, List, Link, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { FC } from 'react';
import { useStyles } from './ListComponent.styles';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export interface ListComponentProps {
  listItems: string[];
}

export const ListComponent: FC<ListComponentProps> = ({ listItems }) => {
  const classes = useStyles();

  const getTransformed = (item: string) => {
    return item;
  }

  const render = (item: string) => {
    if (item === `Note that for privacy purposes, we will not contact staking participants via direct email. You can only receive updates on the campaign through our official Twitter account.`){
      return (
        <Box>
          <strong>Note that for privacy purposes, we will not contact staking participants via direct email. </strong>
          You can only receive updates on the campaign through our official <Link href="https://twitter.com/energywebx" target="_blank"><a>Twitter account</a></Link>.
        </Box>
      );
    }
    return <ListItemText style={{ margin: 0 }} primary={item} />
  }

  return (
    <List className={classes.listWrapper}>
      {listItems.map((listItem: string, index: number) => {
        return (
          // <ListItem key={`${listItem}`} className={classes.listItem}>
          <ListItem key={`${listItem}`} className={classes.listItem}>
            <ListItemIcon>
              <ArrowForwardIosIcon />
            </ListItemIcon>
            {render(listItem)}
          </ListItem>
        );
      })}
    </List>
  );
};
