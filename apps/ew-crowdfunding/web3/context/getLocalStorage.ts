export const CURRENT_ADDRESS = 'CURRENT_ADDRESS';
export const CURRENT_PROVIDER_TYPE = 'CURRENT_PROVIDER_TYPE';
export const CURRENT_CHAIN_ID = 'CURRENT_CHAIN_ID';
export const CURRENT_DID = 'CURRENT_DID';

import { ProviderType } from '@engie-solar-crowdfunding/ew-crowdfunding/web3-client';
import { IWeb3State } from '../state/types';
import { TSetAccount, TGetAccount, TRemoveAccount } from './types';

export const getLocalStorage = () => {
  const setLocalStorageAccount: TSetAccount = ({ address, chainId, providerType, did }: Partial<IWeb3State>) => {
    localStorage.setItem(CURRENT_ADDRESS, address);
    localStorage.setItem(CURRENT_PROVIDER_TYPE, providerType);
    localStorage.setItem(CURRENT_CHAIN_ID, chainId.toString());
    localStorage.setItem(CURRENT_DID, did);
  };

  const getLocalStorageAccount: TGetAccount = () => {
    if (window?.localStorage) {
      const initialState: IWeb3State = {
        address: localStorage.getItem(CURRENT_ADDRESS),
        chainId: +localStorage.getItem(CURRENT_CHAIN_ID),
        providerType: localStorage.getItem(CURRENT_PROVIDER_TYPE) as ProviderType,
        did: localStorage.getItem(CURRENT_DID),
      };
      return initialState;
    }
  };

  const removeLocalStorageAccount: TRemoveAccount = () => {
    localStorage.removeItem(CURRENT_ADDRESS);
    localStorage.removeItem(CURRENT_PROVIDER_TYPE);
    localStorage.removeItem(CURRENT_CHAIN_ID);
    localStorage.removeItem(CURRENT_DID);
  };
  return {
    setLocalStorageAccount,
    getLocalStorageAccount,
    removeLocalStorageAccount,
  };
};
