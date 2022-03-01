/* eslint-disable @typescript-eslint/no-explicit-any */
import { ethers } from 'ethers';
import { DSLAModalsActionsEnum } from '../../context';
import { TDSLAModalsAction } from '../../context/modals/types';
import { AppThunk } from '../store';
import { SmartContractActionTypes } from './types';
import { Action, ActionCreator } from 'redux';
import { Staking__factory, Staking } from '@engie-solar-crowdfunding/ew-crowdfunding/smart-contracts';

export const setAccountBalance: ActionCreator<Action> = (accountBalance: string) => ({
  type: SmartContractActionTypes.SET_ACCOUNT_BALANCE,
  payload: accountBalance,
});

export const setTokenLimit: ActionCreator<Action> = (tokenLimit: string) => ({
  type: SmartContractActionTypes.SET_TOKEN_LIMIT,
  payload: tokenLimit,
});

export const setContribution: ActionCreator<Action> = () => ({
  type: SmartContractActionTypes.SET_CONTRIBUTION,
});

export const lend =
  (amount: number, dispatchModals: React.Dispatch<TDSLAModalsAction>): AppThunk =>
  async (dispatch): Promise<void> => {
    console.log('Lending amount: ', amount);
    dispatchModals({
      type: DSLAModalsActionsEnum.SHOW_CONGRATS,
      payload: {
        open: true,
      },
    });
  };

export const redeemSlt =
  (amount: number): AppThunk =>
  async (dispatch): Promise<void> => {
    console.log('Redeeming amount: ', amount);
  };

export const getAccountBalance =
  (provider: any, currentAddress: string): AppThunk =>
  async (dispatch): Promise<void> => {
    let formattedAccountBalance = '0';
    try {
      const currentBalance = await provider.getBalance(currentAddress);
      const accountBalance = ethers.utils.formatEther(currentBalance);
      formattedAccountBalance = `${Number(accountBalance).toPrecision(3)}`;
      dispatch({
        type: SmartContractActionTypes.SET_ACCOUNT_BALANCE,
        payload: formattedAccountBalance,
      });
    } catch {
      console.log('Error getting account balance');
    }
  };

export const getTokenLimit =
  (): AppThunk =>
  async (dispatch): Promise<void> => {
    const tokenLimit = Number(process.env.NEXT_PUBLIC_TOKEN_LIMIT);
    dispatch({
      type: SmartContractActionTypes.SET_TOKEN_LIMIT,
      payload: tokenLimit,
    });
  };

export const getGlobalTokenLimit =
  (): AppThunk =>
  async (dispatch): Promise<void> => {
    const stakingPool = {
      address: '0x0BB89202CF5ec4fA68C5A6cD3456e8f0a1f9Fd3d', // find a proper way way to get this value from deployed contract
    };
   
    if (Staking__factory) {
      const stakingBytcode = Staking__factory.bytecode;
      const stakingInterface = Staking__factory.createInterface();
      const stakingContract = new Staking__factory(stakingInterface, stakingBytcode).attach(stakingPool.address);
    }
    /* ***********************************************************************  */
    /*         First way to interact with smart-contract                        */
    /*                                                                          */
    /*           await stakingContract.withdrawAll()                            */
    /*                                                                          */
    /* ***********************************************************************  */
    /*        Alternaive way to call contract functions                         */
    /*                                                                          */
    /* const staking = new Staking(stakingPool.address, stakingInterface)       */
    /*  await staking.withdrawAll()                                             */
    /* ***********************************************************************  */

    const globalTokenLimit = Number(process.env.NEXT_PUBLIC_GLOBAL_TOKEN_LIMIT);
    dispatch({
      type: SmartContractActionTypes.SET_GLOBAL_TOKEN_LIMIT,
      payload: globalTokenLimit,
    });
  };

export const getUserContribution =
  (): AppThunk =>
  async (dispatch): Promise<void> => {
    // This will be taken from the smart contract
    const userContribution = 100;
    dispatch({
      type: SmartContractActionTypes.SET_CONTRIBUTION,
      payload: userContribution,
    });
  };

export const getSolarLoanTokenBalance =
  (): AppThunk =>
  async (dispatch): Promise<void> => {
    // This will be taken from the smart contract
    const solarLoanTokenBalance = 400;
    dispatch({
      type: SmartContractActionTypes.SET_SOLAR_LOANS_TOKEN_BALANCE,
      payload: solarLoanTokenBalance,
    });
  };

export const getRedeemableReward =
  (): AppThunk =>
  async (dispatch): Promise<void> => {
    // This will be taken from the smart contract
    const redeemableReward = 50;
    dispatch({
      type: SmartContractActionTypes.SET_REDEEMABLE_REWARD,
      payload: redeemableReward,
    });
  };

export const getTokensRedeemed =
  (): AppThunk =>
  async (dispatch): Promise<void> => {
    // This will be taken from the smart contract
    const tokensRedeemed = 137;
    dispatch({
      type: SmartContractActionTypes.SET_TOKENS_REDEEMED,
      payload: tokensRedeemed,
    });
  };

export const getInterestRate =
  (): AppThunk =>
  async (dispatch): Promise<void> => {
    const interestRate = process.env.NEXT_PUBLIC_INTEREST_RATE;
    dispatch({
      type: SmartContractActionTypes.SET_INTEREST_RATE,
      payload: interestRate,
    });
  };

export const getContributionDeadline =
  (): AppThunk =>
  async (dispatch): Promise<void> => {
    const contributionDeadline = process.env.NEXT_PUBLIC_CONTRIBUTION_DEADLINE;
    dispatch({
      type: SmartContractActionTypes.SET_CONTRIBUTION_DEADLINE,
      payload: contributionDeadline,
    });
  };

export const getSolarLoansDistributed =
  (): AppThunk =>
  async (dispatch): Promise<void> => {
    const solarLoansDistributed = process.env.NEXT_PUBLIC_SOLAR_LOANS_DISTRIBUTED;
    dispatch({
      type: SmartContractActionTypes.SET_SOLAR_LOANS_DISTRIBUTED,
      payload: solarLoansDistributed,
    });
  };

export const getSolarLoansMature =
  (): AppThunk =>
  async (dispatch): Promise<void> => {
    const solarLoansMature = process.env.NEXT_PUBLIC_SOLAR_LOANS_MATURE;
    dispatch({
      type: SmartContractActionTypes.SET_SOLAR_LOANS_MATURE,
      payload: solarLoansMature,
    });
  };

export const getTotalLentAmount =
  (): AppThunk =>
  async (dispatch): Promise<void> => {
    // This will be taken from the smart contract
    const totalLentAmount = 5740;
    dispatch({
      type: SmartContractActionTypes.SET_TOTAL_LENT_AMOUNT,
      payload: totalLentAmount,
    });
  };
