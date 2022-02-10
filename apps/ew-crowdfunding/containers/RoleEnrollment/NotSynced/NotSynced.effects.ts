import { useDispatch, useSelector } from 'react-redux';
import { RoleEnrollmentStatus, selectClaimsService, selectRole, Web3ActionTypes } from '../../../redux-store';

export const useNotSyncedEffects = () => {
  const dispatch = useDispatch();
  const role = useSelector(selectRole);
  const claimsService = useSelector(selectClaimsService);

  const onAddRole = async () => {
    if (!role) {
      dispatch({
        type: Web3ActionTypes.UPDATE_ROLE_ENROLLMENT_STATUS,
        payload: RoleEnrollmentStatus.NOT_ENROLLED,
      });
    }
    try {
      await claimsService.registerOnchain(role);
      dispatch({
        type: Web3ActionTypes.UPDATE_ROLE_ENROLLMENT_STATUS,
        payload: RoleEnrollmentStatus.ENROLLED_SYNCED,
      });
    } catch (error) {
      dispatch({
        type: Web3ActionTypes.SET_WEB3_FAILURE,
        payload: error,
      });
    }
  };

  return onAddRole;
};
