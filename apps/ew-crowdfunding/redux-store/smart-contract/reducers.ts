import { Reducer } from 'redux';
import { SmartContractReducerState, SmartContractActionTypes } from './types';

const initialState: SmartContractReducerState = {
  loading: false,
  accountBalance: null,
  tokenLimit: null,
  globalTokenLimit: null,
  userContribution: null,
  solarLoanTokenBalance: null,
  redeemableReward: null,
  tokensRedeemed: null,
  interestRate: null,
  contributionDeadline: null,
  solarLoansDistributed: null,
  solarLoansMature: null,
  totalLentAmount: null,
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
    case SmartContractActionTypes.SET_TOKEN_LIMIT:
      return {
        ...state,
        tokenLimit: payload,
      };
    case SmartContractActionTypes.SET_GLOBAL_TOKEN_LIMIT:
      return {
        ...state,
        globalTokenLimit: payload,
      };
    case SmartContractActionTypes.SET_CONTRIBUTION:
      return {
        ...state,
        userContribution: payload,
      };
    case SmartContractActionTypes.SET_SOLAR_LOANS_TOKEN_BALANCE:
      return {
        ...state,
        solarLoanTokenBalance: payload,
      };
    case SmartContractActionTypes.SET_REDEEMABLE_REWARD:
      return {
        ...state,
        redeemableReward: payload,
      };
    case SmartContractActionTypes.SET_TOKENS_REDEEMED:
      return {
        ...state,
        tokensRedeemed: payload,
      };
    case SmartContractActionTypes.SET_INTEREST_RATE:
      return {
        ...state,
        interestRate: payload,
      };
    case SmartContractActionTypes.SET_CONTRIBUTION_DEADLINE:
      return {
        ...state,
        contributionDeadline: payload,
      };
    case SmartContractActionTypes.SET_SOLAR_LOANS_DISTRIBUTED:
      return {
        ...state,
        solarLoansDistributed: payload,
      };
    case SmartContractActionTypes.SET_SOLAR_LOANS_MATURE:
      return {
        ...state,
        solarLoansMature: payload,
      };
    case SmartContractActionTypes.SET_TOTAL_LENT_AMOUNT:
      return {
        ...state,
        totalLentAmount: payload,
      };
    default:
      return state;
  }
};

export { smartContractReducer as smartContract };
