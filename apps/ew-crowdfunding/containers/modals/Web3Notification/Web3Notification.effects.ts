import { DSLAModalsActionsEnum, useDSLAModalsDispatch, useDSLAModalsStore } from '../../../context';

export const useWeb3NotificationEffects = () => {
  const {
    notification: { open, config },
  } = useDSLAModalsStore();
  const dispatchModals = useDSLAModalsDispatch();

  const closeModal = () => {
    dispatchModals({
      type: DSLAModalsActionsEnum.SHOW_NOTIFICATION,
      payload: {
        open: false,
        config: null,
      },
    });
  };

  return {
    open,
    config,
    closeModal,
  };
};
