import { useContext } from 'react';
import { DSLAModalsActionsEnum, useDSLAModalsDispatch, Web3Context } from '../../context';

export const useConnectCardEffects = () => {
  const dispatchModals = useDSLAModalsDispatch();
  const { isConnectedToRightNetwork, authenticated, isMetamaskPresent, login, logout, isLoading } =
    useContext(Web3Context);

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
