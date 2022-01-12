import React, { createContext, useCallback, useEffect, useState } from 'react';
import { Web3ActionsEnum } from '../state/actions';
import { UpdateWeb3Values, useWeb3State } from '../state';
import { useProviderEvents } from './useProviderEvents';
import { IWeb3Context } from './types';
import { getIamService, LoginOptions } from '../iam';
import { getLocalStorage } from './getLocalStorage';
import { setListeners } from './setListeners';

export const Web3Context = createContext<IWeb3Context>({ isLoading: false });

export const Web3ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { provider, providerType, address, chainId, signer, did, dispatch } = useWeb3State();
  const [isLoading, setIsLoading] = useState(true);
  const { getLocalStorageAccount, setLocalStorageAccount, removeLocalStorageAccount } = getLocalStorage();

  const handleOnInit = () => {
    const initialStateValues: UpdateWeb3Values = getLocalStorageAccount();
    dispatch({
      type: Web3ActionsEnum.UPDATE_STATE,
      payload: initialStateValues,
    });
  };

  const handleUpdate = useCallback((payload: UpdateWeb3Values) => {
    setLocalStorageAccount(payload);
    dispatch({
      type: Web3ActionsEnum.UPDATE_STATE,
      payload,
    });
  }, []);

  const handleClose = useCallback(() => {
    removeLocalStorageAccount();
    dispatch({ type: Web3ActionsEnum.RESET_STATE });
  }, []);

  const handleListeners = (config) => {
    console.log('Handle listeners: ', config);
    handleClose();
  };

  const { handleEvents } = useProviderEvents(provider, providerType, handleUpdate, handleClose);

  const login = async (loginOptions: LoginOptions) => {
    setIsLoading(true);
    try {
      if (!window.ethereum) console.error('No Ethereum Provider found on window.ethereum');
      const { signerService } = await getIamService(loginOptions);

      if (signerService.address) {
        setListeners(signerService, (config) => handleListeners(config));
        handleUpdate({
          address: signerService?.address,
          providerType: signerService?.providerType,
          chainId: signerService?.chainId,
          provider: signerService?.provider,
          signer: signerService?.signer,
          did: signerService?.did,
        });
      }
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  const logout = async () => {
    if (provider?.disconnect && typeof provider.disconnect === 'function') {
      await provider.disconnect();
    }
    handleClose();
  };

  const context: IWeb3Context = {
    provider,
    providerType,
    address,
    chainId,
    signer,
    did,
    login,
    logout,
    isLoading,
  };

  // useEffect(() => {
  //   handleOnInit();
  // });

  useEffect(() => {
    console.log('This is called !!: ', address);
    handleOnInit();
    if (address) {
      handleEvents();
    }
  }, [address]);

  return <Web3Context.Provider value={context}>{children}</Web3Context.Provider>;
};
