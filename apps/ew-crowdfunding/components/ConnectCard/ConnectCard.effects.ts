import { useContext } from 'react';
import { DSLAModalsActionsEnum, useDSLAModalsDispatch, Web3Context } from '../../context';

export const useConnectCardEffects = () => {
  const dispatchModals = useDSLAModalsDispatch();
  const { isConnectedToRightNetwork, address, isMetamaskPresent, login, logout } = useContext(Web3Context);

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

  return { onConnect, address, logout };
};
