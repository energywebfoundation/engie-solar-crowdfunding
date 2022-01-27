export const CURRENT_ADDRESS = 'CURRENT_ADDRESS';
export const CURRENT_CHAIN_ID = 'CURRENT_CHAIN_ID';
export const CURRENT_DID = 'CURRENT_DID';
export const PROVIDER_TYPE = 'ProviderType';

import { ProviderType, PUBLIC_KEY } from 'iam-client-lib';
import { IWeb3State } from './state/types';
import { TSetAccount, TGetAccount, TRemoveAccount } from './types';

export const getLocalStorage = () => {
  const setLocalStorageAccount: TSetAccount = ({ address, chainId, providerType, did, publicKey }: Partial<IWeb3State>) => {
    localStorage.setItem(CURRENT_ADDRESS, address);
    localStorage.setItem(PROVIDER_TYPE, providerType);
    localStorage.setItem(CURRENT_CHAIN_ID, chainId.toString());
    localStorage.setItem(CURRENT_DID, did);
    localStorage.setItem(PUBLIC_KEY, publicKey);
  };

  const getLocalStorageAccount: TGetAccount = () => {
    if (window?.localStorage) {
      const initialState: IWeb3State = {
        address: localStorage.getItem(CURRENT_ADDRESS),
        chainId: +localStorage.getItem(CURRENT_CHAIN_ID),
        providerType: localStorage.getItem(PROVIDER_TYPE) as ProviderType,
        did: localStorage.getItem(CURRENT_DID),
        publicKey: localStorage.getItem(PUBLIC_KEY),
        authenticated: Boolean(localStorage.getItem(CURRENT_ADDRESS)) && Boolean(localStorage.getItem(PROVIDER_TYPE)),
      };
      return initialState;
    }
  };

  const removeLocalStorageAccount: TRemoveAccount = () => {
    localStorage.removeItem(CURRENT_ADDRESS);
    localStorage.removeItem(PROVIDER_TYPE);
    localStorage.removeItem(CURRENT_CHAIN_ID);
    localStorage.removeItem(CURRENT_DID);
    localStorage.removeItem(PUBLIC_KEY);
  };

  const isSessionActive = () => {
    return Boolean(localStorage.getItem(PROVIDER_TYPE)) && Boolean(localStorage.getItem(PUBLIC_KEY));
  };

  return {
    setLocalStorageAccount,
    getLocalStorageAccount,
    removeLocalStorageAccount,
    isSessionActive,
  };
};
