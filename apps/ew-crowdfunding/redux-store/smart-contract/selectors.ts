import { createSelector, Selector } from 'reselect';
import { RootState } from '../root-reducer';
import { SmartContractReducerState } from './types';

const selectSmartContract: Selector<RootState, SmartContractReducerState> = (state) => state.smartContract;

export const selectSmartContractLoading = createSelector(
  [selectSmartContract],
  (smartContract) => smartContract.loading,
);

export const selectAccountBalance = createSelector(
  [selectSmartContract],
  (smartContract) => smartContract.accountBalance,
);

export const selectTokenLimit = createSelector([selectSmartContract], (smartContract) => smartContract.tokenLimit);

export const selectGlobalTokenLimit = createSelector(
  [selectSmartContract],
  (smartContract) => smartContract.globalTokenLimit,
);

export const selectUserContribution = createSelector(
  [selectSmartContract],
  (smartContract) => smartContract.userContribution,
);

export const selectSolarLoanTokenBalance = createSelector(
  [selectSmartContract],
  (smartContract) => smartContract.solarLoanTokenBalance,
);

export const selectRedeemableReward = createSelector(
  [selectSmartContract],
  (smartContract) => smartContract.redeemableReward,
);

export const selectContributionDeadline = createSelector(
  [selectSmartContract],
  (smartContract) => smartContract.closeStackingDate,
);

export const selectLockStakesDate = createSelector(
  [selectSmartContract],
  (smartContract) => smartContract.lockStakesDate,
);

export const selectReleaseRewardsDate = createSelector(
  [selectSmartContract],
  (smartContract) => smartContract.releaseRewardsDate,
);

export const selectTotalLentAmount = createSelector(
  [selectSmartContract],
  (smartContract) => smartContract.totalLentAmount,
);

export const selectActivateStackingDate = createSelector(
  [selectSmartContract],
  (smartContract) => smartContract.activateStakingDate,
);
