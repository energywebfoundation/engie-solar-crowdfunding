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
  interestRate: null,
  totalLentAmount: null,
  error: null,
  isPaused: false,
  isTerminated: false,
  isInitialized: false,
  owner: null,
  // Dates
  activateStakingDate: null,
  closeStackingDate: null,
  lockStakesDate: null,
  releaseRewardsDate: null,
  finalStopDate: null,
};

const smartContractReducer: Reducer<SmartContractReducerState> = (
  state: SmartContractReducerState = initialState,
  { type, payload, error },
) => {
  switch (type) {
    case SmartContractActionTypes.SET_LOADING:
      return {
        ...state,
        loading: payload,
      };
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
    case SmartContractActionTypes.SET_INTEREST_RATE:
      return {
        ...state,
        interestRate: payload,
      };
    case SmartContractActionTypes.SET_CLOSE_STACKING_DATE:
      return {
        ...state,
        closeStackingDate: payload,
      };
    case SmartContractActionTypes.SET_LOCK_STAKES_DATE:
      return {
        ...state,
        lockStakesDate: payload,
      };
    case SmartContractActionTypes.SET_RELEASE_REWARDS_DATE:
      return {
        ...state,
        releaseRewardsDate: payload,
      };
    case SmartContractActionTypes.SET_TOTAL_LENT_AMOUNT:
      return {
        ...state,
        totalLentAmount: payload,
      };
    case SmartContractActionTypes.SET_ACTIVATE_STACKING_DATE:
      return {
        ...state,
        activateStakingDate: payload,
      };
    case SmartContractActionTypes.SET_FINAL_STOP_DATE:
      return {
        ...state,
        finalStopDate: payload,
      };
    case SmartContractActionTypes.SET_CONTRACT_STATUS:
      return {
        ...state,
        isInitialized: payload.isInitialized,
        isTerminated: payload.isTerminated,
        isPaused: payload.isPaused,
      };
    case SmartContractActionTypes.GET_OWNER:
      return {
        ...state,
        owner: payload.owner
      }
    default:
      return state;
  }
};

export { smartContractReducer as smartContract };
