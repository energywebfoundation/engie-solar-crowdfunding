/* eslint-disable @typescript-eslint/no-explicit-any */
import { ethers } from 'ethers';
import { DSLAModalsActionsEnum } from '../../context';
import { TDSLAModalsAction } from '../../context/modals/types';
import { AppThunk } from '../store';
import { SmartContractActionTypes } from './types';
import { Action, ActionCreator } from 'redux';
import { Staking__factory, deployedAddress } from '@engie-solar-crowdfunding/ew-crowdfunding/smart-contracts';

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

export const setLoading: ActionCreator<Action> = (loading: boolean) => ({
  type: SmartContractActionTypes.SET_LOADING,
  payload: loading,
});

export const lend =
  (amount: number, dispatchModals: React.Dispatch<TDSLAModalsAction>, provider: any): AppThunk =>
  async (dispatch): Promise<void> => {
    const ledingAmount = ethers.utils.parseEther(amount.toString());
    const signer = provider.getSigner();
    const stakingContract = Staking__factory.connect(deployedAddress, provider);
    try {
      dispatch({
        type: SmartContractActionTypes.SET_LOADING,
        payload: true,
      });
      const stackingTx = await stakingContract.connect(signer).stake({ value: ledingAmount });
      await stackingTx.wait();
      dispatch({
        type: SmartContractActionTypes.SET_LOADING,
        payload: false,
      });
      dispatchModals({
        type: DSLAModalsActionsEnum.SHOW_CONGRATS,
        payload: {
          open: true,
        },
      });
    } catch (error) {
      dispatch({
        type: SmartContractActionTypes.SET_LOADING,
        payload: false,
      });
      console.log('Error while lending: ', error);
    }
  };

export const redeemSlt =
  (amount: number, provider: any): AppThunk =>
  async (dispatch): Promise<void> => {
    const redeemingAmount = ethers.utils.parseEther(amount.toString());
    const signer = provider.getSigner();
    const stakingContract = Staking__factory.connect(deployedAddress, provider);
    try {
      dispatch({
        type: SmartContractActionTypes.SET_LOADING,
        payload: true,
      });
      const redeemTx = await stakingContract.connect(signer).redeem(redeemingAmount);
      await redeemTx.wait();
      dispatch({
        type: SmartContractActionTypes.SET_LOADING,
        payload: false,
      });
    } catch (error) {
      console.log('Error while lending: ', error);
    }
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
  (provider: any): AppThunk =>
  async (dispatch): Promise<void> => {
    const stakingContract = Staking__factory.connect(deployedAddress, provider);
    const contributionLimit = (await stakingContract.contributionLimit()).toString();
    const tokenLimit = ethers.utils.formatEther(contributionLimit);

    dispatch({
      type: SmartContractActionTypes.SET_TOKEN_LIMIT,
      payload: tokenLimit,
    });
  };

export const getGlobalTokenLimit =
  (provider: any): AppThunk =>
  async (dispatch): Promise<void> => {
    const stakingContract = Staking__factory.connect(deployedAddress, provider);
    const hardCap = (await stakingContract.hardCap()).toString();
    const globalTokenLimit = ethers.utils.formatEther(hardCap);

    dispatch({
      type: SmartContractActionTypes.SET_GLOBAL_TOKEN_LIMIT,
      payload: globalTokenLimit,
    });
  };

export const getUserContribution =
  (provider: any): AppThunk =>
  async (dispatch): Promise<void> => {
    const stakingContract = Staking__factory.connect(deployedAddress, provider);
    const contribution = (await stakingContract.getDeposit()).toString();
    const userContribution = ethers.utils.formatEther(contribution);
    dispatch({
      type: SmartContractActionTypes.SET_CONTRIBUTION,
      payload: userContribution,
    });
  };

export const getSolarLoanTokenBalance =
  (provider: any, currentAddress: string): AppThunk =>
  async (dispatch): Promise<void> => {
    const stakingContract = Staking__factory.connect(deployedAddress, provider);
    const balanceOf = (await stakingContract.balanceOf(currentAddress)).toString();
    const solarLoanTokenBalance = ethers.utils.formatEther(balanceOf);
    dispatch({
      type: SmartContractActionTypes.SET_SOLAR_LOANS_TOKEN_BALANCE,
      payload: solarLoanTokenBalance,
    });
  };

export const getRedeemableReward =
  (provider: any): AppThunk =>
  async (dispatch): Promise<void> => {
    const stakingContract = await Staking__factory.connect(deployedAddress, provider);
    try {
      const rewards = await stakingContract.connect(provider.getSigner()).getRewards();
      const redeemableReward = ethers.utils.formatEther(rewards);
      dispatch({
        type: SmartContractActionTypes.SET_REDEEMABLE_REWARD,
        payload: redeemableReward,
      });
    } catch (err) {
      console.log();
      throw `An Error Occurred : ${err}`;
    }
  };

// Sign up start from Smart Contract
export const getActivateStackingDate =
  (provider: any): AppThunk =>
  async (dispatch): Promise<void> => {
    const stakingContract = Staking__factory.connect(deployedAddress, provider);
    const signupStart: number = +(await stakingContract.signupStart()).toString();
    const activateStackingDate = new Date(signupStart * 1000);
    dispatch({
      type: SmartContractActionTypes.SET_ACTIVATE_STACKING_DATE,
      payload: activateStackingDate,
    });
  };

// Lending is disabled when current date is greater or equal
export const getCloseStackingDate =
  (provider: any): AppThunk =>
  async (dispatch): Promise<void> => {
    const stakingContract = Staking__factory.connect(deployedAddress, provider);
    const signupEnd: number = +(await stakingContract.signupEnd()).toString();
    const closeStackingDate = new Date(signupEnd * 1000);
    dispatch({
      type: SmartContractActionTypes.SET_CLOSE_STACKING_DATE,
      payload: closeStackingDate,
    });
  };

// Enrollment & Lending is disabled until current date is greater or equal
export const getLockStakesDate =
  (provider: any): AppThunk =>
  async (dispatch): Promise<void> => {
    const stakingContract = Staking__factory.connect(deployedAddress, provider);
    const startDate: number = +(await stakingContract.startDate()).toString();
    const lockStakesDate = new Date(startDate * 1000);
    dispatch({
      type: SmartContractActionTypes.SET_LOCK_STAKES_DATE,
      payload: lockStakesDate,
    });
  };

// Campaign ends
export const getReleaseRewardsDate =
  (provider: any): AppThunk =>
  async (dispatch): Promise<void> => {
    const stakingContract = Staking__factory.connect(deployedAddress, provider);
    const endDate: number = +(await stakingContract.endDate()).toString();
    const releaseRewardsDate = new Date(endDate * 1000);

    dispatch({
      type: SmartContractActionTypes.SET_RELEASE_REWARDS_DATE,
      payload: releaseRewardsDate,
    });
  };

export const getTotalLentAmount =
  (provider: any): AppThunk =>
  async (dispatch): Promise<void> => {
    const stakingContract = Staking__factory.connect(deployedAddress, provider);
    const lentAmount = await (await stakingContract.totalStaked()).toString();
    const totalLentAmount = ethers.utils.formatEther(lentAmount);
    dispatch({
      type: SmartContractActionTypes.SET_TOTAL_LENT_AMOUNT,
      payload: totalLentAmount,
    });
  };
