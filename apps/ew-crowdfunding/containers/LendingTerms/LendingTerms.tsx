import { Box, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { FC } from 'react';
import { useLendingTermsEffects } from './LendingTerms.effects';
import { useStyles } from './LendingTerms.styles';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const LendingTerms: FC = () => {
  const listItems = useLendingTermsEffects();
  const classes = useStyles();

  return (
    <Box className={`${classes.wrapper} gradientBorder`}>
      <Typography style={{ paddingLeft: '20px', paddingTop: '20px' }} variant='h4'>
        Lending Terms
      </Typography>
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
    </Box>
  );
};
