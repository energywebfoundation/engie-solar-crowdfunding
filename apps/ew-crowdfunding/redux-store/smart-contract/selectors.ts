import { createSelector, Selector } from 'reselect';
import { RootState } from '../root-reducer';
import { SmartContractReducerState } from './types';

const selectSmartContract: Selector<RootState, SmartContractReducerState> = (state) => state.smartContract;

export const selectAccountBalance = createSelector(
  [selectSmartContract],
  (smartContract) => smartContract.accountBalance,
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
