import { Box } from '@mui/material';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RoleEnrollmentStatus, selectRoleEnrollmentStatus } from '../../redux-store';
import { ApprovedSynced } from './ApprovedSynced';
import { EmailVerification } from './EmailVerification';
import { NotApproved } from './NotApproved';
import { NotSynced } from './NotSynced';

export const RoleEnrollment: FC = () => {
  const roleEnrolmentStatus = useSelector(selectRoleEnrollmentStatus);

  const renderRoleComponent = () => {
    switch (roleEnrolmentStatus) {
      case RoleEnrollmentStatus.NOT_ENROLLED:
        return <EmailVerification roleEnrolmentStatus={roleEnrolmentStatus} />;
      case RoleEnrollmentStatus.ENROLLED_NOT_APPROVED:
        return <NotApproved />;
      case RoleEnrollmentStatus.ENROLLED_APPROVED:
        return <NotSynced />;
      case RoleEnrollmentStatus.ENROLLED_SYNCED:
        return <ApprovedSynced />;
      case RoleEnrollmentStatus.REJECTED:
        return <EmailVerification roleEnrolmentStatus={roleEnrolmentStatus} />;
    }
  };
  return <Box>{renderRoleComponent()}</Box>;
};
