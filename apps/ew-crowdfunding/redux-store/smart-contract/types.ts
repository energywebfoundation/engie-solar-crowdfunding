export interface SmartContractReducerState {
  loading: boolean;
  accountBalance: number;
  userContribution: number;
  solarLoanTokenBalance: number;
  redeemableReward: number;
  tokensRedeemed: number;
  error: string;
}

export const SmartContractActionTypes = {
  SET_ACCOUNT_BALANCE: 'SET_ACCOUNT_BALANCE',
  SET_CONTRIBUTION: 'SET_CONTRIBUTION',
  SET_CONTRIBUTION_LIMIT: 'SET_CONTRIBUTION_LIMIT',
  LEND: 'LEND',
  REDEEM_SLT: 'REDEEM_SLT',
  GET_ROLE: 'GET_ROLE',
};
