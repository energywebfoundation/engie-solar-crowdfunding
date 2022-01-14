import React, { createContext, useCallback, useEffect, useState } from 'react';
import { Web3ActionsEnum } from '../state/actions';
import { UpdateWeb3Values, useWeb3State } from '../state';
import { IWeb3Context, Web3ModalConfig } from './types';
import { getIamService, LoginOptions } from '../iam';
import { getLocalStorage } from './getLocalStorage';
import { setListeners } from './setListeners';
import { isMetamaskExtensionPresent } from '@engie-solar-crowdfunding/ew-crowdfunding/web3-client';
import { DSLAModalsActionsEnum, useDSLAModalsDispatch } from '../../modals';

export const Web3Context = createContext<IWeb3Context>({
  isLoading: false,
  isConnectedToRightNetwork: false,
  isNotificationModalOpen: false,
});

export const Web3ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { provider, providerType, address, chainId, signer, did, dispatch } = useWeb3State();
  const [isLoading, setIsLoading] = useState(true);
  const [isConnectedToRightNetwork, setIsConnectedToRightNetwork] = useState(false);
  const [isMetamaskPresent, setIsMetamaskPresent] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const { getLocalStorageAccount, setLocalStorageAccount, removeLocalStorageAccount } = getLocalStorage();
  const dispatchModals = useDSLAModalsDispatch();

  const handleOnInit = async () => {
    const initialStateValues: UpdateWeb3Values = getLocalStorageAccount();
    dispatch({
      type: Web3ActionsEnum.UPDATE_STATE,
      payload: initialStateValues,
    });
    const { isMetamaskPresent, chainId: browserChainId } = await isMetamaskExtensionPresent();
    const isConnectedChainId =
      process.env.NEXT_PUBLIC_CHAIN_ID.toString() === parseInt(`${browserChainId}`, 16)?.toString();
    setIsConnectedToRightNetwork(isConnectedChainId);
    setIsMetamaskPresent(isMetamaskPresent);
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

  const handleListeners = (config: Web3ModalConfig) => {
    dispatchModals({
      type: DSLAModalsActionsEnum.SHOW_NOTIFICATION,
      payload: {
        open: true,
        config,
      },
    });
    handleClose();
  };

  const login = async (loginOptions: LoginOptions) => {
    setIsLoading(true);
    try {
      if (!window.ethereum) console.error('No Ethereum Provider found on window.ethereum');
      const { signerService } = await getIamService(loginOptions);

      if (signerService?.signer && signerService.address) {
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
    isConnectedToRightNetwork,
    isMetamaskPresent,
    isNotificationModalOpen,
    setIsNotificationModalOpen,
  };

  useEffect(() => {
    handleOnInit();
  }, []);

  return <Web3Context.Provider value={context}>{children}</Web3Context.Provider>;
};
