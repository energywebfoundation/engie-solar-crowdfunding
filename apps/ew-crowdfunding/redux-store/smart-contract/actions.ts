import { ethers } from 'ethers';
import { ProviderType } from 'iam-client-lib';
import { getIamService } from '../../context/iam';
import { AppThunk } from '../store';
import { CURRENT_ADDRESS, getFromStorage, PROVIDER_TYPE } from '../localStorage';
import { SmartContractActionTypes } from './types';

export const setAccountBalance = (accountBalance: string) => ({
  type: SmartContractActionTypes.SET_ACCOUNT_BALANCE,
  payload: accountBalance,
});

export const setContribution = () => ({
  type: SmartContractActionTypes.SET_CONTRIBUTION,
});

export const setContributionLimit = () => ({
  type: SmartContractActionTypes.SET_CONTRIBUTION_LIMIT,
});

export const lend = (amount: number) => ({
  type: SmartContractActionTypes.LEND,
  payload: amount,
});

export const redeemSlt = (amount: number) => ({
  type: SmartContractActionTypes.REDEEM_SLT,
  payload: amount,
});

export const getAccountBalance =
  (): AppThunk =>
  async (dispatch): Promise<void> => {
    let accountBalance = '0';
    const providerType = await getFromStorage(PROVIDER_TYPE);
    const currentAddress = await getFromStorage(CURRENT_ADDRESS);
    console.log('currentAddress: ', currentAddress)
    console.log('providerType: ', providerType)
    try {
      if (currentAddress && providerType) {
        const { signerService } = await getIamService(providerType as ProviderType);
        if (signerService) {
          const currentBalance = await signerService.provider.getBalance(currentAddress);
          accountBalance = ethers.utils.formatEther(currentBalance);
        }
      }
    } catch (error) {
      console.log('Some error here: ', error)
    }
    dispatch({
      type: SmartContractActionTypes.SET_ACCOUNT_BALANCE,
      payload: accountBalance,
    });
  };
