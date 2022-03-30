import { useSelector } from 'react-redux';
import {
  selectActivateStackingDate,
  selectContributionDeadline,
  selectLockStakesDate,
  selectReleaseRewardsDate,
} from '../../redux-store';
import { formatDate } from '../../utils';

export const useLendingTermsEffects = () => {
  const activateStakingDate = formatDate(new Date(useSelector(selectActivateStackingDate)));
  const closeStackingDate = formatDate(new Date(useSelector(selectContributionDeadline)));
  const lockStakesDate = formatDate(new Date(useSelector(selectLockStakesDate)));
  const releaseRewardsDate = formatDate(new Date(useSelector(selectReleaseRewardsDate)));
  const finalStopDate = formatDate(new Date(process.env.NEXT_PUBLIC_FULL_STOP_DATE));

  const listItems: string[] = [
    'Anyone eligible can stake and join the Clean Energy Fund until the maximum pool limit is reached.',
    `You can enroll, stake or withdraw your contributions without the rewards any time between ${activateStakingDate} and ${closeStackingDate}`,
    `You may not withdraw EWT contributions for the duration of the pilot between ${lockStakesDate} and ${releaseRewardsDate}`,
    `You can withdraw your principal and rewards between ${releaseRewardsDate} and ${finalStopDate}. After ${finalStopDate}, you won't be able to withdraw your funds and we won't be able to recover them for you.`,
    `EWT contributions are exchanged for Solar Loan Tokens (SLT) at a 1:1 ratio: you will need your SLT on ${releaseRewardsDate} to redeem your contribution and 10% reward. You have to be enrolled to withdraw your funds.`,
    `A small gas fee will be charged for STAKE and Redeem SLT for EWT operations.`,
    `We do not store or use your email address for purposes other than enrollment - please keep informed about important news about the campaign on our Social Media.`,
  ];
  return listItems;
};
