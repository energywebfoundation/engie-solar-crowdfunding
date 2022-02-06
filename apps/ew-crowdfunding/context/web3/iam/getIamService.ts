import { setChainConfig, setCacheConfig, Claim, ProviderType } from 'iam-client-lib';
import { getSignerService } from './getSignerService';
import { RoleEnrollmentStatus } from '../types';

export const getIamService = async (providerType : ProviderType) => {
  // // Set Cache Server
  setCacheConfig(+process.env.NEXT_PUBLIC_CHAIN_ID || 73799, {
    url: process.env.NEXT_PUBLIC_CACHE_SERVER,
  });
  // Set RPC
  setChainConfig(+process.env.NEXT_PUBLIC_CHAIN_ID || 73799, {
    rpcUrl: process.env.NEXT_PUBLIC_RPC_URL,
  });

  const getEnrollmentStatus = (enrollments: Claim[]) => {
    if (enrollments.length === 0) {
      return RoleEnrollmentStatus.NOT_ENROLLED;
    }
    if (enrollments[0].isAccepted) {
      return RoleEnrollmentStatus.ENROLLED_APPROVED;
    }
    return RoleEnrollmentStatus.ENROLLED_NOT_APPROVED;
  };

  try {
    if (!window?.ethereum) {
      return;
    }
    const { signerService, connectToCacheServer } = await getSignerService(providerType);
    const { connectToDidRegistry, cacheClient } = await connectToCacheServer();
    const { claimsService } = await connectToDidRegistry();
    const claims: Claim[] = await cacheClient.getClaimsByRequester(signerService?.did, {
      namespace: process.env.NEXT_PUBLIC_PATRON_ROLE.split('.roles.').pop(),
    });
    const role = claims.filter((item) => !item.isRejected)[0];
    const roleEnrolmentStatus = getEnrollmentStatus(claims);

    return {
      signerService,
      cacheClient,
      claims,
      roleEnrolmentStatus,
      claimsService,
      role,
    };
  } catch (error) {
    // throw new Error('No ethereum object');
    console.log('No ethereum object! Please connect your wallet!')
  }
};
