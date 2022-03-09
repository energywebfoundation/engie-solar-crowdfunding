import { Paper, Typography } from '@mui/material';
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
    </Paper>
  );
};
