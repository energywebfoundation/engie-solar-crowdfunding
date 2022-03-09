import { Box } from '@mui/material';
import { FC } from 'react';
import { LendingDetails, LendingStats, LendingTerms, StakingTimeline } from '..';
import { useLendingEffects } from './Lending.effects';
import { useStyles } from './Lending.styles';

export const Lending: FC = () => {
  const classes = useStyles();
  const { isVisible } = useLendingEffects();

  return (
    isVisible && (
      <Box className={classes.wrapper}>
        <Box className={classes.stakeContainer} id='lendingApp'>
          <LendingDetails />
          <Box className={classes.info}>
            <LendingStats />
            <StakingTimeline />
          </Box>
        </Box>
        <LendingTerms />
      </Box>
    )
  );
};
