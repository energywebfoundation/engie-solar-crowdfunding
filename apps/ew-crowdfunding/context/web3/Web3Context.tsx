import React, { createContext, useEffect, useState } from 'react';
import { Web3ActionsEnum } from './state/actions';
import { UpdateWeb3Values, useWeb3State } from './state';
import { IWeb3Context, Web3ModalConfig } from './types';
import { getIamService, LoginOptions } from './iam';
import { getLocalStorageAccount, removeLocalStorageAccount, setLocalStorageAccount } from './localStorage';
import { setListeners } from './setListeners';
import { isMetamaskExtensionPresent, ProviderType } from 'iam-client-lib';
import { useDSLAModalsDispatch, DSLAModalsActionsEnum } from '../modals';
import WalletConnectProvider from '@walletconnect/ethereum-provider';
import { PROVIDER_TYPE } from '.';

// declare global {
//   interface Window {
//     /* eslint-disable @typescript-eslint/no-explicit-any */
//     ethereum: any;
//     web3: any;
//     /* eslint-enable */
//   }
// }

export const Web3Context = createContext<IWeb3Context>({
  isLoading: false,
  isConnectedToRightNetwork: false,
});

export const Web3ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    provider,
    providerType,
    address,
    chainId,
    signer,
    did,
    dispatch,
    publicKey,
    authenticated,
    roleEnrolmentStatus,
  } = useWeb3State();
  const [isLoading, setIsLoading] = useState(false);
  const [isConnectedToRightNetwork, setIsConnectedToRightNetwork] = useState(false);
  const [isMetamaskPresent, setIsMetamaskPresent] = useState(false);
  const dispatchModals = useDSLAModalsDispatch();

  const handleOnInit = async () => {
    const initialStateValues: UpdateWeb3Values = getLocalStorageAccount();
    if (localStorage.getItem(PROVIDER_TYPE)) {
      const { signerService, roleEnrolmentStatus } = await getIamService(localStorage.getItem(PROVIDER_TYPE) as ProviderType);
      dispatch({
        type: Web3ActionsEnum.UPDATE_STATE,
        payload: { ...initialStateValues, roleEnrolmentStatus, isEthSigner: signerService?.isEthSigner?.toString() },
      });
      setListeners(signerService, (config) => handleListeners(config));
    } else {
      dispatch({
        type: Web3ActionsEnum.UPDATE_STATE,
        payload: initialStateValues,
      });
    }
    const { isMetamaskPresent, chainId: browserChainId } = await isMetamaskExtensionPresent();
    const isConnectedChainId =
      process.env.NEXT_PUBLIC_CHAIN_ID.toString() === parseInt(`${browserChainId}`, 16)?.toString();
    setIsConnectedToRightNetwork(isConnectedChainId);
    setIsMetamaskPresent(isMetamaskPresent);
  };

  const handleUpdate = (payload: UpdateWeb3Values) => {
    setLocalStorageAccount(payload);
    dispatch({
      type: Web3ActionsEnum.UPDATE_STATE,
      payload,
    });
  };

  const handleClose = () => {
    removeLocalStorageAccount();
    dispatch({ type: Web3ActionsEnum.RESET_STATE });
    window.location.reload();
  };

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

  const login = async (providerType: ProviderType) => {
    setIsLoading(true);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (!window?.ethereum) console.error('No Ethereum Provider found on window.ethereum');
      const { signerService, roleEnrolmentStatus } = await getIamService(providerType);
      const publicKey = await signerService.publicKey();
      if (signerService?.signer && signerService.address) {
        setListeners(signerService, (config) => handleListeners(config));
        handleUpdate({
          address: signerService?.address,
          providerType: signerService?.providerType,
          chainId: signerService?.chainId,
          provider: signerService?.provider,
          signer: signerService?.signer,
          did: signerService?.did,
          authenticated: Boolean(signerService?.address) && Boolean(signerService?.providerType),
          publicKey,
          roleEnrolmentStatus,
          isEthSigner: signerService?.isEthSigner?.toString(),
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
    if (signer instanceof WalletConnectProvider) {
      await signer.disconnect();
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
    publicKey,
    authenticated,
    roleEnrolmentStatus,
    login,
    logout,
    isLoading,
    isConnectedToRightNetwork,
    isMetamaskPresent,
    dispatch,
  };

  useEffect(() => {
    handleOnInit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Web3Context.Provider value={context}>{children}</Web3Context.Provider>;
};
