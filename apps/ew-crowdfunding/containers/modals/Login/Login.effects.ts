import { DSLAModalsActionsEnum, useDSLAModalsDispatch, useDSLAModalsStore } from '../../../context';

export const useLoginEffects = () => {
  const {
    login: { open, isConnectedToRightNetwork, isMetamaskPresent, login },
  } = useDSLAModalsStore();
  const dispatchModals = useDSLAModalsDispatch();

  const closeModal = () => {
    dispatchModals({
      type: DSLAModalsActionsEnum.SHOW_LOGIN,
      payload: {
        open: false,
        isConnectedToRightNetwork,
        isMetamaskPresent,
        login,
      },
    });
  };

  return {
    open,
    closeModal,
    isConnectedToRightNetwork,
    isMetamaskPresent,
    login,
  };
};
