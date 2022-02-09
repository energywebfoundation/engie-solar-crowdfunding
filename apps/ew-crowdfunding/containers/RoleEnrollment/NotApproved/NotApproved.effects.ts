import { useDispatch, useSelector } from 'react-redux';
import { DSLAModalsActionsEnum, useDSLAModalsDispatch } from '../../../context';
import { cancelEnrollment, selectAddress } from '../../../redux-store';

export const useNotApprovedEffects = () => {
  const address = useSelector(selectAddress);
  const dispatch = useDispatch();
  const dispatchModals = useDSLAModalsDispatch();

  const onConfirm = () => {
    dispatch(cancelEnrollment());
    onCancel();
  };

  const onCancel = () => {
    dispatchModals({
      type: DSLAModalsActionsEnum.SHOW_CONFIRM,
      payload: {
        open: true,
        title: 'Cancel enrollment',
        text: 'Are you sure you want to cancel this enrollment?',
        onConfirm,
      },
    });
  };

  return {
    address,
    onCancel,
  };
};
