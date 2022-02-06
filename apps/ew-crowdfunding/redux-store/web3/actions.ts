import { isMetamaskExtensionPresent, ProviderType } from 'iam-client-lib';
import {
  DSLAModalsActionsEnum,
  getFromStorage,
  getLocalStorageAccount,
  PROVIDER_TYPE,
  removeLocalStorageAccount,
  setLocalStorageAccount,
} from '../../context';
import { TDSLAModalsAction } from '../../context/modals/types';
import { getIamService } from '../../context/web3/iam';
import { setListeners } from '../../context/web3/setListeners';
import { Web3ModalConfig } from '../../context/web3/types';
import { AppThunk } from '../store';
import { UpdateWeb3Payload, Web3ActionTypes } from './types';

export const setIsLoading = (payload: boolean) => ({
  type: Web3ActionTypes.SET_IS_LOADING,
  payload,
});

export const setState = (payload: UpdateWeb3Payload) => ({
  type: Web3ActionTypes.SET_WEB3,
  payload,
});

export const resetState = () => ({
  type: Web3ActionTypes.RESET_WEB3,
});

export const requestLogout =
  (): AppThunk =>
  async (dispatch): Promise<void> => {
    removeLocalStorageAccount();
    dispatch(resetState());
    window.location.reload();
  };

export const handleWeb3Listeners =
  (signerService, dispatchModals: React.Dispatch<TDSLAModalsAction>): AppThunk =>
  async (dispatch): Promise<void> => {
    const handleListeners = (config: Web3ModalConfig) => {
      dispatchModals({
        type: DSLAModalsActionsEnum.SHOW_NOTIFICATION,
        payload: {
          open: true,
          config,
        },
      });
      removeLocalStorageAccount();
      dispatch({ type: Web3ActionTypes.RESET_WEB3 });
      window.location.reload();
    };
    setListeners(signerService, (config) => handleListeners(config));
  };

export const getWeb3 =
  (dispatchModals: React.Dispatch<TDSLAModalsAction>): AppThunk =>
  async (dispatch): Promise<void> => {
    dispatch({
      type: Web3ActionTypes.SET_IS_LOADING,
      payload: true,
    });
    const providerType = await getFromStorage(PROVIDER_TYPE);
    const initialStorageValues: UpdateWeb3Payload = getLocalStorageAccount();
    const { isMetamaskPresent, chainId: browserChainId } = await isMetamaskExtensionPresent();
    const isConnectedToRightNetwork =
      process.env.NEXT_PUBLIC_CHAIN_ID.toString() === parseInt(`${browserChainId}`, 16)?.toString();

    if (providerType) {
      const { signerService, roleEnrolmentStatus } = await getIamService(providerType as ProviderType);
      dispatch(handleWeb3Listeners(signerService, dispatchModals));
      dispatch({
        type: Web3ActionTypes.SET_WEB3,
        payload: {
          ...initialStorageValues,
          isLoading: false,
          address: signerService?.address,
          providerType: signerService?.providerType,
          chainId: signerService?.chainId,
          provider: signerService?.provider,
          signer: signerService?.signer,
          did: signerService?.did,
          authenticated: Boolean(signerService?.address) && Boolean(signerService?.providerType),
          roleEnrolmentStatus,
          isEthSigner: signerService?.isEthSigner?.toString(),
          isMetamaskPresent,
          isConnectedToRightNetwork,
        },
      });
    } else {
      dispatch({
        type: Web3ActionTypes.SET_WEB3,
        payload: {
          ...initialStorageValues,
          isLoading: false,
          isMetamaskPresent,
          isConnectedToRightNetwork,
        },
      });
    }
  };

export const requestLogin =
  (providerType: ProviderType, dispatchModals: React.Dispatch<TDSLAModalsAction>): AppThunk =>
  async (dispatch): Promise<void> => {
    dispatch({
      type: Web3ActionTypes.SET_IS_LOADING,
      payload: true,
    });
    const { signerService, roleEnrolmentStatus } = await getIamService(providerType);
    const { isMetamaskPresent, chainId: browserChainId } = await isMetamaskExtensionPresent();
    const isConnectedChainId =
      process.env.NEXT_PUBLIC_CHAIN_ID.toString() === parseInt(`${browserChainId}`, 16)?.toString();
    const publicKey = await signerService.publicKey();
    if (signerService?.signer && signerService.address) {
      dispatch(handleWeb3Listeners(signerService, dispatchModals));

      const payload = {
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
      };
      setLocalStorageAccount(payload);

      dispatch({
        type: Web3ActionTypes.SET_WEB3,
        payload: {
          ...payload,
          isLoading: false,
          isMetamaskPresent,
          isConnectedChainId,
        },
      });
    }
  };
