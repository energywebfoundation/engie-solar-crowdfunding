/* eslint-disable @typescript-eslint/no-explicit-any */
import { ethers } from 'ethers';
import { DSLAModalsActionsEnum } from '../../context';
import { TDSLAModalsAction } from '../../context/modals/types';
import { AppThunk } from '../store';
import { SmartContractActionTypes } from './types';
import { Action, ActionCreator } from 'redux';
import { Staking__factory, deployedAddress } from '@engie-solar-crowdfunding/ew-crowdfunding/smart-contracts';
import { formatUTCDate, formatUTCTimestamp } from '../../utils';

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
  (
    amount: number,
    dispatchModals: React.Dispatch<TDSLAModalsAction>,
    provider: any,
    currentAddress: string,
  ): AppThunk =>
  async (dispatch): Promise<void> => {
    const ledingAmount = ethers.utils.parseEther(amount.toString());
    const signer = provider?.getSigner();
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

      dispatch(getAccountBalance(provider, currentAddress));
      dispatch(getUserContribution(provider));
      dispatch(getSolarLoanTokenBalance(provider, currentAddress));
      dispatch(getRedeemableReward(provider));
      dispatch(getTotalLentAmount(provider));

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
  (amount: number, provider: any, currentAddress: string): AppThunk =>
  async (dispatch): Promise<void> => {
    const redeemingAmount = ethers.utils.parseEther(amount.toString());
    const signer = provider?.getSigner();
    const stakingContract = Staking__factory.connect(deployedAddress, signer);
    try {
      dispatch({
        type: SmartContractActionTypes.SET_LOADING,
        payload: true,
      });
      const redeemTx = await stakingContract.redeem(redeemingAmount);
      await redeemTx.wait();

      dispatch({
        type: SmartContractActionTypes.SET_LOADING,
        payload: false,
      });

      dispatch(getAccountBalance(provider, currentAddress));
      dispatch(getUserContribution(provider));
      dispatch(getSolarLoanTokenBalance(provider, currentAddress));
      dispatch(getRedeemableReward(provider));
      dispatch(getTotalLentAmount(provider));
    } catch (error) {
      console.log('Error while redeeming: ', error);
    }
  };

export const redeemAllSlt =
  (provider: any, currentAddress: string): AppThunk =>
  async (dispatch): Promise<void> => {
    const signer = provider?.getSigner();
    const stakingContract = Staking__factory.connect(deployedAddress, signer);
    try {
      dispatch({
        type: SmartContractActionTypes.SET_LOADING,
        payload: true,
      });
      const redeemTx = await stakingContract.redeemAll();
      await redeemTx.wait();

      dispatch({
        type: SmartContractActionTypes.SET_LOADING,
        payload: false,
      });

      dispatch(getAccountBalance(provider, currentAddress));
      dispatch(getUserContribution(provider));
      dispatch(getSolarLoanTokenBalance(provider, currentAddress));
      dispatch(getRedeemableReward(provider));
      dispatch(getTotalLentAmount(provider));
    } catch (error) {
      console.log('Error while redeeming: ', error);
    }
  };

export const getAccountBalance =
  (provider: any, currentAddress: string): AppThunk =>
  async (dispatch): Promise<void> => {
    try {
      const currentBalance = await provider.getBalance(currentAddress);
      const accountBalance = ethers.utils.formatEther(currentBalance);
      dispatch({
        type: SmartContractActionTypes.SET_ACCOUNT_BALANCE,
        payload: accountBalance,
      });
    } catch {
      console.log('Error getting account balance');
    }
  };

export const getTokenLimit =
  (provider: any): AppThunk =>
  async (dispatch): Promise<void> => {
    try {
      const stakingContract = Staking__factory.connect(deployedAddress, provider);
      const contributionLimit = (await stakingContract.contributionLimit()).toString();
      const tokenLimit = ethers.utils.formatEther(contributionLimit);

      dispatch({
        type: SmartContractActionTypes.SET_TOKEN_LIMIT,
        payload: tokenLimit,
      });
    } catch (error) {
      console.log('getTokenLimit: ', error);
    }
  };

export const getGlobalTokenLimit =
  (provider: any): AppThunk =>
  async (dispatch): Promise<void> => {
    try {
      const stakingContract = Staking__factory.connect(deployedAddress, provider);
      const hardCap = (await stakingContract.hardCap()).toString();
      const globalTokenLimit = ethers.utils.formatEther(hardCap);

      dispatch({
        type: SmartContractActionTypes.SET_GLOBAL_TOKEN_LIMIT,
        payload: globalTokenLimit,
      });
    } catch (error) {
      console.log('getGlobalTokenLimit: ', error);
    }
  };

export const getUserContribution =
  (provider: any): AppThunk =>
  async (dispatch): Promise<void> => {
    try {
      const stakingContract = Staking__factory.connect(deployedAddress, provider?.getSigner());
      const contribution = (await stakingContract.getDeposit()).toString();
      const userContribution = ethers.utils.formatEther(contribution);
      dispatch({
        type: SmartContractActionTypes.SET_CONTRIBUTION,
        payload: userContribution,
      });
    } catch (error) {
      console.log('getUserContribution: ', error);
    }
  };

export const getSolarLoanTokenBalance =
  (provider: any, currentAddress: string): AppThunk =>
  async (dispatch): Promise<void> => {
    try {
      const stakingContract = Staking__factory.connect(deployedAddress, provider?.getSigner());
      const balanceOf = (await stakingContract.balanceOf(currentAddress)).toString();
      const solarLoanTokenBalance = ethers.utils.formatEther(balanceOf);
      dispatch({
        type: SmartContractActionTypes.SET_SOLAR_LOANS_TOKEN_BALANCE,
        payload: solarLoanTokenBalance,
      });
    } catch (error) {
      console.log('getSolarLoanTokenBalance: ', error);
    }
  };

export const getRedeemableReward =
  (provider: any): AppThunk =>
  async (dispatch): Promise<void> => {
    try {
      const stakingContract = await Staking__factory.connect(deployedAddress, provider?.getSigner());
      const rewards = await stakingContract.getRewards();
      const redeemableReward = ethers.utils.formatEther(rewards);
      dispatch({
        type: SmartContractActionTypes.SET_REDEEMABLE_REWARD,
        payload: redeemableReward,
      });
    } catch (err) {
      console.log(`An Error Occurred : ${JSON.stringify(err)}`);
      dispatch({
        type: SmartContractActionTypes.SET_REDEEMABLE_REWARD,
        payload: 0,
      });
    }
  };

export const getActivateStackingDate =
  (provider: any): AppThunk =>
  async (dispatch): Promise<void> => {
    try {
      const stakingContract = Staking__factory.connect(deployedAddress, provider);
      const signupStart: number = +(await stakingContract.signupStart()).toString();
      const activateStackingDate = formatUTCTimestamp(signupStart);
      dispatch({
        type: SmartContractActionTypes.SET_ACTIVATE_STACKING_DATE,
        payload: activateStackingDate,
      });
    } catch (error) {
      console.log('getActivateStackingDate: ', error);
    }
  };

export const getCloseStackingDate =
  (provider: any): AppThunk =>
  async (dispatch): Promise<void> => {
    try {
      const stakingContract = Staking__factory.connect(deployedAddress, provider);
      const signupEnd: number = +(await stakingContract.signupEnd()).toString();
      const closeStackingDate =
        signupEnd !== 0 ? formatUTCTimestamp(signupEnd) : formatUTCDate(process.env.NEXT_PUBLIC_CLOSE_STAKING_DATE);
      dispatch({
        type: SmartContractActionTypes.SET_CLOSE_STACKING_DATE,
        payload: closeStackingDate,
      });
    } catch (error) {
      console.log('getCloseStackingDate: ', error);
    }
  };

export const getLockStakesDate =
  (provider: any): AppThunk =>
  async (dispatch): Promise<void> => {
    try {
      const stakingContract = Staking__factory.connect(deployedAddress, provider);
      const startDate: number = +(await stakingContract.startDate()).toString();
      const lockStakesDate = formatUTCTimestamp(startDate);
      dispatch({
        type: SmartContractActionTypes.SET_LOCK_STAKES_DATE,
        payload: lockStakesDate,
      });
    } catch (error) {
      console.log('getLockStakesDate: ', error);
    }
  };

export const getReleaseRewardsDate =
  (provider: any): AppThunk =>
  async (dispatch): Promise<void> => {
    try {
      const stakingContract = Staking__factory.connect(deployedAddress, provider);
      const endDate: number = +(await stakingContract.endDate()).toString();
      const releaseRewardsDate = formatUTCTimestamp(endDate);

      dispatch({
        type: SmartContractActionTypes.SET_RELEASE_REWARDS_DATE,
        payload: releaseRewardsDate,
      });
    } catch (error) {
      console.log('getReleaseRewardsDate: ', error);
    }
  };

export const getFinalStopDate =
  (provider: any): AppThunk =>
  async (dispatch): Promise<void> => {
    try {
      const stakingContract = Staking__factory.connect(deployedAddress, provider);
      const fullStopDate: number = +(await stakingContract.fullStopDate()).toString();
      const finalStopDate = formatUTCTimestamp(fullStopDate);

      dispatch({
        type: SmartContractActionTypes.SET_FINAL_STOP_DATE,
        payload: finalStopDate,
      });
    } catch (error) {
      console.log('getFinalStopDate: ', error);
    }
  };

export const getTotalLentAmount =
  (provider: any): AppThunk =>
  async (dispatch): Promise<void> => {
    try {
      const stakingContract = Staking__factory.connect(deployedAddress, provider?.getSigner());
      const lentAmount = await (await stakingContract.totalStaked()).toString();
      const totalLentAmount = ethers.utils.formatEther(lentAmount);
      dispatch({
        type: SmartContractActionTypes.SET_TOTAL_LENT_AMOUNT,
        payload: totalLentAmount,
      });
    } catch (error) {
      console.log('getTotalLentAmount: ', error);
    }
  };

export const getContractStatus =
  (provider: any): AppThunk =>
  async (dispatch): Promise<void> => {
    try {
      const stakingContract = Staking__factory.connect(deployedAddress, provider);
      const contractStatus = await stakingContract.getContractStatus();

      dispatch({
        type: SmartContractActionTypes.SET_CONTRACT_STATUS,
        payload: {
          isInitialized: contractStatus._isContractInitialized,
          isPaused: contractStatus._isContractPaused,
          isTerminated: contractStatus._isContractAborted,
        },
      });
    } catch (error) {
      console.log('getContractStatus: ', error);
    }
  };

  export const getOwner =
  (provider: any): AppThunk =>
  async (dispatch): Promise<void> => {
    try {
      const stakingContract = Staking__factory.connect(deployedAddress, provider?.getSigner());
      const owner = (await stakingContract.getOwner()).toString();
      dispatch({
        type: SmartContractActionTypes.GET_OWNER,
        payload: {owner},
      });
    } catch (error) {
      console.log('getOwnerError: ', error);
    }
  };