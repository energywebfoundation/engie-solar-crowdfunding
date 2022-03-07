import { setCacheConfig, Claim, ProviderType } from 'iam-client-lib';
import { RoleEnrollmentStatus } from '../../redux-store';
import { getSignerService } from './getSignerService';

export const getIamService = async (providerType: ProviderType) => {
  // // Set Cache Server
  setCacheConfig(+process.env.NEXT_PUBLIC_CHAIN_ID || 73799, {
    url: process.env.NEXT_PUBLIC_CACHE_SERVER,
  });

  const getEnrollmentStatus = (enrollments: Claim[]) => {
    if (enrollments?.length === 0) {
      return RoleEnrollmentStatus.NOT_ENROLLED;
    }
    const role = enrollments?.filter((item) => !item.isRejected)[0];

    if (!role) {
      return RoleEnrollmentStatus.NOT_ENROLLED;
    }
    if (role?.isAccepted) {
      return RoleEnrollmentStatus.ENROLLED_APPROVED;
    }
    return RoleEnrollmentStatus.ENROLLED_NOT_APPROVED;
  };

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!(window as any).ethereum) {
      return;
    }
    const { signerService, connectToCacheServer } = await getSignerService(providerType);
    const { connectToDidRegistry, cacheClient } = await connectToCacheServer();
    const { claimsService } = await connectToDidRegistry();
    const claims: Claim[] = await cacheClient.getClaimsByRequester(signerService?.did, {
      namespace: process.env.NEXT_PUBLIC_PATRON_ROLE.split('.roles.').pop(),
    });

    const role = claims.filter((item) => !item.isRejected)[0];
    let roleEnrolmentStatus = getEnrollmentStatus(claims);

    if (roleEnrolmentStatus === RoleEnrollmentStatus.ENROLLED_APPROVED && signerService?.did) {
      const hasOnChainRole = await claimsService.hasOnChainRole(
        signerService?.did,
        process.env.NEXT_PUBLIC_PATRON_ROLE,
        Number(process.env.NEXT_PUBLIC_PATRON_ROLE_VERSION),
      );
      if (hasOnChainRole) {
        roleEnrolmentStatus = RoleEnrollmentStatus.ENROLLED_SYNCED;
      }
    }

    return {
      signerService,
      cacheClient,
      claims,
      roleEnrolmentStatus,
      claimsService,
      role,
    };
  } catch (error) {
    const env = process.env.NODE_ENV;
    if (env == 'development') {
      console.log('Error: ', error);
    }
    // throw new Error('No ethereum object');
    console.log('No ethereum object! Please connect your wallet!');
    return;
  }
};
