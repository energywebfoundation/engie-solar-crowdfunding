import { ProviderType } from 'iam-client-lib';
import { useDispatch, useSelector } from 'react-redux';
import { DSLAModalsActionsEnum, useDSLAModalsDispatch } from '../../context';
import {
  selectIsConnectedToRightNetwork,
  selectIsMetamaskPresent,
  selectIsLoading,
  requestLogin,
} from '../../redux-store';

export const useConnectCardEffects = () => {
  const dispatchModals = useDSLAModalsDispatch();
  const dispatch = useDispatch();

  const login = (providerType: ProviderType) => {
    dispatch(requestLogin(providerType, dispatchModals));
  };

  const isLoading = useSelector(selectIsLoading);
  const isConnectedToRightNetwork = useSelector(selectIsConnectedToRightNetwork);
  const isMetamaskPresent = useSelector(selectIsMetamaskPresent);

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

  return { onConnect, isLoading };
};
