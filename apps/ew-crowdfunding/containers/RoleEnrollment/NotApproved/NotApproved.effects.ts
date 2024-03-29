import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DSLAModalsActionsEnum, useDSLAModalsDispatch } from '../../../context';
import {
  RoleEnrollmentStatus,
  selectAddress,
  selectClaimsService,
  selectRole,
  Web3ActionTypes,
} from '../../../redux-store';

export const useNotApprovedEffects = () => {
  const address = useSelector(selectAddress);
  const role = useSelector(selectRole);
  const claimsService = useSelector(selectClaimsService);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const dispatchModals = useDSLAModalsDispatch();

  const onConfirm = async () => {
    if (!role) {
      dispatch({
        type: Web3ActionTypes.UPDATE_ROLE_ENROLLMENT_STATUS,
        payload: RoleEnrollmentStatus.NOT_ENROLLED,
      });
    }
    setIsLoading(true);
    try {
      await claimsService.deleteClaim({ id: role.id });
      dispatch({
        type: Web3ActionTypes.UPDATE_ROLE_ENROLLMENT_STATUS,
        payload: RoleEnrollmentStatus.NOT_ENROLLED,
      });
      setIsLoading(false);
    } catch (error) {
      dispatch({
        type: Web3ActionTypes.SET_WEB3_FAILURE,
        payload: error,
      });
      setIsLoading(false);
    }
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
    isLoading,
  };
};
