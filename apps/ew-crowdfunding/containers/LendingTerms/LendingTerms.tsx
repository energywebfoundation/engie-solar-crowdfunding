import { Box, Paper, Typography } from '@mui/material';
import { FC } from 'react';
import { useLendingTermsEffects } from './LendingTerms.effects';
import { useStyles } from './LendingTerms.styles';
import { ListComponent } from '../../components';

export const LendingTerms: FC = () => {
  const listItems = useLendingTermsEffects();
  const classes = useStyles();

  return (
    <Paper className={classes.wrapper}>
      <Typography variant='h4'>Staking Terms</Typography>
      <ListComponent listItems={listItems} />
      <Box className={classes.infoMessage}>
        <Typography fontStyle='italic' variant='body1'>
          <strong>All times are displayed in the timezone of your browser.</strong>
        </Typography>
      </Box>
    </Paper>
  );
};
