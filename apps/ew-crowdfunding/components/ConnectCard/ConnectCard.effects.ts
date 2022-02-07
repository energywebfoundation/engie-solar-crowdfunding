import WalletConnectProvider from '@walletconnect/ethereum-provider';
import { ProviderType } from 'iam-client-lib';
import { useDispatch, useSelector } from 'react-redux';
import { DSLAModalsActionsEnum, useDSLAModalsDispatch } from '../../context';
import {
  selectIsConnectedToRightNetwork,
  selectIsMetamaskPresent,
  selectAuthenticated,
  selectIsLoading,
  requestLogin,
  requestLogout,
  selectProvider,
  selectSigner,
} from '../../redux-store';

export const useConnectCardEffects = () => {
  const dispatchModals = useDSLAModalsDispatch();
  const dispatch = useDispatch();

  const login = (providerType: ProviderType) => {
    dispatch(requestLogin(providerType, dispatchModals));
  };

  const isLoading = useSelector(selectIsLoading);
  const isConnectedToRightNetwork = useSelector(selectIsConnectedToRightNetwork);
  const authenticated = useSelector(selectAuthenticated);
  const isMetamaskPresent = useSelector(selectIsMetamaskPresent);
  const provider = useSelector(selectProvider);
  const signer = useSelector(selectSigner);
  
  const logout = async () => {
    if (provider?.disconnect && typeof provider.disconnect === 'function') {
      await provider.disconnect();
    }
    if (signer instanceof WalletConnectProvider) {
      await signer.disconnect();
    }
    dispatch(requestLogout());
  };

  const onConnect = () => {
    dispatchModals({
      type: DSLAModalsActionsEnum.SHOW_LOGIN,
      payload: {
        open: true,
        isConnectedToRightNetwork,
        isMetamaskPresent,
        login,
      },
    });
  };

  return { onConnect, authenticated, logout, isLoading };
};
