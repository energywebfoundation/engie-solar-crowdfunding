import { Box } from '@mui/material';
import { FC } from 'react';
import { LendingDetails, LendingStats, LendingTerms } from '..';
import { useStyles } from './Lending.styles';

export const Lending: FC = () => {
  const classes = useStyles();
  return (
    <Box className={classes.wrapper} id='lendingApp'>
      <LendingDetails />
      <Box className={classes.info}>
        <LendingStats />
        <LendingTerms />
      </Box>
    </Box>
  );
};
