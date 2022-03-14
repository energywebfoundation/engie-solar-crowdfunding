export interface SmartContractReducerState {
  loading: boolean;
  accountBalance: number;
  tokenLimit: number;
  globalTokenLimit: number;
  userContribution: number;
  solarLoanTokenBalance: number;
  redeemableReward: number;
  interestRate: string;
  totalLentAmount: number;
  error: string;
  isPaused: boolean;
  isTerminated: boolean;
  isInitialized: boolean;
  // Dates
  activateStakingDate: string; // Sign up start from Smart Contract (users can stake, still enroll and withdraw EWT without rewards)
  closeStackingDate: string; // Signup end from Smart Contract (users cannot stake, enroll or withdraw EWT/SLT)
  lockStakesDate: string; // Start Date from Smart Contract (people cannot withdraw for 1 year, rewards are starting to get calculated)
  releaseRewardsDate: string; // End Date from Smart Contract  (people can withdraw EWT + rewards but NOT stake or receive SLTs)
}

export const SmartContractActionTypes = {
  GET_ACCOUNT_BALANCE: 'GET_ACCOUNT_BALANCE',
  SET_ACCOUNT_BALANCE: 'SET_ACCOUNT_BALANCE',
  SET_LOADING: 'SET_LOADING',
  SET_TOKEN_LIMIT: 'SET_TOKEN_LIMIT',
  SET_GLOBAL_TOKEN_LIMIT: 'SET_GLOBAL_TOKEN_LIMIT',
  SET_CONTRIBUTION: 'SET_CONTRIBUTION',
  SET_SOLAR_LOANS_TOKEN_BALANCE: 'SET_SOLAR_LOANS_TOKEN_BALANCE',
  SET_REDEEMABLE_REWARD: 'SET_REDEEMABLE_REWARD',
  SET_INTEREST_RATE: 'SET_INTEREST_RATE',
  SET_CLOSE_STACKING_DATE: 'SET_CLOSE_STACKING_DATE',
  SET_LOCK_STAKES_DATE: 'SET_LOCK_STAKES_DATE',
  SET_ACTIVATE_STACKING_DATE: 'SET_ACTIVATE_STACKING_DATE',
  SET_RELEASE_REWARDS_DATE: 'SET_RELEASE_REWARDS_DATE',
  SET_TOTAL_LENT_AMOUNT: 'SET_TOTAL_LENT_AMOUNT',
  SET_CONTRACT_STATUS: 'SET_CONTRACT_STATUS',
  GET_ROLE: 'GET_ROLE',
};
