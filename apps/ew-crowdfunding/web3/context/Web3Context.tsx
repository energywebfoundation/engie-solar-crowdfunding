import React, { createContext, useCallback, useEffect } from 'react';
import { Web3ActionsEnum } from '../state/actions';
import { UpdateWeb3Values, useWeb3State } from '../state';
import { useProviderEvents } from './useProviderEvents';
import { IWeb3Context } from './types';
import { getIamService, LoginOptions } from '../iam';

export const Web3Context = createContext<IWeb3Context>({});

export const Web3ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { provider, web3Provider, address, chainId, dispatch } = useWeb3State();

  const handleUpdate = useCallback((payload: UpdateWeb3Values) => {
    dispatch({
      type: Web3ActionsEnum.UPDATE_STATE,
      payload,
    });
  }, []);

  const handleClose = useCallback(() => {
    dispatch({ type: Web3ActionsEnum.RESET_STATE });
  }, []);

  const { handleEvents } = useProviderEvents(provider, handleUpdate, handleClose);

  const login = async (loginOptions: LoginOptions) => {
    const {
      signerService,
      messagingService,
      // domainsService,
      // stakingPoolService,
      // assetsService,
      // cacheClient,
      // didRegistry,
      // claimsService,
    } = await getIamService(loginOptions);
    // handleUpdate({
    //   address,
    //   chainId: network.chainId,
    //   provider,
    // });
  };

  const logout = useCallback(async () => {
    if (provider?.disconnect && typeof provider.disconnect === 'function') {
      await provider.disconnect();
    }
    handleClose();
  }, []);

  useEffect(() => {
    if (address) {
      handleEvents();
    }
  }, []);

  const context: IWeb3Context = {
    // provider,
    // web3Provider,
    // address,
    // chainId,
    login,
    logout,
  };

  return <Web3Context.Provider value={context}>{children}</Web3Context.Provider>;
};
