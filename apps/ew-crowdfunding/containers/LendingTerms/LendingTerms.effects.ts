import { useSelector } from 'react-redux';
import {
  selectActivateStackingDate,
  selectContributionDeadline,
  selectFinalStopDate,
  selectLockStakesDate,
  selectReleaseRewardsDate,
} from '../../redux-store';
import { formatDate } from '../../utils';

export const useLendingTermsEffects = () => {
  const activateStakingDate = formatDate(new Date(useSelector(selectActivateStackingDate)));
  const closeStackingDate = formatDate(new Date(useSelector(selectContributionDeadline)));
  const lockStakesDate = formatDate(new Date(useSelector(selectLockStakesDate)));
  const releaseRewardsDate = formatDate(new Date(useSelector(selectReleaseRewardsDate)));
  const finalStopDate = formatDate(new Date(useSelector(selectFinalStopDate)));

  const poolFilledText = `Update from 05 May 2022: Staking pool has been filled. You can no longer stake, but as planned, you can withdraw your original EWT without rewards until  ${closeStackingDate} by sending your SLTs to the Crowdfund for Solar wallet: 0xff0E9ddB12F1082833B13E144b60df6cf04aE116. You will receive corresponding EWTs within 1 working day. For any issues, please contact meerim.ruslanova@energyweb.org.`

  const listItems: string[] = [
    'Anyone eligible can stake and join the Crowdfund for Solar until the maximum pool limit is reached.',
    `You can enroll, stake or withdraw your contributions without the rewards any time between ${activateStakingDate} and ${closeStackingDate}`,
    // `Update from 05 May 2022: Staking pool has been filled. You can no longer stake, but as planned, you can withdraw your original EWT without rewards until  ${closeStackingDate} by sending your SLTs to the Crowdfund for Solar wallet: 0xff0E9ddB12F1082833B13E144b60df6cf04aE116. You will receive corresponding EWTs within 1 working day. For any issues, please contact meerim.ruslanova@energyweb.org.`,
    `You may not withdraw EWT contributions for the duration of the pilot between ${lockStakesDate} and ${releaseRewardsDate}`,
    `You can withdraw your principal and rewards between ${releaseRewardsDate} and ${finalStopDate}. After ${finalStopDate}, you won't be able to withdraw your funds and we won't be able to recover them for you.`,
    `EWT contributions are exchanged for Solar Loan Tokens (SLT) at a 1:1 ratio: you will need your SLT on ${releaseRewardsDate} to redeem your contribution and 10% reward. You have to be enrolled to withdraw your funds.`,
    `A small gas fee will be charged for STAKE and Redeem SLT for EWT operations.`,
    `Note that for privacy purposes, we will not contact staking participants via direct email. You can only receive updates on the campaign through our official Twitter account.`,
  ];
  return listItems;
};
