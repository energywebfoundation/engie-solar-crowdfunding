import { createSelector, Selector } from 'reselect';
import { RootState } from '../root-reducer';
import { SmartContractReducerState } from './types';

const selectSmartContract: Selector<RootState, SmartContractReducerState> = (state) => state.smartContract;

export const selectAccountBalance = createSelector(
  [selectSmartContract],
  (smartContract) => smartContract.accountBalance,
);
