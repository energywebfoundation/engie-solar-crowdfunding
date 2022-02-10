import { Box, CircularProgress } from '@mui/material';
import { ContributionItem, ProgressBar } from '../../components';
import { useLendingStatsEffects } from './LendingStats.effects';
import { useStyles } from './LendingStats.styles';

export const LendingStats = () => {
  const { isReady, totalLentAmount, globalTokenLimit } = useLendingStatsEffects();
  const classes = useStyles();

  return (
    <Box className={`${classes.wrapper} gradientBorder`}>
      {!isReady ? (
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <ContributionItem title='Solar lending stats' value={totalLentAmount} type='EWT' />
          <ProgressBar value={totalLentAmount} limit={globalTokenLimit} description='EWT Lending Limit' />
        </>
      )}
    </Box>
  );
};
