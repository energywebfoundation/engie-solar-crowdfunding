import { Reducer } from 'redux';
import { SmartContractReducerState, SmartContractActionTypes } from './types';

const initialState: SmartContractReducerState = {
  loading: false,
  accountBalance: null,
  userContribution: 100,
  solarLoanTokenBalance: 400,
  redeemableReward: 50,
  tokensRedeemed: 137,
  error: null,
};

const smartContractReducer: Reducer<SmartContractReducerState> = (
  state: SmartContractReducerState = initialState,
  { type, payload, error },
) => {
  switch (type) {
    case SmartContractActionTypes.SET_ACCOUNT_BALANCE:
      return {
        ...state,
        accountBalance: payload,
      };
    default:
      return state;
  }
};

export { smartContractReducer as smartContract };
