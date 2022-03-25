import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getContractStatus,
  RoleEnrollmentStatus,
  selectAddress,
  selectAuthenticated,
  selectIsPaused,
  selectIsTerminated,
  selectProvider,
  selectRoleEnrollmentStatus,
} from '../../redux-store';
import { propertyExists } from '../../utils';

export const useLendingEffects = () => {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const roleEnrolmentStatus = useSelector(selectRoleEnrollmentStatus);
  const authenticated = useSelector(selectAuthenticated);
  const provider = useSelector(selectProvider);
  const currentAddress = useSelector(selectAddress);

  useEffect(() => {
    if (propertyExists(provider) && propertyExists(currentAddress)) {
      dispatch(getContractStatus(provider));
    }
  }, [dispatch, authenticated, provider, currentAddress]);

  // Contract status
  const isContractPaused = useSelector(selectIsPaused);
  const isContractTerminated = useSelector(selectIsTerminated);

  useEffect(() => {
    if (roleEnrolmentStatus === RoleEnrollmentStatus.ENROLLED_SYNCED && authenticated) {
      setIsVisible(true);
    }
  }, [roleEnrolmentStatus, authenticated]);

  return {
    isVisible,
    isContractPaused,
    isContractTerminated,
  };
};
