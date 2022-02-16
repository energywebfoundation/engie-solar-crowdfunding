import { DSLAModalsActionsEnum, useDSLAModalsDispatch, useDSLAModalsStore } from '../../../context';

export const useCongratsEffects = () => {
  const {
    congrats: { open },
  } = useDSLAModalsStore();
  const dispatchModals = useDSLAModalsDispatch();

  const closeModal = () => {
    dispatchModals({
      type: DSLAModalsActionsEnum.SHOW_CONGRATS,
      payload: {
        open: false,
      },
    });
  };

  return {
    open,
    closeModal,
  };
};
