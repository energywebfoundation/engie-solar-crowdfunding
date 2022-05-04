import { Paper, Box, Typography } from '@mui/material';
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
          <Paper className={classes.notification}>
            <Typography align='center' variant='h3' style={{ width: '100%' }} color='error'>
            Staking is Paused! 
            </Typography>
          </Paper>
        )}
        {isContractTerminated && (
          <Paper className={classes.notification}>
            <Typography align='center' variant='h3' style={{ width: '100%' }} color='error'>
              Staking is canceled due to an emergency event - please withdraw your funds immediately!
            </Typography>
          </Paper>
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
