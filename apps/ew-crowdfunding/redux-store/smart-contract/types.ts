export interface SmartContractReducerState {
  loading: boolean;
  accountBalance: number;
  tokenLimit: number;
  globalTokenLimit: number;
  userContribution: number;
  solarLoanTokenBalance: number;
  redeemableReward: number;
  tokensRedeemed: number;
  interestRate: string;
  contributionDeadline: string;
  solarLoansDistributed: string;
  solarLoansMature: string;
  totalLentAmount: number;
  error: string;
}

export const SmartContractActionTypes = {
  SET_ACCOUNT_BALANCE: 'SET_ACCOUNT_BALANCE',
  SET_TOKEN_LIMIT: 'SET_TOKEN_LIMIT',
  SET_GLOBAL_TOKEN_LIMIT: 'SET_GLOBAL_TOKEN_LIMIT',
  SET_CONTRIBUTION: 'SET_CONTRIBUTION',
  SET_SOLAR_LOANS_TOKEN_BALANCE: 'SET_SOLAR_LOANS_TOKEN_BALANCE',
  SET_REDEEMABLE_REWARD: 'SET_REDEEMABLE_REWARD',
  SET_TOKENS_REDEEMED: 'SET_TOKENS_REDEEMED',
  SET_INTEREST_RATE: 'SET_INTEREST_RATE',
  SET_CONTRIBUTION_DEADLINE: 'SET_CONTRIBUTION_DEADLINE',
  SET_SOLAR_LOANS_DISTRIBUTED: 'SET_SOLAR_LOANS_DISTRIBUTED',
  SET_SOLAR_LOANS_MATURE: 'SET_SOLAR_LOANS_MATURE',
  SET_TOTAL_LENT_AMOUNT: 'SET_TOTAL_LENT_AMOUNT',
  GET_ROLE: 'GET_ROLE',
};
