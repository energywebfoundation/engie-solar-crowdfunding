import { Box, Paper, CircularProgress } from '@mui/material';
import { ContributionItem, ProgressBar } from '../../components';
import { useLendingStatsEffects } from './LendingStats.effects';
import { useStyles } from './LendingStats.styles';

export const LendingStats = () => {
  const { isReady, totalLentAmount, globalTokenLimit } = useLendingStatsEffects();
  const classes = useStyles();

  return (
    <Paper className={classes.wrapper}>
      {!isReady ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <ContributionItem
            titleClass={classes.titleClass}
            title='Crowdfund for Solar at a glance'
            value={totalLentAmount}
            type='EWT'
          />
          <ProgressBar
            value={totalLentAmount}
            limit={globalTokenLimit}
            description='EWT Staking Pool Limit'
            className={classes.barColorPrimary}
          />
        </>
      )}
    </Paper>
  );
};
