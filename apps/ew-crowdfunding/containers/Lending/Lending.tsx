import { Box, Typography } from '@mui/material';
import { FC } from 'react';
import { LendingDetails, LendingStats, LendingTerms, StakingTimeline } from '..';
import { useLendingEffects } from './Lending.effects';
import { useStyles } from './Lending.styles';

export const Lending: FC = () => {
  const classes = useStyles();
  const { isVisible, isContractPaused, isContractTerminated } = useLendingEffects();

  return (
    isVisible && (
      <Box className={classes.wrapper}>
        {isContractPaused && (
          <Typography align='center' variant='h3' style={{ width: '100%' }} className='gradient-text'>
            Staking is paused until further notice due to an emergency event.
          </Typography>
        )}
        {isContractTerminated && (
          <Typography align='center' variant='h3' style={{ width: '100%' }} className='gradient-text'>
            Staking is canceled due to an emergency event - please withdraw your funds immediately.
          </Typography>
        )}
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
