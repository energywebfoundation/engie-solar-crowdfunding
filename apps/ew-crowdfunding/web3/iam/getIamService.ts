import { setChainConfig, setCacheConfig } from '@engie-solar-crowdfunding/ew-crowdfunding/web3-client';
import { LoginOptions } from './types';
import { getSignerService } from './getSignerService';

export const getIamService = async ({ providerType, initCacheServer = true, createDocument = true }: LoginOptions) => {
  // // Set Cache Server
  setCacheConfig(+process.env.NEXT_PUBLIC_CHAIN_ID || 73799, {
    url: process.env.NEXT_PUBLIC_CACHE_SERVER,
  });
  // Set RPC
  setChainConfig(+process.env.NEXT_PUBLIC_CHAIN_ID || 73799, {
    rpcUrl: process.env.NEXT_PUBLIC_RPC_URL,
  });

  try {
    if (window.ethereum) {
      console.log('No ethereum object!');
      const { signerService } = await getSignerService(providerType);
      // let didRegistryProvider: DidRegistry;

      // if (initCacheServer) {
      //   const { domainsService, stakingPoolService, assetsService, connectToDidRegistry, cacheClient } =
      //     await connectToCacheServer();
      //   assetsProvider = assetsService;
      //   cacheClientProvider = cacheClient;
      //   if (createDocument) {
      //     const { didRegistry, claimsService } = await connectToDidRegistry();
      //     didRegistryProvider = didRegistry;
      //     claimsProvider = claimsService;
      //   }
      // }

      return {
        signerService,
        // cacheClient: cacheClientProvider || null,
        // didRegistry: didRegistryProvider || null,
        // claimsService: claimsProvider || null,
      };
    }
  } catch (error) {
    console.log(error);
    // toast.error("No ethereum object");
    throw new Error('No ethereum object');
  }
};
