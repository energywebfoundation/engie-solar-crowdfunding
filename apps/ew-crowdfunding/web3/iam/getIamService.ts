import { setChainConfig, setCacheConfig } from '@engie-solar-crowdfunding/ew-crowdfunding/web3-client';
import { LoginOptions } from './types';
import { getSignerService } from './getSignerService';

export const getIamService = async ({ providerType, initCacheServer = true, createDocument = true }: LoginOptions) => {
  // // Set Cache Server
  setCacheConfig(73799, {
    url: 'https://volta-identitycache.energyweb.org/',
  });
  // Set RPC
  setChainConfig(73799, {
    rpcUrl: 'https://volta-rpc.energyweb.org',
  });

  try {
    if (!window.ethereum) {
      console.log('No ethereum object!');
    }
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
  } catch (error) {
    console.log(error);
    // toast.error("No ethereum object");
    throw new Error('No ethereum object');
  }
};
