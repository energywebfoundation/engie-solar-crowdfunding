import { DSLAModalsActionsEnum, useDSLAModalsDispatch, useDSLAModalsStore } from '../../../context';

export const useLendEffects = () => {
  const {
    lend: { open, amount, onLend },
  } = useDSLAModalsStore();
  const dispatchModals = useDSLAModalsDispatch();

  const closeModal = () => {
    dispatchModals({
      type: DSLAModalsActionsEnum.SHOW_LEND,
      payload: {
        open: false,
        amount: null,
        onLend,
      },
    });
  };

  return {
    open,
    amount,
    onLend,
    closeModal,
  };
};
