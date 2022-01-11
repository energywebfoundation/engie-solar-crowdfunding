import {
  setChainConfig,
  setCacheConfig,
  setMessagingConfig,
  DomainsService,
  StakingFactoryService,
  AssetsService,
  CacheClient,
  DidRegistry,
  ClaimsService,
  MessagingMethod,
} from 'iam-client-lib';
import { LoginOptions } from './types';
import { getSignerService } from './getSignerService';

export const getIamService = async ({ providerType, initCacheServer = true, createDocument = true }: LoginOptions) => {
  // Set Cache Server
  setCacheConfig(73799, {
    url: 'https://volta-identitycache.energyweb.org/',
  });
  // Set RPC
  setChainConfig(73799, {
    rpcUrl: 'https://volta-rpc.energyweb.org',
  });

  // Set Messaging Options
  setMessagingConfig(73799, {
    messagingMethod: MessagingMethod.Nats,
    natsServerUrl: 'https://identityevents-dev.energyweb.org/',
  });
  const { signerService, messagingService, connectToCacheServer } = await getSignerService(
    providerType,
  );
  let domainsProvider: DomainsService;
  let stakingPool: StakingFactoryService;
  let assetsProvider: AssetsService;
  let cacheClientProvider: CacheClient;
  let didRegistryProvider: DidRegistry;
  let claimsProvider: ClaimsService;

  if (initCacheServer) {
    const { domainsService, stakingPoolService, assetsService, connectToDidRegistry, cacheClient } =
      await connectToCacheServer();
    domainsProvider = domainsService;
    stakingPool = stakingPoolService;
    assetsProvider = assetsService;
    cacheClientProvider = cacheClient;
    if (createDocument) {
      const { didRegistry, claimsService } = await connectToDidRegistry();
      didRegistryProvider = didRegistry;
      claimsProvider = claimsService;
    }
  }

  return {
    signerService,
    messagingService,
    domainsService: domainsProvider || null,
    stakingPoolService: stakingPool || null,
    assetsService: assetsProvider || null,
    cacheClient: cacheClientProvider || null,
    didRegistry: didRegistryProvider || null,
    claimsService: claimsProvider || null,
  };
};
