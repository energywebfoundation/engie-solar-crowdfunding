import { Box } from '@mui/material';
import { ContributionItem, ProgressBar } from '../../components';
import { useLendingStatsEffects } from './LendingStats.effects';
import { useStyles } from './LendingStats.styles';

export const LendingStats = () => {
  const { lendedAmount, lendedLimit } = useLendingStatsEffects();
  const classes = useStyles();

  return (
    <Box className={`${classes.wrapper} gradientBorder`}>
      <ContributionItem title='Solar lending stats' value={lendedAmount} type='EWT' />
      <ProgressBar value={lendedAmount} limit={lendedLimit} description='EWT Lending Limit' />
    </Box>
  );
};
