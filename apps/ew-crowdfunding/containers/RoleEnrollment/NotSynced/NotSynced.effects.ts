import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RoleEnrollmentStatus, selectClaimsService, selectContributionDeadline, selectRole, Web3ActionTypes } from '../../../redux-store';

export const useNotSyncedEffects = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const role = useSelector(selectRole);
  const claimsService = useSelector(selectClaimsService);
  const closeStackingDate = useSelector(selectContributionDeadline);

  const isEnrollmentDisabled = new Date() >= new Date(closeStackingDate);

  const onAddRole = async () => {
    if(isEnrollmentDisabled) {
      return;
    }
    if (!role) {
      dispatch({
        type: Web3ActionTypes.UPDATE_ROLE_ENROLLMENT_STATUS,
        payload: RoleEnrollmentStatus.NOT_ENROLLED,
      });
    }
    setIsLoading(true);
    try {
      await claimsService.registerOnchain({
        token: role.token,
        subjectAgreement: role.subjectAgreement,
        onChainProof: role.onChainProof,
        acceptedBy: role.acceptedBy,
      });
      dispatch({
        type: Web3ActionTypes.UPDATE_ROLE_ENROLLMENT_STATUS,
        payload: RoleEnrollmentStatus.ENROLLED_SYNCED,
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

  return { onAddRole, isLoading, isEnrollmentDisabled };
};
