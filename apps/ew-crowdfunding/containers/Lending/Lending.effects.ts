import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RoleEnrollmentStatus, selectAuthenticated, selectRoleEnrollmentStatus } from '../../redux-store';

export const useLendingEffects = () => {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const roleEnrolmentStatus = useSelector(selectRoleEnrollmentStatus);
  const authenticated = useSelector(selectAuthenticated);

  useEffect(() => {
    if (roleEnrolmentStatus === RoleEnrollmentStatus.ENROLLED_SYNCED && authenticated) {
      setIsVisible(true);
    }
  }, [roleEnrolmentStatus, authenticated]);

  return {
    isVisible
  };
};
