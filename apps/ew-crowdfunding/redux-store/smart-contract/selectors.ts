import { createSelector, Selector } from 'reselect';
import { RootState } from '../root-reducer';
import { SmartContractReducerState } from './types';

const selectSmartContract: Selector<RootState, SmartContractReducerState> = (state) => state.smartContract;

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

export const selectTokensRedeemed = createSelector(
  [selectSmartContract],
  (smartContract) => smartContract.tokensRedeemed,
);

export const selectInterestRate = createSelector([selectSmartContract], (smartContract) => smartContract.interestRate);

export const selectContributionDeadline = createSelector(
  [selectSmartContract],
  (smartContract) => smartContract.contributionDeadline,
);

export const selectSolarLoansDistributed = createSelector(
  [selectSmartContract],
  (smartContract) => smartContract.solarLoansDistributed,
);

export const selectSolarLoansMature = createSelector(
  [selectSmartContract],
  (smartContract) => smartContract.solarLoansMature,
);

export const selectTotalLentAmount = createSelector(
  [selectSmartContract],
  (smartContract) => smartContract.totalLentAmount,
);
