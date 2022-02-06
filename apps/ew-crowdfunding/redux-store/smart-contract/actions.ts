import { ethers } from 'ethers';
import { ProviderType } from 'iam-client-lib';
import { CURRENT_ADDRESS, getFromStorage, PROVIDER_TYPE } from '../../context';
import { getIamService } from '../../context/web3/iam';
import { AppThunk } from '../store';
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

    if (currentAddress && providerType) {
      const { signerService } = await getIamService(providerType as ProviderType);
      if (signerService) {
        const currentBalance = await signerService.provider.getBalance(currentAddress);
        accountBalance = ethers.utils.formatEther(currentBalance);
      }
    }
    dispatch({
      type: SmartContractActionTypes.SET_ACCOUNT_BALANCE,
      payload: accountBalance,
    });
  };
