import { DSLAModalsActionsEnum, useDSLAModalsDispatch, useDSLAModalsStore } from '../../../context';

export const useConfirmEffects = () => {
  const {
    confirm: { open, onConfirm, title, text },
  } = useDSLAModalsStore();
  const dispatchModals = useDSLAModalsDispatch();

  const closeModal = () => {
    dispatchModals({
      type: DSLAModalsActionsEnum.SHOW_CONFIRM,
      payload: {
        open: false,
        title: title,
        text: text,
        onConfirm: onConfirm,
      },
    });
  };

  return {
    open,
    title,
    onConfirm,
    text,
    closeModal,
  };
};
