import { setChainConfig, setCacheConfig, Claim } from 'iam-client-lib';
import { LoginOptions } from './types';
import { getSignerService } from './getSignerService';
import { RoleEnrollmentStatus } from '../types';

export const getIamService = async ({ providerType }: LoginOptions) => {
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
    if (window.ethereum) {
      const { signerService, connectToCacheServer } = await getSignerService(providerType);
      const { connectToDidRegistry, cacheClient } = await connectToCacheServer();
      const { claimsService } = await connectToDidRegistry();
      const claims: Claim[] = await cacheClient.getClaimsByRequester(signerService?.did, {
        namespace: process.env.NEXT_PUBLIC_PATRON_ROLE.split('.roles.').pop(),
      });
      const role = getEnrollmentStatus(claims);

      return {
        signerService,
        cacheClient,
        claims,
        role,
        claimsService,
      };
    }
  } catch (error) {
    // console.log(error);
    throw new Error('No ethereum object');
  }
};
