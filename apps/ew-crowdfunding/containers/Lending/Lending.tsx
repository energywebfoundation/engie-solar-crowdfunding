import { Box } from '@mui/material';
import { FC } from 'react';
import { LendingDetails, LendingStats, LendingTerms } from '..';
import { useLendingEffects } from './Lending.effects';
import { useStyles } from './Lending.styles';

export const Lending: FC = () => {
  const classes = useStyles();
  const { isVisible } = useLendingEffects();

  return (
    isVisible && (
      <Box className={classes.wrapper} id='lendingApp'>
        <LendingDetails />
        <Box className={classes.info}>
          <LendingStats />
          <LendingTerms />
        </Box>
      </Box>
    )
  );
};
